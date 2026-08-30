import ts from "typescript"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const NEVER = "assertNever"

const NAMES_NONE =
  "this switch names no default, so a value no case matches leaves it having done nothing"

const FALLS_OUT =
  "this switch has a default that neither throws, returns, nor calls `assertNever`, so it falls out"

function defaultOf(node: ts.SwitchStatement): ts.DefaultClause | null {
  for (const one of node.caseBlock.clauses) {
    if (ts.isDefaultClause(one)) return one
  }
  return null
}

function callsNever(said: ts.Expression): boolean {
  return (
    ts.isCallExpression(said) && ts.isIdentifier(said.expression) && said.expression.text === NEVER
  )
}

export function ends(statement: ts.Statement): boolean {
  if (ts.isThrowStatement(statement) || ts.isReturnStatement(statement)) return true
  if (ts.isExpressionStatement(statement)) return callsNever(statement.expression)
  if (ts.isBlock(statement)) return statement.statements.some(ends)
  return false
}

function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
}

export function exhaustiveDispatch(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): void => {
    if (ts.isSwitchStatement(node)) {
      const clause = defaultOf(node)
      const why = clause === null ? NAMES_NONE : clause.statements.some(ends) ? null : FALLS_OUT
      if (why !== null) found.push({ line: lineOf(standing.source, node), reason: why })
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
