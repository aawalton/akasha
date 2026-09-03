import * as ts from "typescript"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import {
  ContextType,
  getCallContextType,
} from "../tstl-function-context/tstl-function-context.module.code.ts"
import { wrapInToStringForConcat } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { isStringType } from "../tstl-typescript/tstl-typescript.module.code.ts"
import { transformContextualCallExpression } from "../visit-call/visit-call.module.code.ts"

function getRawLiteral(node: ts.LiteralLikeNode): string {
  let text = node.getText()
  const isLast =
    node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral ||
    node.kind === ts.SyntaxKind.TemplateTail
  text = text.substring(1, text.length - (isLast ? 1 : 2))
  text = text.replace(/\r\n?/g, "\n")
  return text
}

export const transformTemplateExpression: FunctionVisitor<ts.TemplateExpression> = (
  node,
  context
) => {
  const parts: luaExpressions.Expression[] = []

  const head = node.head.text
  if (head.length > 0) {
    parts.push(luaExpressions.createStringLiteral(head, node.head))
  }

  const transformedExpressions = context.transformOrderedExpressions(
    node.templateSpans.map((s) => s.expression)
  )
  for (const [i, span] of node.templateSpans.entries()) {
    const expression = transformedExpressions[i]
    if (expression === undefined) continue
    const spanType = context.checker.getTypeAtLocation(span.expression)
    if (isStringType(context, spanType)) {
      parts.push(expression)
    } else {
      parts.push(wrapInToStringForConcat(expression))
    }

    const text = span.literal.text
    if (text.length > 0) {
      parts.push(luaExpressions.createStringLiteral(text, span.literal))
    }
  }

  return parts.reduce((prev, current) =>
    luaExpressions.createBinaryExpression(prev, current, luaCore.SyntaxKind.ConcatOperator)
  )
}

export const transformTaggedTemplateExpression: FunctionVisitor<ts.TaggedTemplateExpression> = (
  expression,
  context
) => {
  const strings: string[] = []
  const rawStrings: string[] = []
  const expressions: ts.Expression[] = []

  if (ts.isTemplateExpression(expression.template)) {
    strings.push(expression.template.head.text)
    rawStrings.push(getRawLiteral(expression.template.head))
    strings.push(...expression.template.templateSpans.map((span) => span.literal.text))
    rawStrings.push(...expression.template.templateSpans.map((span) => getRawLiteral(span.literal)))
    expressions.push(...expression.template.templateSpans.map((span) => span.expression))
  } else {
    strings.push(expression.template.text)
    rawStrings.push(getRawLiteral(expression.template))
  }

  const rawStringsArray = ts.factory.createArrayLiteralExpression(
    rawStrings.map((text) => ts.factory.createStringLiteral(text))
  )

  const stringObject = ts.factory.createObjectLiteralExpression([
    ...strings.map((partialString, i) =>
      ts.factory.createPropertyAssignment(
        ts.factory.createNumericLiteral(i + 1),
        ts.factory.createStringLiteral(partialString)
      )
    ),
    ts.factory.createPropertyAssignment("raw", rawStringsArray),
  ])

  expressions.unshift(stringObject)

  const useSelfParameter = getCallContextType(context, expression) !== ContextType.Void

  if (useSelfParameter) {
    return transformContextualCallExpression(context, expression, expressions)
  }

  const callArguments = context.transformArguments(expressions)

  const leftHandSideExpression = context.transformExpression(expression.tag)
  return luaExpressions.createCallExpression(leftHandSideExpression, callArguments)
}
