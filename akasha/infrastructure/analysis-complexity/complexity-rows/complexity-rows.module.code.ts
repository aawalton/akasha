import { readFileSync } from "node:fs"
import { relative, resolve } from "node:path"
import { InputError } from "@akasha/errors-core/exit-code"
import ts from "typescript"
import { computeCyclomaticComplexity } from "../cyclomatic/cyclomatic.module.code.ts"
import {
  listWorkspaceTypeScriptFiles,
  resolveRepoRoot,
} from "../file-discovery/file-discovery.module.code.ts"
import { computeHalstead } from "../halstead/halstead.module.code.ts"
import { computeMaintainabilityIndex } from "../maintainability/maintainability.module.code.ts"
import { walkFunctions } from "../walk-functions/walk-functions.module.code.ts"

export interface AnalysisInputs {
  readonly repoRoot: string
  readonly files: readonly string[]
}

export function resolveAnalysisInputs(fileFlag: string | undefined): AnalysisInputs {
  const cwd = process.cwd()
  const repoRoot = resolveRepoRoot(cwd)
  if (repoRoot === undefined) {
    throw new InputError("not inside a git repository (could not resolve --show-toplevel)")
  }
  if (fileFlag !== undefined) {
    const abs = resolve(cwd, fileFlag)
    return { repoRoot, files: [abs] }
  }
  return { repoRoot, files: listWorkspaceTypeScriptFiles(repoRoot) }
}

export interface CyclomaticRow {
  readonly file: string
  readonly function: string
  readonly line: number
  readonly cc: number
}

export interface HalsteadRow {
  readonly file: string
  readonly function: string
  readonly line: number
  readonly n1: number
  readonly n2: number
  readonly N1: number
  readonly N2: number
  readonly volume: number
  readonly difficulty: number
  readonly effort: number
  readonly time: number
  readonly bugs: number
}

export interface MaintainabilityRow {
  readonly file: string
  readonly mi: number
  readonly sloc: number
  readonly ccSum: number
  readonly volumeSum: number
}

function parseSourceFile(absPath: string): ts.SourceFile | undefined {
  let text: string
  try {
    text = readFileSync(absPath, "utf-8")
  } catch {
    return undefined
  }
  return ts.createSourceFile(absPath, text, ts.ScriptTarget.Latest, true)
}

function repoRelative(absPath: string, repoRoot: string): string {
  const rel = relative(repoRoot, absPath)
  return rel.length > 0 ? rel : absPath
}

export function collectCyclomaticRows(inputs: AnalysisInputs): readonly CyclomaticRow[] {
  const out: CyclomaticRow[] = []
  for (const abs of inputs.files) {
    const sf = parseSourceFile(abs)
    if (sf === undefined) continue
    const file = repoRelative(abs, inputs.repoRoot)
    for (const fn of walkFunctions(sf)) {
      out.push({
        file,
        function: fn.name,
        line: fn.line,
        cc: computeCyclomaticComplexity(fn.node),
      })
    }
  }
  return out
}

export function collectHalsteadRows(inputs: AnalysisInputs): readonly HalsteadRow[] {
  const out: HalsteadRow[] = []
  for (const abs of inputs.files) {
    const sf = parseSourceFile(abs)
    if (sf === undefined) continue
    const file = repoRelative(abs, inputs.repoRoot)
    for (const fn of walkFunctions(sf)) {
      const m = computeHalstead(fn.node)
      out.push({
        file,
        function: fn.name,
        line: fn.line,
        n1: m.distinctOperators,
        n2: m.distinctOperands,
        N1: m.totalOperators,
        N2: m.totalOperands,
        volume: m.volume,
        difficulty: m.difficulty,
        effort: m.effort,
        time: m.time,
        bugs: m.bugs,
      })
    }
  }
  return out
}

export function collectMaintainabilityRows(inputs: AnalysisInputs): readonly MaintainabilityRow[] {
  const out: MaintainabilityRow[] = []
  for (const abs of inputs.files) {
    const sf = parseSourceFile(abs)
    if (sf === undefined) continue
    const file = repoRelative(abs, inputs.repoRoot)
    const m = computeMaintainabilityIndex(sf)
    out.push({
      file,
      mi: m.mi,
      sloc: m.sloc,
      ccSum: m.ccSum,
      volumeSum: m.volumeSum,
    })
  }
  return out
}

export function percentile(sortedAsc: readonly number[], p: number): number {
  if (sortedAsc.length === 0) return 0
  const idx = (p / 100) * (sortedAsc.length - 1)
  const lo = Math.floor(idx)
  const hi = Math.ceil(idx)
  const a = sortedAsc[lo]
  if (a === undefined) return 0
  if (lo === hi) return a
  const b = sortedAsc[hi]
  if (b === undefined) return a
  return a * (hi - idx) + b * (idx - lo)
}
