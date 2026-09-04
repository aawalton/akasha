#!/usr/bin/env bun

import ts from "typescript"
import { parseArgs, STANDARD_FLAGS } from "../cli-args/cli-args.module.code.ts"
import { FILESYSTEM_WALK_EXEMPT_DIRS, findFiles } from "../file-finding/file-finding.module.code.ts"
import { examineFilePopulation } from "../population/population.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../retired/retired.module.code.ts"
import {
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"
import {
  exitOnResult,
  type Violation,
} from "../violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[lib-sets-per-piece-difficulty-boundary]"

const SUCCESS_MESSAGE =
  "LibSets' per-piece veteran readers are referenced only from their defining files and the sanctioned per-set surface."

const LIB_SETS_SRC = "temper/shared-addon-libraries-lib-sets/src/"

const HELPERS_FILE = `${LIB_SETS_SRC}tooltips/helpers.ts`

const PER_SET_SURFACE = `${LIB_SETS_SRC}tooltips/veteran-breakdown.ts`

const VETERAN_API_FILE = `${LIB_SETS_SRC}core/api-perfected-veteran-set.ts`

const SELF_SOURCE =
  "checks/cluster-checks/modules/check-lib-sets-per-piece-difficulty-boundary/check-lib-sets-per-piece-difficulty-boundary.module.code.ts"
const SELF_TEST =
  "infra/cluster-checks/src/checks/check-lib-sets-per-piece-difficulty-boundary.unit.test.ts"
const SELF_EXCLUDED: ReadonlySet<string> = new Set([SELF_SOURCE, SELF_TEST])

interface PerPieceBoundary {
  readonly symbols: readonly string[]
  readonly allowedFiles: readonly string[]
  readonly guidance: string
}

export const PER_PIECE_BOUNDARIES: readonly PerPieceBoundary[] = [
  {
    symbols: ["getDungeonDifficultyStr"],
    allowedFiles: [HELPERS_FILE, PER_SET_SURFACE],
    guidance:
      "`getDungeonDifficultyStr` answers a PER-PIECE question (is this item link's equip type veteran-gated?) " +
      "while reading like a per-set answer, and reads an equip type absent from the set's `veteran` table as a " +
      "measured `false`. It is preserved verbatim for drop-in fidelity with upstream LibSets, so it must not be " +
      `adopted. Call the per-set surface in ${PER_SET_SURFACE} instead — it is the only sanctioned caller.`,
  },
  {
    symbols: ["isVeteranSet", "IsVeteranSet"],
    allowedFiles: [VETERAN_API_FILE],
    guidance:
      "`lib.IsVeteranSet` answers a PER-PIECE question (is this item link's equip type veteran-gated?) while " +
      "reading like a per-set answer, and falls through to `false` for an equip type absent from the set's " +
      "`veteran` table, so unmeasured is indistinguishable from measured-not-veteran. It is preserved verbatim " +
      "as public API for drop-in fidelity with upstream LibSets, so it must not be adopted. The per-set answer " +
      `comes from ${PER_SET_SURFACE}.`,
  },
]

function buildSymbolIndex(
  boundaries: readonly PerPieceBoundary[]
): ReadonlyMap<string, PerPieceBoundary> {
  const index = new Map<string, PerPieceBoundary>()
  for (const boundary of boundaries) {
    for (const symbol of boundary.symbols) index.set(symbol, boundary)
  }
  return index
}

const BOUNDARY_BY_SYMBOL = buildSymbolIndex(PER_PIECE_BOUNDARIES)

export interface PerPieceVeteranViolation extends Violation {
  readonly kind: "per-piece-veteran-reference"
  readonly file: string
  readonly line: number
  readonly column: number
  readonly symbol: string
  readonly message: string
}

export function isOutOfScope(relPath: string): boolean {
  if (!relPath.endsWith(".ts") && !relPath.endsWith(".tsx")) return true
  if (relPath.endsWith(".d.ts")) return true
  if (relPath.includes("/dist/")) return true
  if (relPath.includes("/node_modules/")) return true
  if (relPath.split("/").some((segment) => FILESYSTEM_WALK_EXEMPT_DIRS.has(segment))) return true
  if (SELF_EXCLUDED.has(relPath)) return true
  return false
}

function referencedName(node: ts.Node): string | undefined {
  if (ts.isIdentifier(node)) return node.text
  if (ts.isStringLiteralLike(node)) return node.text
  return undefined
}

export function scanParsedPerPieceVeteranReferences(
  sourceFile: ts.SourceFile
): readonly PerPieceVeteranViolation[] {
  const relPath = sourceFile.fileName
  const applicable = new Map<string, PerPieceBoundary>()
  for (const [symbol, boundary] of BOUNDARY_BY_SYMBOL) {
    if (boundary.allowedFiles.includes(relPath)) continue
    if (!sourceFile.text.includes(symbol)) continue
    applicable.set(symbol, boundary)
  }
  if (applicable.size === 0) return []

  const violations: PerPieceVeteranViolation[] = []
  const visit = (node: ts.Node): undefined => {
    const name = referencedName(node)
    const boundary = name === undefined ? undefined : applicable.get(name)
    if (name !== undefined && boundary !== undefined) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(
        node.getStart(sourceFile)
      )
      violations.push({
        kind: "per-piece-veteran-reference",
        file: relPath,
        line: line + 1,
        column: character + 1,
        symbol: name,
        message: boundary.guidance,
      })
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sourceFile)
  return violations
}

export function scanPerPieceVeteranReferences(
  source: string,
  relPath: string
): readonly PerPieceVeteranViolation[] {
  return scanParsedPerPieceVeteranReferences(
    ts.createSourceFile(relPath, source, ts.ScriptTarget.Latest, true, scriptKindFor(relPath))
  )
}

export const libSetsPerPieceDifficultyBoundaryEntry: SyntaxScannerEntry = {
  name: "lib-sets-per-piece-difficulty-boundary",
  preFileSkip: (rel) => isOutOfScope(rel),
  findFindings: (sf) =>
    scanParsedPerPieceVeteranReferences(sf).map((v) => ({
      file: v.file,
      line: v.line,
      column: v.column,
      message: `\`${v.symbol}\` — ${v.message}`,
      groupKey: v.file,
    })),
  successMessage: SUCCESS_MESSAGE,
}

function main(): never {
  const { flags } = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
  const repoRoot = flags.repoRoot ?? getRepoRoot()
  const { population, violations } = examineFilePopulation<PerPieceVeteranViolation>({
    files: findFiles({
      cwd: repoRoot,
      patterns: ["**/*.ts", "**/*.tsx"],
      absolute: false,
    }).filter((rel) => !isOutOfScope(rel)),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "the members come from a `findFiles` glob of `**` under repoRoot, and `Bun.Glob.scanSync` " +
        "raises ENOENT on a root that is not there, so fewer files means fewer .ts/.tsx files on disk",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) => scanPerPieceVeteranReferences(source, rel),
  })
  exitOnResult({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        "reference(s) to LibSets' per-piece veteran readers outside their sanctioned files. " +
        "`getDungeonDifficultyStr` and `lib.IsVeteranSet` answer a PER-PIECE question (is this item link's " +
        "equip type veteran-gated?) while reading like a per-SET answer, and both conflate an equip type " +
        "ABSENT from the set's `veteran` table with a measured `false`. Both are preserved verbatim because " +
        "they are public API a drop-in replacement of upstream LibSets must not change — defective by " +
        `inheritance, never to be adopted. The correct per-set answer comes from ${PER_SET_SURFACE}`,
      successMessage: SUCCESS_MESSAGE,
      groupBy: (v) => v.file,
      formatViolation: (v) => `${v.line}:${v.column} \`${v.symbol}\` — ${v.message}`,
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
