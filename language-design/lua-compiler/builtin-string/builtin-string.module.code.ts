import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { unsupportedProperty } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import {
  addToNumericExpression,
  createNaN,
  getNumberLiteralValue,
  wrapInTable,
} from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"

function createStringCall(
  methodName: string,
  tsOriginal: ts.Node,
  ...params: readonly luaExpressions.Expression[]
): luaExpressions.CallExpression {
  const stringIdentifier = luaExpressions.createIdentifier("string")
  return luaExpressions.createCallExpression(
    luaExpressions.createTableIndexExpression(
      stringIdentifier,
      luaExpressions.createStringLiteral(methodName)
    ),
    params,
    tsOriginal
  )
}

export function transformStringPrototypeCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const signature = context.checker.getResolvedSignature(node)
  const [caller, params] = context.transformCallAndArguments(
    calledMethod.expression,
    node.arguments,
    signature
  )

  const expressionName = calledMethod.name.text
  switch (expressionName) {
    case "replace":
      return transformLuaLibFunction(context, LuaLibFeature.StringReplace, node, caller, ...params)
    case "replaceAll":
      return transformLuaLibFunction(
        context,
        LuaLibFeature.StringReplaceAll,
        node,
        caller,
        ...params
      )
    case "concat":
      return luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("table"),
          luaExpressions.createStringLiteral("concat")
        ),
        [wrapInTable(caller, ...params)],
        node
      )

    case "indexOf": {
      const stringExpression = createStringCall(
        "find",
        node,
        caller,
        params[0] ?? luaExpressions.createNilLiteral(),
        params[1]
          ? luaExpressions.createCallExpression(
              luaExpressions.createTableIndexExpression(
                luaExpressions.createIdentifier("math"),
                luaExpressions.createStringLiteral("max")
              ),
              [addToNumericExpression(params[1], 1), luaExpressions.createNumericLiteral(1)]
            )
          : luaExpressions.createNilLiteral(),
        luaExpressions.createBooleanLiteral(true)
      )

      return luaExpressions.createBinaryExpression(
        luaExpressions.createBinaryExpression(
          stringExpression,
          luaExpressions.createNumericLiteral(0),
          luaCore.SyntaxKind.OrOperator
        ),
        luaExpressions.createNumericLiteral(1),
        luaCore.SyntaxKind.SubtractionOperator,
        node
      )
    }

    case "substr":
      return transformLuaLibFunction(context, LuaLibFeature.StringSubstr, node, caller, ...params)
    case "substring":
      return transformLuaLibFunction(
        context,
        LuaLibFeature.StringSubstring,
        node,
        caller,
        ...params
      )

    case "slice": {
      const literalArg1 = getNumberLiteralValue(params[0])
      if (params[0] && literalArg1 !== undefined) {
        let stringSubArgs: luaExpressions.Expression[] | undefined = [
          addToNumericExpression(params[0], literalArg1 < 0 ? 0 : 1),
        ]

        if (params[1]) {
          const literalArg2 = getNumberLiteralValue(params[1])
          if (literalArg2 !== undefined) {
            stringSubArgs.push(addToNumericExpression(params[1], literalArg2 < 0 ? -1 : 0))
          } else {
            stringSubArgs = undefined
          }
        }

        if (stringSubArgs) {
          return createStringCall("sub", node, caller, ...stringSubArgs)
        }
      }

      return transformLuaLibFunction(context, LuaLibFeature.StringSlice, node, caller, ...params)
    }

    case "toLowerCase":
      return createStringCall("lower", node, caller)
    case "toUpperCase":
      return createStringCall("upper", node, caller)
    case "trim":
      return transformLuaLibFunction(context, LuaLibFeature.StringTrim, node, caller)
    case "trimEnd":
    case "trimRight":
      return transformLuaLibFunction(context, LuaLibFeature.StringTrimEnd, node, caller)
    case "trimStart":
    case "trimLeft":
      return transformLuaLibFunction(context, LuaLibFeature.StringTrimStart, node, caller)
    case "split":
      return transformLuaLibFunction(context, LuaLibFeature.StringSplit, node, caller, ...params)

    case "charAt": {
      const literalValue = getNumberLiteralValue(params[0])
      if (literalValue !== undefined && literalValue >= 0) {
        const firstParamPlusOne = addToNumericExpression(
          params[0] ?? luaExpressions.createNilLiteral(),
          1
        )
        return createStringCall("sub", node, caller, firstParamPlusOne, firstParamPlusOne)
      }

      return transformLuaLibFunction(context, LuaLibFeature.StringCharAt, node, caller, ...params)
    }

    case "charCodeAt": {
      const literalValue = getNumberLiteralValue(params[0])
      if (literalValue !== undefined && literalValue >= 0) {
        return luaExpressions.createBinaryExpression(
          createStringCall(
            "byte",
            node,
            caller,
            addToNumericExpression(params[0] ?? luaExpressions.createNilLiteral(), 1)
          ),
          createNaN(),
          luaCore.SyntaxKind.OrOperator
        )
      }

      return transformLuaLibFunction(
        context,
        LuaLibFeature.StringCharCodeAt,
        node,
        caller,
        ...params
      )
    }

    case "startsWith":
      return transformLuaLibFunction(
        context,
        LuaLibFeature.StringStartsWith,
        node,
        caller,
        ...params
      )
    case "endsWith":
      return transformLuaLibFunction(context, LuaLibFeature.StringEndsWith, node, caller, ...params)
    case "includes":
      return transformLuaLibFunction(context, LuaLibFeature.StringIncludes, node, caller, ...params)
    case "repeat": {
      const math = luaExpressions.createIdentifier("math")
      const floor = luaExpressions.createStringLiteral("floor")
      const parameter = luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(math, floor),
        [params[0] ?? luaExpressions.createNilLiteral()]
      )
      return createStringCall("rep", node, caller, parameter)
    }
    case "padStart":
      return transformLuaLibFunction(context, LuaLibFeature.StringPadStart, node, caller, ...params)
    case "padEnd":
      return transformLuaLibFunction(context, LuaLibFeature.StringPadEnd, node, caller, ...params)
    case "toString":
      return
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "string", expressionName))
  }
}

export function transformStringConstructorMethodCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const signature = context.checker.getResolvedSignature(node)
  const params = context.transformArguments(node.arguments, signature)

  const expressionName = calledMethod.name.text
  switch (expressionName) {
    case "fromCharCode":
      return luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("string"),
          luaExpressions.createStringLiteral("char")
        ),
        params,
        node
      )

    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "String", expressionName))
  }
}

export function transformStringProperty(
  context: TransformationContext,
  node: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  switch (node.name.text) {
    case "length": {
      const expression = context.transformExpression(node.expression)
      if (context.luaTarget === LuaTarget.Lua50) {
        const stringLen = luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("string"),
          luaExpressions.createStringLiteral("len")
        )
        return luaExpressions.createCallExpression(stringLen, [expression], node)
      } else {
        return luaExpressions.createUnaryExpression(
          expression,
          luaCore.SyntaxKind.LengthOperator,
          node
        )
      }
    }
    default:
      context.addDiagnostic(unsupportedProperty(node.name, "string", node.name.text))
  }
}

export function transformStringConstructorCall(
  originalNode: ts.CallExpression,
  ...args: readonly luaExpressions.Expression[]
): luaExpressions.Expression | undefined {
  const tostring = luaExpressions.createIdentifier("tostring", originalNode.expression)
  return luaExpressions.createCallExpression(tostring, args, originalNode)
}
