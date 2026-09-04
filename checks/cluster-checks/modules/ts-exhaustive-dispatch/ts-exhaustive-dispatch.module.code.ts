import ts from "typescript"

export interface ExhaustiveDispatchFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly message: string
}

export function scanExhaustiveDispatch(sf: ts.SourceFile): readonly ExhaustiveDispatchFinding[] {
  const filePath = sf.fileName

  const out: ExhaustiveDispatchFinding[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isSwitchStatement(node)) {
      const finding = analyzeSwitch(node, sf, filePath)
      if (finding !== null) out.push(finding)
    }
    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)
  return out
}

function analyzeSwitch(
  node: ts.SwitchStatement,
  sf: ts.SourceFile,
  filePath: string
): ExhaustiveDispatchFinding | null {
  const defaultClause = findDefaultClause(node)
  if (defaultClause === null) {
    return finding(
      node,
      sf,
      filePath,
      "switch statement is missing a default clause; add `default: assertNever(<discriminant>)`, `default: throw ...`, or `default: return ...`"
    )
  }
  if (!defaultBodyIsTerminal(defaultClause)) {
    return finding(
      node,
      sf,
      filePath,
      "switch default clause body must contain a call to `assertNever`, a `throw` statement, or a `return` statement"
    )
  }
  return null
}

function findDefaultClause(node: ts.SwitchStatement): ts.DefaultClause | null {
  for (const clause of node.caseBlock.clauses) {
    if (ts.isDefaultClause(clause)) return clause
  }
  return null
}

function defaultBodyIsTerminal(clause: ts.DefaultClause): boolean {
  for (const stmt of clause.statements) {
    if (statementIsTerminal(stmt)) return true
  }
  return false
}

function statementIsTerminal(stmt: ts.Statement): boolean {
  if (ts.isThrowStatement(stmt)) return true
  if (ts.isReturnStatement(stmt)) return true
  if (ts.isExpressionStatement(stmt)) {
    return expressionIsAssertNeverCall(stmt.expression)
  }
  if (ts.isBlock(stmt)) {
    for (const inner of stmt.statements) {
      if (statementIsTerminal(inner)) return true
    }
  }
  return false
}

function expressionIsAssertNeverCall(expr: ts.Expression): boolean {
  if (!ts.isCallExpression(expr)) return false
  const callee = expr.expression
  return ts.isIdentifier(callee) && callee.text === "assertNever"
}

function finding(
  node: ts.SwitchStatement,
  sf: ts.SourceFile,
  filePath: string,
  message: string
): ExhaustiveDispatchFinding {
  const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
  return {
    file: filePath,
    line: line + 1,
    column: character + 1,
    message,
  }
}
