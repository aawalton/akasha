#!/usr/bin/env bun

import { resolve } from "node:path"
import { classifyExtension } from "@akasha/code-system/file-kind"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { discoverRepoFiles } from "../../modules/repo-files/repo-files.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  formatShellcheckViolation,
  readShellcheckRun,
  SHELLCHECK_ARGV,
  type ShellcheckViolation,
} from "../../modules/shellcheck-violations/shellcheck-violations.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[shellcheck]"

function judge(repoRoot: string, rel: string): readonly ShellcheckViolation[] {
  const [command, ...rest] = SHELLCHECK_ARGV
  if (command === undefined) throw new Error("SHELLCHECK_ARGV is empty")
  const run = Bun.spawnSync([command, ...rest, rel], {
    cwd: repoRoot,
    stdout: "pipe",
    stderr: "pipe",
  })
  return readShellcheckRun({
    file: rel,
    exitCode: run.exitCode,
    stdout: run.stdout.toString(),
    stderr: run.stderr.toString(),
  })
}

function main(): never {
  let parsed: ReturnType<typeof parseArgs<typeof STANDARD_FLAGS>>
  try {
    parsed = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot()

  if (Bun.which("shellcheck") === null) {
    return exitOnToolError({
      error: new Error(
        "no `shellcheck` on PATH, so no shell script was judged. The CI images carry it in the /ci-storage toolchain; a workstation needs it installed."
      ),
      prefix: PREFIX,
    })
  }

  let files: readonly string[]
  try {
    files = discoverRepoFiles(repoRoot).filter((rel) => classifyExtension(rel) === "sh")
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const { population, violations } = examinePopulation<string, ShellcheckViolation>({
    members: files,
    unit: "shell scripts",
    membership: {
      kind: "enumerated",
      because:
        "the members are `discoverRepoFiles` narrowed by `classifyExtension`, and the `git ls-files` beneath it raises with git's own stderr rather than returning short — so fewer members means fewer shell scripts in the tree",
    },
    labelOf: (rel) => rel,
    siteOf: (rel) => `${repoRoot}/${rel}`,
    examine: (rel) => judge(repoRoot, rel),
  })

  exitOnResult<ShellcheckViolation>({
    violations,
    options: {
      population,
      prefix: PREFIX,
      format: parsed.flags.json ? "json" : "human",
      header: "shellcheck refuses these shell scripts",
      formatViolation: formatShellcheckViolation,
      successMessage: "every shell script in the tree passes shellcheck.",
    },
  })
}

main()
