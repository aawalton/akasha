import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import {
  unsupportedForTarget,
  unsupportedProperty,
  unsupportedSelfFunctionConversion,
} from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import {
  ContextType,
  getFunctionContextType,
} from "../tstl-function-context/tstl-function-context.module.code.ts"
import { createUnpackCall } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"

export function transformFunctionPrototypeCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.CallExpression | undefined {
  const callerType = context.checker.getTypeAtLocation(calledMethod.expression)
  if (getFunctionContextType(context, callerType) === ContextType.Void) {
    context.addDiagnostic(unsupportedSelfFunctionConversion(node))
  }

  const signature = context.checker.getResolvedSignature(node)
  const [caller, params] = context.transformCallAndArguments(
    calledMethod.expression,
    node.arguments,
    signature
  )
  const expressionName = calledMethod.name.text
  switch (expressionName) {
    case "apply": {
      const param0 = params[0]
      const param1 = params[1]
      const nodeArg1 = node.arguments[1]
      const nonContextArgs =
        param1 !== undefined ? [createUnpackCall(context, param1, nodeArg1)] : []
      if (param0 === undefined) {
        return luaExpressions.createCallExpression(caller, nonContextArgs, node)
      }
      return luaExpressions.createCallExpression(caller, [param0, ...nonContextArgs], node)
    }
    case "bind":
      return transformLuaLibFunction(context, LuaLibFeature.FunctionBind, node, caller, ...params)
    case "call":
      return luaExpressions.createCallExpression(caller, params, node)
    case "toString":
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "function", expressionName))
  }
}

export function transformFunctionProperty(
  context: TransformationContext,
  node: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  switch (node.name.text) {
    case "length": {
      if (
        context.luaTarget === LuaTarget.Lua50 ||
        context.luaTarget === LuaTarget.Lua51 ||
        context.luaTarget === LuaTarget.Universal
      ) {
        context.addDiagnostic(unsupportedForTarget(node, "function.length", context.luaTarget))
      }

      const getInfoCall = luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("debug"),
          luaExpressions.createStringLiteral("getinfo")
        ),
        [context.transformExpression(node.expression)]
      )

      const nparams = luaExpressions.createTableIndexExpression(
        getInfoCall,
        luaExpressions.createStringLiteral("nparams")
      )

      const contextType = getFunctionContextType(
        context,
        context.checker.getTypeAtLocation(node.expression)
      )
      return contextType === ContextType.NonVoid
        ? luaExpressions.createBinaryExpression(
            nparams,
            luaExpressions.createNumericLiteral(1),
            luaCore.SyntaxKind.SubtractionOperator
          )
        : nparams
    }

    case "arguments":
    case "caller":
    case "displayName":
    case "name":
      context.addDiagnostic(unsupportedProperty(node.name, "function", node.name.text))
  }
}
