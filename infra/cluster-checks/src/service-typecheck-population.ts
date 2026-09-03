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
import { walkReferenceClosure } from "./lib/typecheck-reach"

const PREFIX = "[service-typecheck] population:"

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx"])

function refuse(reason: string): never {
  console.error(`${PREFIX} REFUSED — ${reason}`)
  process.exit(1)
}

function say(line: string): undefined {
  console.log(`${PREFIX} ${line}`)
}

function dirsFrom(raw: readonly string[]): readonly string[] {
  return raw.map((d) => d.trim()).filter((d) => d !== "")
}

function sourcesUnder(
  dir: string,
  sources: readonly string[],
  packageDirs: readonly string[]
): readonly string[] {
  const nested = packageDirs.filter((other) => other !== dir && other.startsWith(`${dir}/`))
  return sources.filter(
    (file) => file.startsWith(`${dir}/`) && !nested.some((n) => file.startsWith(`${n}/`))
  )
}

async function main(argv: readonly string[]): Promise<void> {
  const parsed = parseArgs(argv, {
    covered: { kind: "csv" },
    excluded: { kind: "csv" },
    repoRoot: { kind: "string" },
  } as const)
  const repoRoot = parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot()
  const covered = dirsFrom(parsed.flags.covered)
  const excluded = dirsFrom(parsed.flags.excluded)

  const compiler = resolve(repoRoot, COMPILER_BIN)
  if (!existsSync(compiler)) refuse(`no compiler at ${COMPILER_BIN} under ${repoRoot}`)
  if (!existsSync(resolve(repoRoot, ROOT_PROJECT))) refuse(`no ${ROOT_PROJECT} under ${repoRoot}`)

  const version = readCompilerVersion(repoRoot, compiler)
  if (!version.ok) refuse(`\`${COMPILER_BIN} --version\` exited ${version.exitCode}`)

  if (covered.length === 0) {
    refuse(
      "0 leaf package(s) to typecheck. Every leaf service, worker and local-service package was excluded, so this gate examined nothing and certifies nothing."
    )
  }

  let tracked: readonly string[]
  try {
    tracked = discoverRepoFiles(repoRoot, { includeFixtures: true, includeGenerated: true })
  } catch (err) {
    refuse(`the tracked file set could not be enumerated: ${errorMessage(err)}`)
  }
  const sources = tracked.filter((f) => SOURCE_EXTENSIONS.has(extname(f)))
  if (sources.length === 0) refuse(`no tracked TypeScript source under ${repoRoot}`)
  const packageDirs = tracked
    .filter((f) => f !== "package.json" && f.endsWith("/package.json"))
    .map((f) => f.slice(0, -"/package.json".length))

  const cache = await readReferenceClosure(repoRoot, compiler)
  const walked = walkReferenceClosure((p) => cache.get(p) ?? null, ROOT_PROJECT)
  if (walked.unreadable.length > 0) {
    refuse(
      `${walked.unreadable.length} project(s) in the root reference closure could not be resolved, the first being ${walked.unreadable[0]} — so what the root build covers is unknown and no exclusion can be checked`
    )
  }

  say(
    `compiler @typescript/native-preview ${version.version}, over ${walked.projects.length} project(s) in the root reference closure.`
  )
  say(`${covered.length} leaf package(s) this gate typechecks: ${covered.join(" ")}`)
  say(
    `${excluded.length} leaf package(s) dropped because root \`${ROOT_PROJECT}\` references them. Each is checked below against what that closure actually compiles; \`app-typecheck\`'s own members are dropped by a different rule and are not among them.`
  )

  const unbacked: string[] = []
  for (const dir of excluded) {
    const mine = sourcesUnder(dir, sources, packageDirs)
    const reached = mine.filter((f) => walked.reached.has(f)).length
    say(`the root build compiles ${reached} of ${mine.length} tracked source(s) in ${dir}`)
    if (mine.length > 0 && reached === 0) unbacked.push(dir)
  }

  if (unbacked.length > 0) {
    refuse(
      `${unbacked.length} package(s) were dropped from this gate because root \`${ROOT_PROJECT}\` references them, and the root build compiles none of their files: ${unbacked.join(" ")}. Membership of the root graph is not the coverage the drop claims — either the package's own project must include its sources, or it must stop being referenced so this gate takes it.`
    )
  }
}

if (import.meta.main) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(`${PREFIX} Unexpected error:`, err)
    process.exit(1)
  })
}
