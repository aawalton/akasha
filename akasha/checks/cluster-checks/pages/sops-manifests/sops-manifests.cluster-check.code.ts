#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import { remediationHint } from "../../../../../tools/lib/check-workflow/remediation-doc"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { buildFrom, readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import {
  YAML_FILE_NODE_TYPES,
  YamlFileAttrsSchema,
} from "../../../../../tools/lib/graph/producers/file/yaml-file/types.ts"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"
import { parseArgs as parseCliArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { assertManifestShape } from "../../modules/sops-manifest/sops-manifest.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[sops-manifests]"

const REPAIR_ACT = remediationHint(
  "`sops edit <file>` — decrypts into $EDITOR and re-encrypts in place on save, under the same .sops.yaml creation rule; every document must carry a non-empty top-level `apiVersion` and `kind`"
)

const KUBECTL_PROBE_MANIFEST = `apiVersion: v1
kind: Secret
metadata:
  name: sops-manifests-kubectl-probe
`

const MANIFESTS_AT_LEAST = 30

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

interface CliArgs {
  jsonOutput: boolean
  treeSha: string
}

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    return toolExit(errorMessage(err).replace(/^Unknown flag: /, "unknown argument: "))
  }
  if (parsed.positionals.length > 0) {
    return toolExit(`unknown argument: ${parsed.positionals[0]}`)
  }
  return { jsonOutput: parsed.flags.json, treeSha: parsed.flags.treeSha }
}

interface DecryptResult {
  ok: boolean
  text: string
  stderr: string
}

async function decryptSopsFile(absPath: string): Promise<DecryptResult> {
  const proc = Bun.spawn(["sops", "-d", absPath], { stdout: "pipe", stderr: "pipe" })
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  const trimmedStderr = stderr.trim()
  return {
    ok: exitCode === 0,
    text: stdout,
    stderr: trimmedStderr !== "" ? trimmedStderr : exitCode === 0 ? "" : `sops exited ${exitCode}`,
  }
}

interface DryRunResult {
  ok: boolean
  stderr: string
}

async function kubectlDryRunClient(yamlText: string): Promise<DryRunResult> {
  const kubectl = Bun.which("kubectl")
  if (kubectl === null) {
    return { ok: false, stderr: "kubectl not found on PATH" }
  }
  const proc = Bun.spawn([kubectl, "create", "--dry-run=client", "-f", "-"], {
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
  })
  proc.stdin.write(yamlText)
  proc.stdin.end()
  const [stderr, exitCode] = await Promise.all([new Response(proc.stderr).text(), proc.exited])
  const trimmedStderr = stderr.trim()
  return {
    ok: exitCode === 0,
    stderr:
      trimmedStderr !== "" ? trimmedStderr : exitCode === 0 ? "" : `kubectl exited ${exitCode}`,
  }
}

async function probeKubectlEnvironment(): Promise<Error | undefined> {
  const probe = await kubectlDryRunClient(KUBECTL_PROBE_MANIFEST)
  if (probe.ok) return undefined
  return new Error(
    `the kubectl arm cannot run here, so nothing was judged by it and no file is implicated: ` +
      `a constant, valid Secret was refused by \`kubectl create --dry-run=client\` — ${probe.stderr}. ` +
      `That arm downloads the openapi schema from the API server, so a missing kubectl or an ` +
      `unreachable cluster fails every file identically. Point KUBECONFIG at a reachable cluster, ` +
      `or run this check where there is one.`
  )
}

interface SopsManifestViolation {
  file: string
  reason: string
}

type FileOutcome =
  | { readonly kind: "judged"; readonly violations: readonly SopsManifestViolation[] }
  | { readonly kind: "environment"; readonly error: Error }

async function validateFile(root: string, relPath: string): Promise<FileOutcome> {
  const abs = resolve(root, relPath)
  const decrypted = await decryptSopsFile(abs)
  if (!decrypted.ok) {
    return {
      kind: "judged",
      violations: [{ file: relPath, reason: `sops decrypt failed: ${decrypted.stderr}` }],
    }
  }

  const violations: SopsManifestViolation[] = []
  const shape = assertManifestShape(decrypted.text)
  if (!shape.ok) {
    for (const e of shape.errors) {
      violations.push({ file: relPath, reason: `manifest shape: ${e}` })
    }
  }

  const dryRun = await kubectlDryRunClient(decrypted.text)
  if (!dryRun.ok) {
    const environment = await probeKubectlEnvironment()
    if (environment !== undefined) return { kind: "environment", error: environment }
    violations.push({
      file: relPath,
      reason: `kubectl create --dry-run=client rejected the decrypted manifest: ${dryRun.stderr}`,
    })
  }

  return { kind: "judged", violations }
}

interface Discovered {
  readonly manifestFiles: readonly string[]
  readonly skipped: number
}

function discoverSopsFiles(graph: Graph): Discovered {
  const manifestFiles: string[] = []
  let skipped = 0
  for (const node of graph.nodes(YAML_FILE_NODE_TYPES)) {
    const attrs = YamlFileAttrsSchema.parse(node.attrs)
    if (attrs.sops?.shape === "manifest") {
      manifestFiles.push(attrs.path)
    } else if (attrs.sops?.shape === "flat") {
      skipped++
    }
  }
  manifestFiles.sort()
  return { manifestFiles, skipped }
}

async function main(): Promise<never> {
  const args = parseArgs()

  let fullGraph: Graph
  try {
    fullGraph = await buildFrom(readAt(args.treeSha).ctx)
  } catch (err) {
    return toolExit(`failed to build the yaml-file graph at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const root = codeRoot()
  const { manifestFiles, skipped } = discoverSopsFiles(fullGraph)

  if (manifestFiles.length > 0) {
    const preflight = await probeKubectlEnvironment()
    if (preflight !== undefined) {
      return exitOnToolError({ error: preflight, prefix: PREFIX })
    }
  }

  const violationsByFile = new Map<string, readonly SopsManifestViolation[]>()
  for (const file of manifestFiles) {
    const outcome = await validateFile(root, file)
    if (outcome.kind === "environment") {
      return exitOnToolError({ error: outcome.error, prefix: PREFIX })
    }
    violationsByFile.set(file, outcome.violations)
  }

  const { population, violations } = examinePopulation<string, SopsManifestViolation>({
    members: manifestFiles,
    unit: "sops manifest files",
    membership: {
      kind: "atLeast",
      members: MANIFESTS_AT_LEAST,
      from:
        "the `.sops.yaml`-suffixed files in the tree read at the tree sha above, " +
        "which held 35 manifest-shaped and 1 flat when this least count was taken — a body the " +
        "snapshot could not hand back is classified as no sops file at all rather than raising, " +
        "and a producer reach that stops short narrows the tree before classification, so a run " +
        "arriving under this read fewer encrypted manifests than the repo carries and judged " +
        "none of the rest; lower it only alongside deliberately retiring that many secrets",
    },
    labelOf: (file) => file,
    siteOf: (file) => resolve(root, file),
    examine: (file) => violationsByFile.get(file) ?? [],
  })

  return exitOnResult({
    violations,
    options: {
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: `sops manifest file(s) failed K8s manifest validation (${manifestFiles.length} checked, ${skipped} flat secret(s) skipped)`,
      successMessage: `${manifestFiles.length} sops manifest file(s) validated (${skipped} flat secret(s) skipped) — all decrypt to valid K8s manifests.`,
      population,
      remediationDoc: REPAIR_ACT,
      formatViolation: (v) => `${v.file}: ${v.reason}`,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
