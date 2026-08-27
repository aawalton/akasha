#!/usr/bin/env bun

import { resolve } from "node:path"
import { buildFrom, readAt } from "../../../../tools/lib/graph/held-snapshot.ts"
import {
  CSS_FILE_NODE_TYPE,
  CssFileAttrsSchema,
} from "../../../../tools/lib/graph/producers/file/css-file/types.ts"
import { TsFileAttrsSchema } from "../../../../tools/lib/graph/producers/file/ts-file/types-schemas.ts"
import { TSX_FILE_NODE_TYPE } from "../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import {
  PACKAGE_NODE_TYPE,
  PackageAttrsSchema,
} from "../../../../tools/lib/graph/producers/package/types.ts"
import { readRepoFile } from "../../../../tools/lib/graph/repos.ts"
import type { BuildContext, Graph } from "../../../../tools/lib/graph/types.ts"
import { codeRoot } from "../../../../tools/lib/code-root.ts"
import { parseArgs as parseCliArgs } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../tools/lib/check-workflow/error-message"
import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
import {
  enumerateTailwindApps,
  enumerateTailwindCandidates,
  examineTailwindApp,
  type TailwindApp,
  type TailwindSourceViolation,
} from "../lib/tailwind-sources-violations.ts"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[tailwind-sources]"

const CODE_REPO = "code"

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

const bodyAt = (ctx: BuildContext, path: string, kind: string, treeSha: string): string => {
  const body = readRepoFile(ctx, CODE_REPO, path)
  if (body === null) {
    throw new Error(
      `${path} stands as a ${kind} node in the graph built at ${treeSha} and that tree holds no body for it, so whether it belongs in this population cannot be answered`
    )
  }
  return body
}

const CSS_BLOCK_COMMENT = /\/\*[\s\S]*?\*\//g

const TAILWIND_IMPORT =
  /@import\s+(?:url\s*\(\s*)?["']?tailwindcss["']?\s*\)?\s*(?:layer\s*\([^)]*\)\s*)?;/

const computePackageSourceRootByName = (graph: Graph): ReadonlyMap<string, string> => {
  const out = new Map<string, string>()
  for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = PackageAttrsSchema.parse(node.attrs)
    if (attrs.path === "") continue
    out.set(attrs.name, attrs.sourceRoot)
  }
  return out
}

const computeEntryCssPaths = (
  graph: Graph,
  ctx: BuildContext,
  treeSha: string
): ReadonlySet<string> => {
  const out = new Set<string>()
  for (const node of graph.nodes(CSS_FILE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = CssFileAttrsSchema.parse(node.attrs)
    const content = bodyAt(ctx, attrs.path, "css-file", treeSha)
    if (TAILWIND_IMPORT.test(content.replace(CSS_BLOCK_COMMENT, ""))) out.add(attrs.path)
  }
  return out
}

const computeUiPackageNames = (
  graph: Graph,
  ctx: BuildContext,
  treeSha: string
): ReadonlySet<string> => {
  const out = new Set<string>()
  for (const node of graph.nodes(TSX_FILE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = TsFileAttrsSchema.parse(node.attrs)
    const pkg = attrs.package
    if (pkg === "") continue
    if (out.has(pkg)) continue
    const content = bodyAt(ctx, attrs.path, "tsx-file", treeSha)
    if (content.includes("className=")) out.add(pkg)
  }
  return out
}

async function main(): Promise<never> {
  const args = parseArgs()

  const { ctx } = readAt(args.treeSha)
  let graph: Graph
  try {
    graph = await buildFrom(ctx)
  } catch (err) {
    return toolExit(`failed to build the graph at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const repoRoot = codeRoot()

  let packageSourceRootByName: ReadonlyMap<string, string>
  let uiPackageNames: ReadonlySet<string>
  let entryCssPaths: ReadonlySet<string>
  try {
    packageSourceRootByName = computePackageSourceRootByName(graph)
    uiPackageNames = computeUiPackageNames(graph, ctx, args.treeSha)
    entryCssPaths = computeEntryCssPaths(graph, ctx, args.treeSha)
  } catch (err) {
    return toolExit(errorMessage(err))
  }

  const input = { graph, repoRoot, packageSourceRootByName, uiPackageNames, entryCssPaths }

  const packagesWalked = enumerateTailwindCandidates(graph).length
  const { population, violations } = examinePopulation<TailwindApp, TailwindSourceViolation>({
    members: enumerateTailwindApps(graph, entryCssPaths),
    unit: "Tailwind entry stylesheets",
    membership: {
      kind: "enumerated",
      because:
        "`enumerateTailwindApps` is a straight read of the graph's css-file nodes narrowed " +
        "by a per-file read that raises rather than answering `not an entry`, and both halves " +
        "arrive whole or not at all: the graph is built in process at the tree sha above from " +
        "a build that raises into the tool-error exit rather than handing over a partial node " +
        "set, and the bodies come from one `git cat-file --batch` over that same tree which " +
        "raises unless it accounts for every byte, with a body it has no entry for raising " +
        "here rather than reading as a stylesheet that is not an entry",
    },
    labelOf: (app) => app.cssPath,
    siteOf: (app) => resolve(repoRoot, app.cssPath),
    examine: (app) => examineTailwindApp(app, input),
  })

  const walked = `across ${packagesWalked} workspace packages walked for their dependency closures.`

  return exitOnResult({
    violations,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Tailwind @source coverage violations",
      successMessage: `No @source coverage violations found, ${walked}`,
      footer: (count) => `${PREFIX} ${count} violation(s) found, ${walked}`,
      groupBy: (v) => v.stylesheet,
      formatViolation: (v) => `[${v.kind}] ${v.detail}`,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
