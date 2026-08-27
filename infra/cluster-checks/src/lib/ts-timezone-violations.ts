import ts from "typescript"

export type TimezoneRule =
  | "t00-parse"
  | "hour-offset-constant"
  | "iana-zone-literal"
  | "utc-day-slice"

export interface TimezoneViolation {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly rule: TimezoneRule
  readonly snippet: string
}

const IANA_ZONE_RE =
  /^(America|Europe|Africa|Asia|Australia|Pacific|Atlantic|Indian|Antarctica)\/[A-Z][A-Za-z_]+(\/[A-Z][A-Za-z_]+)?$/

const T00_PREFIX_RE = /^T00:00(:00(\.\d+)?)?/

const HOUR_OFFSET_LITERAL = 3_600_000

function lineCol(sf: ts.SourceFile, pos: number): { line: number; column: number } {
  const { line, character } = ts.getLineAndCharacterOfPosition(sf, pos)
  return { line: line + 1, column: character + 1 }
}

function plusChainRightOperandStartsWithT00(arg: ts.Expression): boolean {
  if (ts.isBinaryExpression(arg) && arg.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const right = arg.right
    if (ts.isStringLiteral(right) || ts.isNoSubstitutionTemplateLiteral(right)) {
      if (T00_PREFIX_RE.test(right.text)) return true
    }
    return plusChainRightOperandStartsWithT00(arg.left)
  }
  return false
}

function templateSpanStartsWithT00(arg: ts.Expression): boolean {
  if (!ts.isTemplateExpression(arg)) return false
  for (const span of arg.templateSpans) {
    if (T00_PREFIX_RE.test(span.literal.text)) return true
  }
  return false
}

function isT00ParseViolation(node: ts.NewExpression): boolean {
  if (!ts.isIdentifier(node.expression)) return false
  if (node.expression.text !== "Date") return false
  const arg = node.arguments?.[0]
  if (!arg) return false
  return plusChainRightOperandStartsWithT00(arg) || templateSpanStartsWithT00(arg)
}

function numericValue(node: ts.NumericLiteral): number {
  const text = node.text.replace(/_/g, "")
  return Number(text)
}

function collectMulChainLiterals(node: ts.Node): readonly number[] {
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.AsteriskToken) {
    return [...collectMulChainLiterals(node.left), ...collectMulChainLiterals(node.right)]
  }
  if (ts.isParenthesizedExpression(node)) {
    return collectMulChainLiterals(node.expression)
  }
  if (ts.isNumericLiteral(node)) {
    const n = numericValue(node)
    if (!Number.isNaN(n)) return [n]
  }
  return []
}

function chainContainsHourOffset(literals: readonly number[]): boolean {
  if (literals.includes(HOUR_OFFSET_LITERAL)) return true
  return literals.includes(3600) && literals.includes(1000)
}

function isTopLevelMulChain(node: ts.BinaryExpression): boolean {
  if (node.operatorToken.kind !== ts.SyntaxKind.AsteriskToken) return false
  const parent = node.parent
  if (
    parent &&
    ts.isBinaryExpression(parent) &&
    parent.operatorToken.kind === ts.SyntaxKind.AsteriskToken
  ) {
    return false
  }
  return true
}

function isInsideMulChain(node: ts.Node): boolean {
  const parent = node.parent
  if (!parent) return false
  if (ts.isParenthesizedExpression(parent)) return isInsideMulChain(parent)
  return ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.AsteriskToken
}

function isIanaZoneLiteralNode(node: ts.Node): boolean {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return IANA_ZONE_RE.test(node.text)
  }
  return false
}

const UTC_MARKER_RE = /utc/i

function isDateNowCall(node: ts.Expression): boolean {
  if (!ts.isCallExpression(node) || node.arguments.length > 0) return false
  const callee = node.expression
  return (
    ts.isPropertyAccessExpression(callee) &&
    ts.isIdentifier(callee.expression) &&
    callee.expression.text === "Date" &&
    callee.name.text === "now"
  )
}

function isWallClockNewDate(node: ts.Expression): boolean {
  if (!ts.isNewExpression(node)) return false
  if (!ts.isIdentifier(node.expression) || node.expression.text !== "Date") return false
  const args = node.arguments
  if (args === undefined || args.length === 0) return true
  return args.length === 1 && args[0] !== undefined && isDateNowCall(args[0])
}

function isNumericLiteralValue(node: ts.Expression | undefined, want: number): boolean {
  return node !== undefined && ts.isNumericLiteral(node) && numericValue(node) === want
}

function isWallClockDaySlice(node: ts.CallExpression): boolean {
  const sliceCallee = node.expression
  if (!ts.isPropertyAccessExpression(sliceCallee) || sliceCallee.name.text !== "slice") return false
  if (!isNumericLiteralValue(node.arguments[0], 0)) return false
  if (!isNumericLiteralValue(node.arguments[1], 10)) return false
  const isoCall = sliceCallee.expression
  if (!ts.isCallExpression(isoCall)) return false
  const isoCallee = isoCall.expression
  if (!ts.isPropertyAccessExpression(isoCallee) || isoCallee.name.text !== "toISOString") {
    return false
  }
  return isWallClockNewDate(isoCallee.expression)
}

function receivingBindingName(node: ts.Node): string | undefined {
  let cur: ts.Node | undefined = node.parent
  while (cur) {
    if (ts.isVariableDeclaration(cur) && ts.isIdentifier(cur.name)) return cur.name.text
    if (ts.isPropertyAssignment(cur) && ts.isIdentifier(cur.name)) return cur.name.text
    if (ts.isPropertyDeclaration(cur) && ts.isIdentifier(cur.name)) return cur.name.text
    if (ts.isMethodDeclaration(cur) && ts.isIdentifier(cur.name)) return cur.name.text
    if (ts.isFunctionDeclaration(cur)) return cur.name?.text
    cur = cur.parent
  }
  return undefined
}

function isUtcDaySliceViolation(node: ts.CallExpression): boolean {
  if (!isWallClockDaySlice(node)) return false
  const name = receivingBindingName(node)
  return name === undefined || !UTC_MARKER_RE.test(name)
}

export function scanTimezoneViolations(
  sf: ts.SourceFile,
  allowEsoZoneOffsets: boolean
): readonly TimezoneViolation[] {
  const out: TimezoneViolation[] = []

  function pushFinding(node: ts.Node, rule: TimezoneRule): undefined {
    const { line, column } = lineCol(sf, node.getStart(sf))
    out.push({
      file: sf.fileName,
      line,
      column,
      rule,
      snippet: node.getText(sf).slice(0, 80),
    })
  }

  function visit(node: ts.Node): undefined {
    if (ts.isNewExpression(node) && isT00ParseViolation(node)) {
      pushFinding(node, "t00-parse")
    }

    if (!allowEsoZoneOffsets && ts.isBinaryExpression(node) && isTopLevelMulChain(node)) {
      const literals = collectMulChainLiterals(node)
      if (chainContainsHourOffset(literals)) {
        pushFinding(node, "hour-offset-constant")
      }
    }

    if (
      !allowEsoZoneOffsets &&
      ts.isNumericLiteral(node) &&
      numericValue(node) === HOUR_OFFSET_LITERAL &&
      !isInsideMulChain(node)
    ) {
      pushFinding(node, "hour-offset-constant")
    }

    if (isIanaZoneLiteralNode(node)) {
      pushFinding(node, "iana-zone-literal")
    }

    if (ts.isCallExpression(node) && isUtcDaySliceViolation(node)) {
      pushFinding(node, "utc-day-slice")
    }

    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sf, visit)
  return out
}
