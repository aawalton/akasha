import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import * as luaCore from "akasha/design/language/lua-compiler/lua-ast-core/lua-ast-core.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { transformLuaLibFunction } from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import { unsupportedProperty } from "akasha/design/language/lua-compiler/transform-diagnostics/transform-diagnostics.module.code.ts"
import type * as ts from "typescript"

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
      return undefined
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
    default:
      return undefined
  }
}
