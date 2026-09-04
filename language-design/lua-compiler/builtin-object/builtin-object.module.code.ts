import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { unsupportedProperty } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"

export function transformObjectConstructorCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const args = context.transformArguments(node.arguments)
  const methodName = calledMethod.name.text

  switch (methodName) {
    case "assign":
      return transformLuaLibFunction(context, LuaLibFeature.ObjectAssign, node, ...args)
    case "defineProperty":
      return transformLuaLibFunction(context, LuaLibFeature.ObjectDefineProperty, node, ...args)
    case "entries":
      return transformLuaLibFunction(context, LuaLibFeature.ObjectEntries, node, ...args)
    case "fromEntries":
      return transformLuaLibFunction(context, LuaLibFeature.ObjectFromEntries, node, ...args)
    case "getOwnPropertyDescriptor":
      return transformLuaLibFunction(
        context,
        LuaLibFeature.ObjectGetOwnPropertyDescriptor,
        node,
        ...args
      )
    case "getOwnPropertyDescriptors":
      return transformLuaLibFunction(
        context,
        LuaLibFeature.ObjectGetOwnPropertyDescriptors,
        node,
        ...args
      )
    case "groupBy":
      return transformLuaLibFunction(context, LuaLibFeature.ObjectGroupBy, node, ...args)
    case "keys":
      return transformLuaLibFunction(context, LuaLibFeature.ObjectKeys, node, ...args)
    case "values":
      return transformLuaLibFunction(context, LuaLibFeature.ObjectValues, node, ...args)
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "Object", methodName))
  }
}

export function tryTransformObjectPrototypeCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const name = calledMethod.name.text
  switch (name) {
    case "toString": {
      const toStringIdentifier = luaExpressions.createIdentifier("tostring")
      return luaExpressions.createCallExpression(
        toStringIdentifier,
        [context.transformExpression(calledMethod.expression)],
        node
      )
    }
    case "hasOwnProperty": {
      const expr = context.transformExpression(calledMethod.expression)
      const signature = context.checker.getResolvedSignature(node)
      const parameters = context.transformArguments(node.arguments, signature)
      const rawGetIdentifier = luaExpressions.createIdentifier("rawget")
      const rawGetCall = luaExpressions.createCallExpression(rawGetIdentifier, [
        expr,
        ...parameters,
      ])
      return luaExpressions.createBinaryExpression(
        rawGetCall,
        luaExpressions.createNilLiteral(),
        luaCore.SyntaxKind.InequalityOperator,
        node
      )
    }
  }
}
