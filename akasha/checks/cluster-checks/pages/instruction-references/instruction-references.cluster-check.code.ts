#!/usr/bin/env bun

import { execFileSync } from "node:child_process"
import { closeSync, existsSync, openSync, readSync } from "node:fs"
import { join, resolve } from "node:path"
import { parseArgs as parseCliArgs } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import {
  type InstructionReferenceViolation,
  scanForInstructionReferences,
} from "../../../../../infra/cluster-checks/src/lib/instruction-reference-scan.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import {
  examineFilePopulation,
  type Population,
} from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"

if (import.meta.main) refuseRetired()

const PREFIX = "[instruction-references]"

const FLAG_SPEC = {
  json: { kind: "boolean" },
  repoRoot: { kind: "string" },
} as const

const SNIFF_BYTES = 8192

function isText(path: string): boolean {
  let handle: number
  try {
    handle = openSync(path, "r")
  } catch {
    return false
  }
  try {
    const head = Buffer.alloc(SNIFF_BYTES)
    const read = readSync(handle, head, 0, SNIFF_BYTES, 0)
    return !head.subarray(0, read).includes(0)
  } finally {
    closeSync(handle)
  }
}

function trackedTextFiles(repoRoot: string): readonly string[] {
  const listed = execFileSync("git", ["ls-files", "-z"], {
    cwd: repoRoot,
    maxBuffer: 256 * 1024 * 1024,
  })
    .toString("utf8")
    .split("\0")
    .filter((one) => one !== "")
  return listed.filter((rel) => isText(join(repoRoot, rel)))
}

const HEADER =
  "Code naming an instructions-repo document. The rule is One-Way Dependency: state the invariant in your own words, address the page through a slug that arrives in data, or — where this is a test fixture — give it a scheme of its own, so that renaming an instruction costs seconds rather than a deploy."

function main(): never {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
    flags = { json: parsed.flags.json, repoRoot: parsed.flags.repoRoot }
  } catch (error) {
    return exitOnToolError({ error, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    return exitOnToolError({
      error: new Error(`--repo-root ${repoRoot} does not exist`),
      prefix: PREFIX,
    })
  }

  let examined: {
    readonly population: Population
    readonly violations: readonly InstructionReferenceViolation[]
  }
  try {
    const files = trackedTextFiles(repoRoot)
    examined = examineFilePopulation<InstructionReferenceViolation>({
      files,
      unit: "tracked text files in the whole tree",
      membership: {
        kind: "enumerated",
        because:
          "`git ls-files` names every tracked file, so the reach follows the repo rather than a list of extensions here",
      },
      pathOf: (rel) => join(repoRoot, rel),
      scan: scanForInstructionReferences,
    })
  } catch (error) {
    return exitOnToolError({ error, prefix: PREFIX })
  }

  return exitOnResult<InstructionReferenceViolation>({
    violations: examined.violations,
    options: {
      population: examined.population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: HEADER,
      successMessage: "No instructions-repo document is named in code.",
      formatViolation: (v) => `${v.file}:${v.line} — ${v.value}`,
    },
  })
}

main()
