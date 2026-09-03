import ts from "typescript"
import { classifyToken } from "../operator-classification/operator-classification.module.code.ts"
import {
  type FunctionNode,
  isFunctionBearing,
} from "../walk-functions/walk-functions.module.code.ts"

export interface HalsteadMetrics {
  readonly distinctOperators: number
  readonly distinctOperands: number
  readonly totalOperators: number
  readonly totalOperands: number
  readonly vocabulary: number
  readonly length: number
  readonly volume: number
  readonly difficulty: number
  readonly effort: number
  readonly time: number
  readonly bugs: number
}

interface ExcludedRange {
  readonly start: number
  readonly end: number
}

function collectExcludedRanges(fn: FunctionNode): readonly ExcludedRange[] {
  const ranges: ExcludedRange[] = []
  function visit(n: ts.Node): undefined {
    if (n !== fn && isFunctionBearing(n)) {
      ranges.push({ start: n.getStart(), end: n.getEnd() })
      return
    }
    if (n !== fn && ts.isTypeNode(n)) {
      ranges.push({ start: n.getStart(), end: n.getEnd() })
      return
    }
    ts.forEachChild(n, visit)
  }
  ts.forEachChild(fn, (child) => {
    visit(child)
  })
  return ranges
}

function inAnyRange(pos: number, ranges: readonly ExcludedRange[]): boolean {
  for (const r of ranges) {
    if (pos >= r.start && pos < r.end) return true
  }
  return false
}

export function computeHalstead(node: FunctionNode): HalsteadMetrics {
  const body = node.body
  if (body === undefined) return zeroMetrics()

  const sourceFile = node.getSourceFile()
  const excluded = collectExcludedRanges(node)
  const bodyStart = body.getStart(sourceFile)
  const bodyEnd = body.getEnd()

  const distinctOps = new Set<ts.SyntaxKind>()
  const distinctOperands = new Set<string>()
  let totalOps = 0
  let totalOperands = 0

  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    true,
    ts.LanguageVariant.Standard,
    sourceFile.text
  )
  scanner.setTextPos(bodyStart)
  while (true) {
    const tok = scanner.scan()
    if (tok === ts.SyntaxKind.EndOfFileToken) break
    const tokenStart = scanner.getTokenStart()
    if (tokenStart >= bodyEnd) break
    if (inAnyRange(tokenStart, excluded)) continue
    const cls = classifyToken(tok)
    if (cls === "operator") {
      distinctOps.add(tok)
      totalOps++
    } else if (cls === "operand") {
      distinctOperands.add(scanner.getTokenText())
      totalOperands++
    }
  }

  return derive(distinctOps.size, distinctOperands.size, totalOps, totalOperands)
}

function zeroMetrics(): HalsteadMetrics {
  return {
    distinctOperators: 0,
    distinctOperands: 0,
    totalOperators: 0,
    totalOperands: 0,
    vocabulary: 0,
    length: 0,
    volume: 0,
    difficulty: 0,
    effort: 0,
    time: 0,
    bugs: 0,
  }
}

function derive(n1: number, n2: number, N1: number, N2: number): HalsteadMetrics {
  const vocabulary = n1 + n2
  const length = N1 + N2
  const volume = vocabulary > 0 ? length * Math.log2(vocabulary) : 0
  const difficulty = n2 === 0 ? 0 : (n1 / 2) * (N2 / n2)
  const effort = difficulty * volume
  const time = effort / 18
  const bugs = volume / 3000
  return {
    distinctOperators: n1,
    distinctOperands: n2,
    totalOperators: N1,
    totalOperands: N2,
    vocabulary,
    length,
    volume,
    difficulty,
    effort,
    time,
    bugs,
  }
}
