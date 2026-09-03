import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { unsupportedProperty } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"

export function transformMathProperty(
  context: TransformationContext,
  node: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const name = node.name.text
  switch (name) {
    case "PI": {
      const property = luaExpressions.createStringLiteral("pi", node.name)
      const math = luaExpressions.createIdentifier("math", node.expression)
      return luaExpressions.createTableIndexExpression(math, property, node)
    }

    case "E":
    case "LN10":
    case "LN2":
    case "LOG10E":
    case "LOG2E":
    case "SQRT1_2":
    case "SQRT2":
      return luaExpressions.createNumericLiteral(Math[name], node)

    default:
      context.addDiagnostic(unsupportedProperty(node.name, "Math", name))
  }
}

export function transformMathCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const signature = context.checker.getResolvedSignature(node)
  const params = context.transformArguments(node.arguments, signature)
  const math = luaExpressions.createIdentifier("math")

  const expressionName = calledMethod.name.text
  switch (expressionName) {
    case "atan2": {
      if (context.luaTarget === LuaTarget.Universal) {
        return transformLuaLibFunction(context, LuaLibFeature.MathAtan2, node, ...params)
      }

      const method = luaExpressions.createStringLiteral(
        context.luaTarget === LuaTarget.Lua53 ? "atan" : "atan2"
      )
      return luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(math, method),
        params,
        node
      )
    }

    case "log10":
    case "log2": {
      const log1 = luaExpressions.createTableIndexExpression(
        math,
        luaExpressions.createStringLiteral("log")
      )
      const logCall1 = luaExpressions.createCallExpression(log1, params)
      const e = luaExpressions.createNumericLiteral(
        expressionName === "log10" ? Math.LN10 : Math.LN2
      )
      return luaExpressions.createBinaryExpression(
        logCall1,
        e,
        luaCore.SyntaxKind.DivisionOperator,
        node
      )
    }

    case "log1p": {
      const log = luaExpressions.createStringLiteral("log")
      const one = luaExpressions.createNumericLiteral(1)
      const add = luaExpressions.createBinaryExpression(
        one,
        params[0] ?? luaExpressions.createNilLiteral(),
        luaCore.SyntaxKind.AdditionOperator
      )
      return luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(math, log),
        [add],
        node
      )
    }

    case "pow": {
      return luaExpressions.createBinaryExpression(
        params[0] ?? luaExpressions.createNilLiteral(),
        params[1] ?? luaExpressions.createNilLiteral(),
        luaCore.SyntaxKind.PowerOperator,
        node
      )
    }

    case "round": {
      const floor = luaExpressions.createStringLiteral("floor")
      const half = luaExpressions.createNumericLiteral(0.5)
      const add = luaExpressions.createBinaryExpression(
        params[0] ?? luaExpressions.createNilLiteral(),
        half,
        luaCore.SyntaxKind.AdditionOperator
      )
      return luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(math, floor),
        [add],
        node
      )
    }

    case "sign": {
      return transformLuaLibFunction(context, LuaLibFeature.MathSign, node, ...params)
    }

    case "trunc": {
      return transformLuaLibFunction(context, LuaLibFeature.MathTrunc, node, ...params)
    }

    case "abs":
    case "acos":
    case "asin":
    case "atan":
    case "ceil":
    case "cos":
    case "exp":
    case "floor":
    case "log":
    case "max":
    case "min":
    case "random":
    case "sin":
    case "sqrt":
    case "tan": {
      const method = luaExpressions.createStringLiteral(expressionName)
      return luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(math, method),
        params,
        node
      )
    }

    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "Math", expressionName))
  }
}
