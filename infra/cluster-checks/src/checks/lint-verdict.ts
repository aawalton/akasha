#!/usr/bin/env bun

import { spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { repoFilesAt } from "../../../../tools/lib/repo-files-at.ts"
import { biomePositiveExtensions, parseBiomeIncludes } from "../lib/biome-lint-scope.ts"
import { parseArgs as parseCliArgs } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../tools/lib/check-workflow/error-message"
import {
  countTrackedLintable,
  decideLintExit,
  deriveLintVerdict,
  type LintVerdict,
} from "../lib/lint-verdict-core.ts"
import { foldLintVerdicts } from "../lib/lint-verdict-fold.ts"
import { getRepoRoot } from "../lib/repo-root.ts"
import { emitVerdict } from "../../../../tools/lib/verdict-channel"

const PREFIX = "[lint-verdict]"

const FLAG_SPEC = {
  json: { kind: "boolean" },
  repoRoot: { kind: "string" },
} as const

interface CliArgs {
  readonly repoRoot: string
  readonly paths: readonly [string, ...(readonly string[])]
  readonly json: boolean
}

function parseArgs(argv: readonly string[]): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(argv, FLAG_SPEC)
  } catch (err) {
    const msg = errorMessage(err).replace(/^Unknown flag: /, "unknown argument: ")
    console.error(`${PREFIX} ${msg}`)
    process.exit(2)
  }
  const repoRoot = parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot()
  const [firstPath, ...restPaths] = parsed.positionals
  const paths: readonly [string, ...string[]] =
    firstPath === undefined ? ["."] : [firstPath, ...restPaths]
  return { repoRoot, paths, json: parsed.flags.json }
}

function referenceSetCounter(args: CliArgs): (path: string) => number | null {
  try {
    const includes = parseBiomeIncludes(readFileSync(join(args.repoRoot, "biome.json"), "utf-8"))
    const files = repoFilesAt(args.repoRoot, {
      includeFixtures: true,
      includeGenerated: true,
    })
    const extensions = biomePositiveExtensions(includes)
    return (path) => countTrackedLintable(files, extensions, [path])
  } catch {
    return () => null
  }
}

function runOnePath(args: CliArgs, path: string, trackedLintable: number | null): LintVerdict {
  const biomeBin = resolve(args.repoRoot, "node_modules/.bin/biome")
  const result = spawnSync(biomeBin, ["check", path, "--reporter=json", "--max-diagnostics=none"], {
    cwd: args.repoRoot,
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  })

  if (result.error != null) {
    return anomalyFromSpawn(result.error, path)
  }

  return deriveLintVerdict(result.stdout ?? "", result.status, path, trackedLintable, Date.now())
}

function runVerdict(args: CliArgs): LintVerdict {
  const referenceFor = referenceSetCounter(args)
  const [firstPath, ...restPaths] = args.paths
  return foldLintVerdicts([
    runOnePath(args, firstPath, referenceFor(firstPath)),
    ...restPaths.map((path) => runOnePath(args, path, referenceFor(path))),
  ])
}

function anomalyFromSpawn(err: Error, target: string): LintVerdict {
  const reason = `biome could not be run for target ${target}: ${errorMessage(err)}`
  return {
    kind: "fail",
    subject: "the-linted-tree",
    reason,
    observedAtMs: Date.now(),
    coverage: { observed: 0, declared: null, unit: "files" },
    evidence: {
      target,
      errors: 0,
      warnings: 0,
      infos: 0,
      errorsByCategory: { format: 0, rule: 0, other: 0 },
      filesOpened: 0,
      trackedLintable: null,
      filesNotOpened: null,
      biomeExitCode: null,
      measured: false,
    },
    findings: [{ detail: reason, at: target }],
  }
}

function emit(verdict: LintVerdict, json: boolean): undefined {
  if (json) {
    console.log(JSON.stringify(verdict))
    return
  }
  emitVerdict(verdict)
}

async function main(argv: readonly string[]): Promise<0 | 1 | 2> {
  const args = parseArgs(argv)
  const verdict = runVerdict(args)
  emit(verdict, args.json)
  return decideLintExit(verdict)
}

if (import.meta.main) {
  main(process.argv.slice(2))
    .then((exitCode) => {
      if (exitCode !== 0) process.exit(exitCode)
    })
    .catch((err) => {
      console.error(`${PREFIX} Unexpected error:`, err)
      process.exit(2)
    })
}
