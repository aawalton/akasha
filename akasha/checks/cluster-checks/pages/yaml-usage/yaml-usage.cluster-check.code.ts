#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { parseArgs as parseCliArgs } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import {
  findOrphans,
  type SourceFile,
} from "../../../../../infra/cluster-checks/src/lib/yaml-usage.ts"
import {
  FILESYSTEM_WALK_EXEMPT_DIRS,
  findFiles,
} from "../../../../../tools/lib/check-workflow/file-finder"
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
import { readRepoFile } from "../../../../../tools/lib/graph/repos.ts"
import type { BuildContext, Graph } from "../../../../../tools/lib/graph/types.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[yaml-usage]"

const CODE_REPO = "code"

const QUARANTINE_ROOT = "dirty"

const REMEDIATION_DOC = remediationHint(
  "fix: delete the file, or add a use site that references it"
)

const SOURCE_EXTENSIONS = [".ts", ".tsx", ".sh", ".bash", ".json", ".css"]

const SOURCE_PATTERNS = SOURCE_EXTENSIONS.map((ext) => `**/*${ext}`)

const YAML_FILES_AT_LEAST = 39

const CODE_SOURCES_AT_LEAST = 7000

const INSTRUCTIONS_SOURCES_AT_LEAST = 3500

const YAML_MEMBERSHIP_FROM =
  "the `yaml-file` and `yml-file` nodes of the graph built at the tree sha above, which held 39 " +
  "across both extensions when this least count was taken — the graph hands back whatever it " +
  "discovered rather than raising when it discovers less, so a run arriving under this read a " +
  "smaller tree than the commit holds, and lower it only alongside deliberately deleting that " +
  "many yaml files"

interface CliArgs {
  jsonOutput: boolean
  treeSha: string
}

interface OrphanRow {
  message?: string
  path: string
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

function short(paths: readonly string[], least: number, repo: string): never | undefined {
  if (paths.length >= least) return undefined
  return toolExit(
    `${paths.length} source file(s) arrived from ${repo} and every use site credited below is ` +
      `read out of one of them, so under ${least} the run would call used yaml files orphans ` +
      "and report a repository that is not there"
  )
}

function carriesUseSites(path: string): boolean {
  for (const segment of path.split("/")) {
    if (segment.startsWith(".")) return false
    if (FILESYSTEM_WALK_EXEMPT_DIRS.has(segment)) return false
  }
  return SOURCE_EXTENSIONS.some((ext) => path.endsWith(ext))
}

function codeSources(ctx: BuildContext): readonly SourceFile[] {
  const paths = (ctx.repoFiles.get(CODE_REPO) ?? []).filter(carriesUseSites)
  short(paths, CODE_SOURCES_AT_LEAST, "the code tree at this commit")
  const sources: SourceFile[] = []
  for (const path of paths) {
    const content = readRepoFile(ctx, CODE_REPO, path)
    if (content === null) {
      return toolExit(`the tree at this commit lists ${path} and carries no body for it`)
    }
    sources.push({ path, content })
  }
  return sources
}

function instructionsSources(): readonly SourceFile[] {
  const root = rootFor(resolveRoots(), AKASHA)
  const paths = findFiles({ cwd: root, patterns: SOURCE_PATTERNS, absolute: false }).filter(
    (path) => path.split("/")[0] !== QUARANTINE_ROOT
  )
  short(paths, INSTRUCTIONS_SOURCES_AT_LEAST, `the instructions tree at ${root}`)
  const sources: SourceFile[] = []
  for (const path of paths) {
    let content: string
    try {
      content = readFileSync(resolve(root, path), "utf-8")
    } catch (err) {
      return toolExit(
        `${root} lists ${path} and would not hand over its body: ${errorMessage(err)}`
      )
    }
    sources.push({ path: `instructions:${path}`, content })
  }
  return sources
}

async function readGraph(treeSha: string): Promise<{ ctx: BuildContext; graph: Graph }> {
  try {
    const ctx = readAt(treeSha).ctx
    return { ctx, graph: await buildFrom(ctx) }
  } catch (err) {
    return toolExit(`failed to build the yaml-file graph at ${treeSha}: ${errorMessage(err)}`)
  }
}

async function main(): Promise<never> {
  const args = parseArgs()
  const { ctx, graph } = await readGraph(args.treeSha)

  const root = codeRoot()
  const yamlPaths = graph
    .nodes(YAML_FILE_NODE_TYPES)
    .map((node) => YamlFileAttrsSchema.parse(node.attrs).path)

  const fromCode = codeSources(ctx)
  const fromInstructions = instructionsSources()
  const scanned = `${fromCode.length} code and ${fromInstructions.length} instructions source file(s)`
  const orphans = findOrphans({ yamlPaths, sources: [...fromCode, ...fromInstructions] })
  const orphanPaths = new Set(orphans.map((o) => o.path))

  const { population, violations } = examinePopulation<string, OrphanRow>({
    members: yamlPaths,
    unit: "yaml files",
    labelOf: (path) => path,
    siteOf: (path) => resolve(root, path),
    examine: (path) => (orphanPaths.has(path) ? [{ path }] : []),
    membership: {
      kind: "atLeast",
      members: YAML_FILES_AT_LEAST,
      from: YAML_MEMBERSHIP_FROM,
    },
  })
  const rows = [...violations].sort((a, b) => a.path.localeCompare(b.path))

  return exitOnResult({
    violations: rows,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header:
        "Orphan yaml files — no use site in either repository, the deploy that applies a manifest " +
        "standing in whichever of the two holds it",
      successMessage: `${yamlPaths.length} yaml files scanned against ${scanned} — every file has a recognized use site.`,
      formatViolation: (o) => o.path,
      footer: (count) =>
        `${PREFIX} ${count} orphan(s) of ${yamlPaths.length} yaml files, read against ${scanned} — ${REMEDIATION_DOC}`,
    },
  })
}

main().catch((err: unknown) =>
  exitOnToolError({ error: new Error(`Unexpected error: ${errorMessage(err)}`), prefix: PREFIX })
)
