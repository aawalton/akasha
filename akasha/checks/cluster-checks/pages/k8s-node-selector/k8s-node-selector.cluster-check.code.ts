#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { buildFrom, readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import { TS_FILE_NODE_TYPES } from "../../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import { TsFileAttrsSchema } from "../../../../../tools/lib/graph/producers/file/ts-file/types-schemas"
import { K8S_RESOURCE_NODE_TYPE } from "../../../../../tools/lib/graph/producers/k8s/types.ts"
import { K8sResourceAttrsSchema } from "../../../../../tools/lib/graph/producers/k8s/types-schemas"
import { readRepoFile } from "../../../../../tools/lib/graph/repos.ts"
import type { BuildContext, Graph } from "../../../../../tools/lib/graph/types.ts"
import { parseArgs as parseCliArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  ACCEPTED_SELECTOR_KEYS_HUMAN,
  evaluateManifestNode,
  type ManifestNodeAttrs,
  scanTsContent,
  scanTsNodeName,
  type Violation,
} from "../../modules/k8s-node-selector/k8s-node-selector.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[k8s-node-selector]"

const MEMBERS_AT_LEAST = 6000

const MEMBERSHIP_FROM =
  "the tracked tree read at the tree sha above: the `k8s-resource` docs counting the " +
  "duplicates each carries, and every tracked TypeScript module outside the excluded " +
  "directories, of which the tree holds upwards of eleven thousand. The file list behind both " +
  "halves is what `git ls-tree` answered for the checkout, and that hands back whatever it " +
  "read rather than raising when it reads less, so a run arriving under this count read a " +
  "smaller tree than the one this check was written against and certifies nothing"

const EXCLUDED_TS_SEGMENTS: ReadonlySet<string> = new Set([
  "node_modules",
  ".git",
  "dist",
  ".next",
  ".turbo",
  ".cache",
  "build",
  "coverage",
  "__fixtures__",
  "generated",
  "_generated",
])

interface CliArgs {
  jsonOutput: boolean
  treeSha: string
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

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

type Member =
  | { readonly surface: "manifest"; readonly docIndex: number; readonly attrs: ManifestNodeAttrs }
  | { readonly surface: "ts"; readonly rel: string }

function manifestMembers(graph: Graph): readonly Member[] {
  const found: Member[] = []
  for (const node of graph.nodes(K8S_RESOURCE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = K8sResourceAttrsSchema.parse(node.attrs)
    found.push({ surface: "manifest", docIndex: attrs.docIndex, attrs })
    for (const dup of attrs.duplicateDocs) {
      found.push({
        surface: "manifest",
        docIndex: dup.docIndex,
        attrs: { ...dup, kind: attrs.kind, name: attrs.name },
      })
    }
  }
  return found
}

function tsMembers(graph: Graph): readonly Member[] {
  const found: Member[] = []
  for (const node of graph.nodes(TS_FILE_NODE_TYPES)) {
    if (node.repo !== CODE_REPO) continue
    const rel = TsFileAttrsSchema.parse(node.attrs).path
    if (rel.split("/").some((segment) => EXCLUDED_TS_SEGMENTS.has(segment))) continue
    if (!rel.endsWith(".ts") && !rel.endsWith(".tsx")) continue
    found.push({ surface: "ts", rel })
  }
  return found
}

function scanTsSource(ctx: BuildContext, rel: string): readonly Violation[] {
  const content = readRepoFile(ctx, CODE_REPO, rel)
  if (content === null) {
    throw new Error(
      `the snapshot listed ${rel} but could not read it back, and scanning it as empty would ` +
        `report a clean module over a body this run never saw`
    )
  }
  return [...scanTsContent(content, rel), ...scanTsNodeName(content, rel)]
}

async function main(): Promise<never> {
  const args = parseArgs()

  let ctx: BuildContext
  let fullGraph: Graph
  try {
    ctx = readAt(args.treeSha).ctx
    fullGraph = await buildFrom(ctx)
  } catch (err) {
    return toolExit(
      `failed to build the pod-placement graph at ${args.treeSha}: ${errorMessage(err)}`
    )
  }

  const root = codeRoot()
  const members: readonly Member[] = [...manifestMembers(fullGraph), ...tsMembers(fullGraph)]

  const { population, violations } = examinePopulation<Member, Violation>({
    members,
    unit: "k8s docs and TS modules",
    membership: { kind: "atLeast", members: MEMBERS_AT_LEAST, from: MEMBERSHIP_FROM },
    labelOf: (member) =>
      member.surface === "manifest"
        ? `${member.attrs.path}#${member.docIndex} — ${member.attrs.kind} ${member.attrs.name}`
        : member.rel,
    siteOf: (member) =>
      member.surface === "manifest" ? resolve(root, member.attrs.path) : resolve(root, member.rel),
    examine: (member) =>
      member.surface === "manifest"
        ? evaluateManifestNode(member.attrs)
        : scanTsSource(ctx, member.rel),
  })

  return exitOnResult({
    violations,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header:
        "K8s pod-placement violations (node pins are optional; any nodeSelector / nodeAffinity key present must be a valid workload-class or GPU-capacity selector — no hostname pins, no nodeName; DaemonSets exempt from the key rules only)",
      successMessage: `Node pins are optional; every nodeSelector / nodeAffinity key present is a valid workload-class or GPU-capacity selector (${ACCEPTED_SELECTOR_KEYS_HUMAN}); no pod spec sets nodeName outside the tracked exception; no TS literals outside k8s-types/src/hostnames.ts.`,
      groupBy: (v) => v.file,
      formatViolation: (v) => `[${v.kind}] line ${v.line}: ${v.message}`,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
