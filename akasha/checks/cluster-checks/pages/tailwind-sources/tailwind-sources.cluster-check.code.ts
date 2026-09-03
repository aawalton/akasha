#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { parseArgs as parseCliArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  type CssFile,
  readCssFiles,
} from "../../modules/css-source-directives/css-source-directives.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  enumerateTailwindApps,
  enumerateTailwindCandidates,
  examineTailwindApp,
  type TailwindApp,
  type TailwindSourceViolation,
} from "../../modules/tailwind-sources-violations/tailwind-sources-violations.module.code.ts"
import {
  type TreeReading,
  treeReadingAt,
} from "../../modules/tree-reading/tree-reading.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"
import {
  readWorkspacePackages,
  type WorkspacePackage,
  workspaceOwnerOf,
} from "../../modules/workspace-packages/workspace-packages.module.code.ts"
import { discoverWorkspaceTsFiles } from "../../modules/workspace-ts-files/workspace-ts-files.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[tailwind-sources]"

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

const bodyAt = (reading: TreeReading, path: string, kind: string): string => {
  const body = reading.read(path)
  if (body === null) {
    throw new Error(
      `${path} stands as a ${kind} in the tree this run read and that tree holds no body for it, so whether it belongs in this population cannot be answered`
    )
  }
  return body
}

const CSS_BLOCK_COMMENT = /\/\*[\s\S]*?\*\//g

const TAILWIND_IMPORT =
  /@import\s+(?:url\s*\(\s*)?["']?tailwindcss["']?\s*\)?\s*(?:layer\s*\([^)]*\)\s*)?;/

const computePackageSourceRootByName = (
  packages: readonly WorkspacePackage[]
): ReadonlyMap<string, string> => {
  const out = new Map<string, string>()
  for (const one of packages) {
    if (one.path === "") continue
    out.set(one.name, one.sourceRoot)
  }
  return out
}

const computeEntryCssPaths = (
  reading: TreeReading,
  cssFiles: readonly CssFile[]
): ReadonlySet<string> => {
  const out = new Set<string>()
  for (const one of cssFiles) {
    const content = bodyAt(reading, one.path, "css-file")
    if (TAILWIND_IMPORT.test(content.replace(CSS_BLOCK_COMMENT, ""))) out.add(one.path)
  }
  return out
}

const computeUiPackageNames = (reading: TreeReading): ReadonlySet<string> => {
  const byPackage = new Map<string, string[]>()
  for (const found of discoverWorkspaceTsFiles(reading)) {
    if (!found.relPath.endsWith(".tsx")) continue
    if (found.packageName === "") continue
    const bucket = byPackage.get(found.packageName)
    if (bucket === undefined) byPackage.set(found.packageName, [found.relPath])
    else bucket.push(found.relPath)
  }
  const out = new Set<string>()
  for (const [pkg, paths] of byPackage) {
    for (const path of paths) {
      if (bodyAt(reading, path, "tsx-file").includes("className=")) {
        out.add(pkg)
        break
      }
    }
  }
  return out
}

function main(): never {
  const args = parseArgs()
  const repoRoot = codeRoot()

  let reading: TreeReading
  let packages: readonly WorkspacePackage[]
  let cssFiles: readonly CssFile[]
  let packageSourceRootByName: ReadonlyMap<string, string>
  let uiPackageNames: ReadonlySet<string>
  let entryCssPaths: ReadonlySet<string>
  try {
    reading = treeReadingAt(repoRoot, args.treeSha)
    packages = readWorkspacePackages(reading)
    cssFiles = readCssFiles(reading, (relPath) => workspaceOwnerOf(relPath, packages))
    packageSourceRootByName = computePackageSourceRootByName(packages)
    uiPackageNames = computeUiPackageNames(reading)
    entryCssPaths = computeEntryCssPaths(reading, cssFiles)
  } catch (err) {
    return toolExit(`failed to read the tree at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const input = {
    packages,
    cssByPath: new Map(cssFiles.map((one) => [one.path, one])),
    repoRoot,
    packageSourceRootByName,
    uiPackageNames,
    entryCssPaths,
  }

  const packagesWalked = enumerateTailwindCandidates(packages).length
  const { population, violations } = examinePopulation<TailwindApp, TailwindSourceViolation>({
    members: enumerateTailwindApps(cssFiles, entryCssPaths),
    unit: "Tailwind entry stylesheets",
    membership: {
      kind: "enumerated",
      because:
        "`enumerateTailwindApps` is a straight read of every `.css` file the tree at the sha " +
        "this run was given holds, narrowed by a per-file read that raises rather than " +
        "answering `not an entry`, and both halves arrive whole or not at all: the file list " +
        "comes from one `git ls-tree` over that sha which raises rather than handing back a " +
        "short list, and the bodies come from one `git cat-file --batch` over that same tree " +
        "which raises unless it accounts for every byte, with a body it has no entry for " +
        "raising here rather than reading as a stylesheet that is not an entry",
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

try {
  main()
} catch (err: unknown) {
  exitOnToolError({ error: err, prefix: PREFIX })
}
