import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { unsupportedProperty } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"

const isStringFormatTemplate = (node: ts.Expression) =>
  ts.isStringLiteral(node) && node.text.includes("%")

export function transformConsoleCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const methodName = calledMethod.name.text
  const signature = context.checker.getResolvedSignature(node)
  const parameters = context.transformArguments(node.arguments, signature)

  switch (methodName) {
    case "error":
    case "info":
    case "log":
    case "warn": {
      const firstArg = node.arguments[0]
      if (firstArg !== undefined && isStringFormatTemplate(firstArg)) {
        const stringFormatCall = luaExpressions.createCallExpression(
          luaExpressions.createTableIndexExpression(
            luaExpressions.createIdentifier("string"),
            luaExpressions.createStringLiteral("format")
          ),
          parameters
        )
        return luaExpressions.createCallExpression(luaExpressions.createIdentifier("print"), [
          stringFormatCall,
        ])
      }
      return luaExpressions.createCallExpression(
        luaExpressions.createIdentifier("print"),
        parameters
      )
    }
    case "assert": {
      const secondArg = node.arguments[1]
      if (secondArg !== undefined && isStringFormatTemplate(secondArg)) {
        const stringFormatCall = luaExpressions.createCallExpression(
          luaExpressions.createTableIndexExpression(
            luaExpressions.createIdentifier("string"),
            luaExpressions.createStringLiteral("format")
          ),
          parameters.slice(1)
        )
        const firstParam = parameters[0]
        if (firstParam === undefined) {
          return luaExpressions.createCallExpression(
            luaExpressions.createIdentifier("assert"),
            parameters
          )
        }
        return luaExpressions.createCallExpression(luaExpressions.createIdentifier("assert"), [
          firstParam,
          stringFormatCall,
        ])
      }
      return luaExpressions.createCallExpression(
        luaExpressions.createIdentifier("assert"),
        parameters
      )
    }
    case "trace": {
      const firstArg = node.arguments[0]
      if (firstArg !== undefined && isStringFormatTemplate(firstArg)) {
        const stringFormatCall = luaExpressions.createCallExpression(
          luaExpressions.createTableIndexExpression(
            luaExpressions.createIdentifier("string"),
            luaExpressions.createStringLiteral("format")
          ),
          parameters
        )
        const debugTracebackCall = luaExpressions.createCallExpression(
          luaExpressions.createTableIndexExpression(
            luaExpressions.createIdentifier("debug"),
            luaExpressions.createStringLiteral("traceback")
          ),
          [stringFormatCall]
        )
        return luaExpressions.createCallExpression(luaExpressions.createIdentifier("print"), [
          debugTracebackCall,
        ])
      }
      const debugTracebackCall = luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("debug"),
          luaExpressions.createStringLiteral("traceback")
        ),
        parameters
      )
      return luaExpressions.createCallExpression(luaExpressions.createIdentifier("print"), [
        debugTracebackCall,
      ])
    }
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "console", methodName))
  }
}
