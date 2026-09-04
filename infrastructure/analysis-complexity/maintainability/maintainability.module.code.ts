import ts from "typescript"
import { computeCyclomaticComplexity } from "../cyclomatic/cyclomatic.module.code.ts"
import { computeHalstead } from "../halstead/halstead.module.code.ts"
import { walkFunctions } from "../walk-functions/walk-functions.module.code.ts"

export interface MaintainabilityMetrics {
  readonly mi: number
  readonly volumeSum: number
  readonly ccSum: number
  readonly sloc: number
}

export function computeMaintainabilityIndex(sourceFile: ts.SourceFile): MaintainabilityMetrics {
  const fns = walkFunctions(sourceFile)
  const sloc = countSloc(sourceFile)
  let volumeSum = 0
  let ccSum = 0
  for (const fn of fns) {
    volumeSum += computeHalstead(fn.node).volume
    ccSum += computeCyclomaticComplexity(fn.node)
  }
  let mi: number
  if (volumeSum === 0) {
    mi = 100
  } else {
    const lnV = Math.log(volumeSum)
    const lnL = sloc > 0 ? Math.log(sloc) : 0
    const raw = (100 * (171 - 5.2 * lnV - 0.23 * ccSum - 16.2 * lnL)) / 171
    mi = Math.max(0, raw)
  }
  return { mi, volumeSum, ccSum, sloc }
}

export function countSloc(sourceFile: ts.SourceFile): number {
  const text = sourceFile.text
  if (text.length === 0) return 0
  const lines = new Set<number>()
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, true, ts.LanguageVariant.Standard, text)
  while (true) {
    const tok = scanner.scan()
    if (tok === ts.SyntaxKind.EndOfFileToken) break
    const pos = scanner.getTokenStart()
    const { line } = sourceFile.getLineAndCharacterOfPosition(pos)
    lines.add(line)
  }
  return lines.size
}
