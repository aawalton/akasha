#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { extname, resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { parseArgs } from "../../../akasha/checks/cluster-checks/modules/cli-args/cli-args.module.code.ts"
import { discoverRepoFiles } from "../../../akasha/checks/cluster-checks/modules/repo-files/repo-files.module.code.ts"
import { getRepoRoot } from "../../../akasha/checks/cluster-checks/modules/repo-root/repo-root.module.code.ts"
import {
  COMPILER_BIN,
  ROOT_PROJECT,
  readCompilerVersion,
  readReferenceClosure,
} from "./lib/typecheck-closure-read"
import { foldReachByPackage, type PackageReach, walkReferenceClosure } from "./lib/typecheck-reach"

const PREFIX = "[typecheck] population:"

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx"])
const MANIFEST = "package.json"

function refuse(reason: string): never {
  console.error(`${PREFIX} REFUSED — ${reason}`)
  process.exit(1)
}

function repoRootFrom(argv: readonly string[]): string {
  const parsed = parseArgs(argv, { repoRoot: { kind: "string" } } as const)
  return parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot()
}

function packageDirsFrom(trackedFiles: readonly string[]): readonly string[] {
  const dirs: string[] = []
  for (const file of trackedFiles) {
    if (file === MANIFEST || !file.endsWith(`/${MANIFEST}`)) continue
    dirs.push(file.slice(0, -(MANIFEST.length + 1)))
  }
  return dirs
}

function say(line: string): undefined {
  console.log(`${PREFIX} ${line}`)
}

function sayPackage(row: PackageReach): undefined {
  say(
    row.reached === 0
      ? `reaches nothing of ${row.dir} — ${row.unreached} tracked source(s)`
      : `reaches ${row.reached} of ${row.reached + row.unreached} in ${row.dir}`
  )
}

async function main(argv: readonly string[]): Promise<void> {
  const repoRoot = repoRootFrom(argv)
  const compiler = resolve(repoRoot, COMPILER_BIN)
  if (!existsSync(compiler)) refuse(`no compiler at ${COMPILER_BIN} under ${repoRoot}`)
  if (!existsSync(resolve(repoRoot, ROOT_PROJECT))) refuse(`no ${ROOT_PROJECT} under ${repoRoot}`)

  const compilerVersion = readCompilerVersion(repoRoot, compiler)
  if (!compilerVersion.ok) {
    refuse(`\`${COMPILER_BIN} --version\` exited ${compilerVersion.exitCode}`)
  }
  const version = compilerVersion.version
  const cache = await readReferenceClosure(repoRoot, compiler)
  const walked = walkReferenceClosure((p) => cache.get(p) ?? null, ROOT_PROJECT)
  if (walked.unreadable.length > 0) {
    refuse(
      `${walked.unreadable.length} project(s) in the reference closure could not be resolved, the first being ${walked.unreadable[0]}`
    )
  }
  if (walked.projects.length < 2) {
    refuse(`${ROOT_PROJECT} references no project, so this build's graph is the root alone`)
  }

  let tracked: readonly string[]
  try {
    tracked = discoverRepoFiles(repoRoot, { includeFixtures: true, includeGenerated: true })
  } catch (err) {
    refuse(`the tracked file set could not be enumerated: ${errorMessage(err)}`)
  }
  const sources = tracked.filter((f) => SOURCE_EXTENSIONS.has(extname(f)))
  if (sources.length === 0) refuse(`no tracked TypeScript source under ${repoRoot}`)

  const fold = foldReachByPackage({
    trackedSources: sources,
    reached: walked.reached,
    packageDirs: packageDirsFrom(tracked),
  })
  if (fold.reached === 0) {
    refuse(
      `the reference closure roots no tracked source, over ${walked.projects.length} project(s)`
    )
  }

  say(
    `compiler @typescript/native-preview ${version}, the only typechecker any step of this pipeline runs. Classic \`tsc\` is installed as a library, is run by no step, and disagrees with this one on this tree.`
  )
  say(
    `${fold.reached} of ${fold.tracked} tracked TypeScript sources, over ${walked.projects.length} project(s) in the root reference closure.`
  )
  say(
    `${fold.noneReached.length + fold.partial.length} package(s) hold a tracked source this build does not reach, ${fold.noneReached.length} of them reaching none at all. This is THIS gate's reach: \`app-typecheck\` and \`service-typecheck\` cover a complement it does not measure, and neither is a claim about the other.`
  )
  for (const row of fold.noneReached) sayPackage(row)
  for (const row of fold.partial) sayPackage(row)
}

if (import.meta.main) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(`${PREFIX} Unexpected error:`, err)
    process.exit(1)
  })
}
