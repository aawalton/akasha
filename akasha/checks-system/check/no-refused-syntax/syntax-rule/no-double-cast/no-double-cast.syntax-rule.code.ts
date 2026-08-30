import ts from "typescript"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const UNKNOWN = "unknown"

const ANY = "any"

const WEIGHED =
  "so what it claims after that is weighed against nothing and could name any type at all"

function widenedTo(node: ts.Node): string | null {
  if (!ts.isAsExpression(node) && !ts.isTypeAssertionExpression(node)) return null
  if (node.type.kind === ts.SyntaxKind.UnknownKeyword) return UNKNOWN
  return node.type.kind === ts.SyntaxKind.AnyKeyword ? ANY : null
}

export function withoutParens(node: ts.Expression): ts.Expression {
  let held = node
  while (ts.isParenthesizedExpression(held)) held = held.expression
  return held
}

function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
}

export function noDoubleCast(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) {
      const named = widenedTo(withoutParens(node.expression))
      if (named !== null) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `this assertion reaches its target through \`${named}\`, ${WEIGHED}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
