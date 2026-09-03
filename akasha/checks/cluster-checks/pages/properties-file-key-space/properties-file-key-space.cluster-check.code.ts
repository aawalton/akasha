#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { relative } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { findFiles } from "../../../../../tools/lib/check-workflow/file-finder"
import {
  examineFilePopulation,
  type Population,
} from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  type Violation,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { parseArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  CANARY_FIXTURE,
  canaryDisagreement,
  KEY_SPACE_SCAN_BOUND,
  PROPERTIES_FILE_CANONICAL_KEY,
  PROPERTIES_FILE_WRONG_KEY,
  scanPropertiesFileKeySpace,
} from "../../modules/properties-file-key-space/properties-file-key-space.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[properties-file-key-space]"

const KEY = PROPERTIES_FILE_WRONG_KEY

interface KeySpaceViolation extends Violation {
  readonly file: string
  readonly line: number
  readonly text: string
}

interface CarrierState {
  readonly carrier: string
  readonly state: "evaluated" | "unevaluated"
  readonly denominator: number | null
  readonly reason: string
}

function proveScannerAlive(repoRoot: string): string | null {
  const path = `${repoRoot}/${CANARY_FIXTURE}`
  if (!existsSync(path)) return `canary absent at ${CANARY_FIXTURE}`
  return canaryDisagreement(readFileSync(path, "utf8"))
}

function scanRoot(root: string): {
  population: Population
  violations: readonly KeySpaceViolation[]
  read: number
  parsed: number
} {
  let parsed = 0
  const { population, violations } = examineFilePopulation<KeySpaceViolation>({
    files: findFiles({ cwd: root, patterns: ["**/*.ts", "**/*.tsx"], absolute: true }),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`findFiles` globs `root` with `Bun.Glob.scanSync`, which raises ENOENT on a root that is not there, and `main` has already exited on an absent root and exits again on a walk that read nothing — so fewer members means fewer source files under `root`",
    },
    scan: (abs, content) => {
      if (!content.includes(KEY)) return []
      parsed += 1
      return scanPropertiesFileKeySpace(content, abs).map((claim) => ({
        file: relative(root, abs),
        line: claim.line,
        text: claim.text,
      }))
    },
  })
  return { population, violations, read: population.examined.length, parsed }
}

function reportCoverage(carriers: readonly CarrierState[]): undefined {
  const lines = [
    `${PREFIX} what this run evaluated, so coverage is read rather than inferred:`,
    ...carriers.map((c) =>
      c.state === "evaluated"
        ? `  ${c.carrier} — evaluated, ${String(c.denominator)} files. ${c.reason}`
        : `  ${c.carrier} — UNEVALUATED, no denominator. ${c.reason}`
    ),
    `${PREFIX} not detected by this scan:`,
    ...KEY_SPACE_SCAN_BOUND.map((b) => `  - ${b}`),
  ]
  process.stderr.write(`${lines.join("\n")}\n`)
}

function main(): never {
  const args = parseArgs(process.argv.slice(2), {
    json: { kind: "boolean" },
    root: { kind: "string" },
  })
  const repoRoot = getRepoRoot()
  const root = args.flags.root ?? repoRoot

  const dead = proveScannerAlive(ownRepoRoot())
  if (dead !== null) {
    process.stderr.write(
      `${PREFIX} SCANNER DEFECTIVE — ${dead}\n` +
        "  A run that cannot find the specimen it ships cannot certify anything about the source files.\n"
    )
    process.exit(2)
  }

  if (!existsSync(root)) {
    process.stderr.write(
      `${PREFIX} ROOT ABSENT — ${root} is not on this filesystem.\n` +
        "  A carrier that should be present and is not is an error, never an empty set of files.\n"
    )
    process.exit(2)
  }

  const { population, violations, read, parsed } = scanRoot(root)
  if (read === 0) {
    process.stderr.write(
      `${PREFIX} NO TYPESCRIPT FOUND under ${root}.\n` +
        "  A tree someone pointed this at holds source. Zero is the walk failing, not the source\n" +
        "  files being clean — and a zero nobody predicted reads exactly like a pass.\n"
    )
    process.exit(2)
  }

  reportCoverage([
    {
      carrier:
        root === repoRoot
          ? "code-repo (.ts/.tsx) — help strings and comments"
          : `${root} (.ts/.tsx) — help strings and comments`,
      state: "evaluated",
      denominator: read,
      reason: `${String(parsed)} carried the key at all and were parsed; the rest cannot contain the claim. Fixtures are outside the walk.`,
    },
    {
      carrier: "markdown (repo docs, CLAUDE.md)",
      state: "unevaluated",
      denominator: null,
      reason: "help text is TypeScript; a document restating the key space is not read here.",
    },
  ])

  exitOnResult<KeySpaceViolation>({
    violations,
    options: {
      population,
      format: args.flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        `A properties-file key lands verbatim — nothing resolves it — so a help text or a comment documenting the key space as \`${KEY}\` ` +
        `instructs a reader to write a property-definition UUID where an attribute key belongs, and the row then reads EMPTY rather than damaged. Use \`${PROPERTIES_FILE_CANONICAL_KEY}\``,
      successMessage: "No help text or comment documents the wrong properties-file key space.",
      formatViolation: (v) => `${v.file} line ${String(v.line)} — ${v.text}`,
    },
  })
}

main()
