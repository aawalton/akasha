import ts from "typescript"
import { lineOf } from "../../../../../code-system/code-source/code-source.module.code.ts"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const MIDNIGHT = /^T00:00(:00(\.\d+)?)?/

const DATE = "Date"

const READ_WHERE =
  "so what comes back is midnight where the machine stands rather than midnight where the day is"

function joinedOn(node: ts.Expression): boolean {
  if (!ts.isBinaryExpression(node)) return false
  if (node.operatorToken.kind !== ts.SyntaxKind.PlusToken) return false
  const right = node.right
  const held = ts.isStringLiteral(right) || ts.isNoSubstitutionTemplateLiteral(right)
  if (held && MIDNIGHT.test(right.text)) return true
  return joinedOn(node.left)
}

function spannedOn(node: ts.Expression): boolean {
  if (!ts.isTemplateExpression(node)) return false
  return node.templateSpans.some((span) => MIDNIGHT.test(span.literal.text))
}

export function midnightPinned(node: ts.Expression): boolean {
  return joinedOn(node) || spannedOn(node)
}

export function noLocalMidnightParse(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression)) {
      const first = node.arguments?.[0]
      if (node.expression.text === DATE && first !== undefined && midnightPinned(first)) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `this date is made an instant by pinning a midnight onto it, ${READ_WHERE}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
