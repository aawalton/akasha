#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { repoFilesAt } from "../../../../tools/lib/repo-files-at.ts"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import { examineFilePopulation } from "../../../../tools/lib/check-workflow/population"
import { isScannedTextPath, type RawNulViolation, toRawNulViolations } from "../lib/raw-nul-bytes.ts"
import { getRepoRoot } from "../lib/repo-root.ts"
import { exitOnResult } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[no-raw-nul-bytes]"

function main(): never {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseArgs(Bun.argv.slice(2), STANDARD_FLAGS, { passthrough: true })
    flags = { json: parsed.flags.json, repoRoot: parsed.flags.repoRoot }
  } catch (err) {
    process.stderr.write(`${PREFIX} ${err instanceof Error ? err.message : String(err)}\n`)
    process.exit(2)
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    process.stderr.write(`${PREFIX} --repo-root ${repoRoot} does not exist\n`)
    process.exit(2)
  }

  const files = repoFilesAt(repoRoot, { includeFixtures: true, includeGenerated: true })
  const textFiles = files.filter((rel) => isScannedTextPath(rel))
  const skippedBinary = files.length - textFiles.length

  const { population, violations } = examineFilePopulation<RawNulViolation>({
    files: textFiles,
    unit: "tracked text files",
    membership: {
      kind: "enumerated",
      because:
        "`repoFilesAt` throws — with git's own stderr in the message — when `git ls-files` fails, " +
        "instead of the `catch { return [] }` it used to have, so a shorter list is fewer tracked files; " +
        "`isScannedTextPath` narrows on the extension alone and the count it drops is reported as " +
        "`skippedBinary` beside the bound",
    },
    pathOf: (rel) => resolve(repoRoot, rel),
    readFile: (path) => readFileSync(path, "latin1"),
    scan: (rel, source) => toRawNulViolations(rel, Buffer.from(source, "latin1")),
  })

  const populationSummary = `scanned ${population.examined.length} tracked text files (${skippedBinary} binary assets skipped by extension)`

  exitOnResult({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        "raw NUL bytes in tracked text files — one NUL makes the whole file invisible to grep, which reports a clean non-match rather than a binary match. Replace each with the 4-digit unicode escape (byte-identical at runtime)",
      successMessage: `No raw NUL bytes — ${populationSummary}.`,
      footer: (count) => `${PREFIX} ${count} raw NUL byte(s) found; ${populationSummary}`,
      formatViolation: (v) => `${v.file}:${v.line}:${v.column} ${v.message}`,
    },
  })
}

if (import.meta.main) {
  try {
    main()
  } catch (err) {
    console.error(`${PREFIX} Unexpected error:`, err)
    process.exit(2)
  }
}
