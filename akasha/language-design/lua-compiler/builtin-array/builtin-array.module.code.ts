import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { unsupportedProperty } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import { isUnpackCall, wrapInTable } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import {
  expressionResultIsUsed,
  typeAlwaysHasSomeOfFlags,
} from "../tstl-typescript/tstl-typescript.module.code.ts"
export function transformArrayConstructorCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const signature = context.checker.getResolvedSignature(node)
  const params = context.transformArguments(node.arguments, signature)

  const expressionName = calledMethod.name.text
  switch (expressionName) {
    case "from":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayFrom, node, ...params)
    case "isArray":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayIsArray, node, ...params)
    case "of":
      return wrapInTable(...params)
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "Array", expressionName))
  }
}

function createTableLengthExpression(
  context: TransformationContext,
  expression: luaExpressions.Expression,
  node?: ts.Expression
) {
  if (context.luaTarget === LuaTarget.Lua50) {
    const tableGetn = luaExpressions.createTableIndexExpression(
      luaExpressions.createIdentifier("table"),
      luaExpressions.createStringLiteral("getn")
    )
    return luaExpressions.createCallExpression(tableGetn, [expression], node)
  } else {
    return luaExpressions.createUnaryExpression(expression, luaCore.SyntaxKind.LengthOperator, node)
  }
}

function transformSingleElementArrayPush(
  context: TransformationContext,
  node: ts.CallExpression,
  caller: luaExpressions.Expression,
  param: luaExpressions.Expression
): luaExpressions.Expression {
  const arrayIdentifier = luaExpressions.isIdentifier(caller)
    ? caller
    : context.moveToPrecedingTemp(caller)

  let lengthExpression: luaExpressions.Expression = luaExpressions.createBinaryExpression(
    createTableLengthExpression(context, arrayIdentifier),
    luaExpressions.createNumericLiteral(1),
    luaCore.SyntaxKind.AdditionOperator
  )

  const expressionIsUsed = expressionResultIsUsed(node)
  if (expressionIsUsed) {
    lengthExpression = context.moveToPrecedingTemp(lengthExpression)
  }

  const pushStatement = luaStatements.createAssignmentStatement(
    luaExpressions.createTableIndexExpression(arrayIdentifier, lengthExpression),
    param,
    node
  )
  context.addPrecedingStatements(pushStatement)
  return expressionIsUsed ? lengthExpression : luaExpressions.createNilLiteral()
}

export function transformArrayPrototypeCall(
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
    case "at":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayAt, node, caller, ...params)
    case "concat":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayConcat, node, caller, ...params)
    case "entries":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayEntries, node, caller)
    case "fill":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayFill, node, caller, ...params)
    case "push":
      if (node.arguments.length === 1) {
        const param = params[0] ?? luaExpressions.createNilLiteral()
        if (isUnpackCall(param)) {
          return transformLuaLibFunction(
            context,
            LuaLibFeature.ArrayPushArray,
            node,
            caller,
            param.params[0] ?? luaExpressions.createNilLiteral()
          )
        }
        if (!luaExpressions.isDotsLiteral(param)) {
          return transformSingleElementArrayPush(context, node, caller, param)
        }
      }

      return transformLuaLibFunction(context, LuaLibFeature.ArrayPush, node, caller, ...params)
    case "reverse":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayReverse, node, caller)
    case "shift":
      return luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("table"),
          luaExpressions.createStringLiteral("remove")
        ),
        [caller, luaExpressions.createNumericLiteral(1)],
        node
      )
    case "unshift":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayUnshift, node, caller, ...params)
    case "sort":
      return transformLuaLibFunction(context, LuaLibFeature.ArraySort, node, caller, ...params)
    case "pop":
      return luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("table"),
          luaExpressions.createStringLiteral("remove")
        ),
        [caller],
        node
      )
    case "forEach":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayForEach, node, caller, ...params)
    case "find":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayFind, node, caller, ...params)
    case "findIndex":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayFindIndex, node, caller, ...params)
    case "includes":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayIncludes, node, caller, ...params)
    case "indexOf":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayIndexOf, node, caller, ...params)
    case "map":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayMap, node, caller, ...params)
    case "filter":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayFilter, node, caller, ...params)
    case "reduce":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayReduce, node, caller, ...params)
    case "reduceRight":
      return transformLuaLibFunction(
        context,
        LuaLibFeature.ArrayReduceRight,
        node,
        caller,
        ...params
      )
    case "some":
      return transformLuaLibFunction(context, LuaLibFeature.ArraySome, node, caller, ...params)
    case "every":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayEvery, node, caller, ...params)
    case "slice":
      return transformLuaLibFunction(context, LuaLibFeature.ArraySlice, node, caller, ...params)
    case "splice":
      return transformLuaLibFunction(context, LuaLibFeature.ArraySplice, node, caller, ...params)
    case "join": {
      const callerType = context.checker.getTypeAtLocation(calledMethod.expression)
      const elementType = context.checker.getElementTypeOfArrayType(callerType)
      if (
        elementType &&
        typeAlwaysHasSomeOfFlags(
          context,
          elementType,
          ts.TypeFlags.StringLike | ts.TypeFlags.NumberLike
        )
      ) {
        const defaultSeparatorLiteral = luaExpressions.createStringLiteral(",")
        const param = params[0] ?? luaExpressions.createNilLiteral()
        const parameters = [
          caller,
          node.arguments.length === 0
            ? defaultSeparatorLiteral
            : luaExpressions.isStringLiteral(param)
              ? param
              : luaExpressions.createBinaryExpression(
                  param,
                  defaultSeparatorLiteral,
                  luaCore.SyntaxKind.OrOperator
                ),
        ]

        return luaExpressions.createCallExpression(
          luaExpressions.createTableIndexExpression(
            luaExpressions.createIdentifier("table"),
            luaExpressions.createStringLiteral("concat")
          ),
          parameters,
          node
        )
      }

      return transformLuaLibFunction(context, LuaLibFeature.ArrayJoin, node, caller, ...params)
    }
    case "flat":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayFlat, node, caller, ...params)
    case "flatMap":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayFlatMap, node, caller, ...params)
    case "toReversed":
      return transformLuaLibFunction(
        context,
        LuaLibFeature.ArrayToReversed,
        node,
        caller,
        ...params
      )
    case "toSorted":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayToSorted, node, caller, ...params)
    case "toSpliced":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayToSpliced, node, caller, ...params)
    case "with":
      return transformLuaLibFunction(context, LuaLibFeature.ArrayWith, node, caller, ...params)
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "array", expressionName))
  }
}

export function transformArrayProperty(
  context: TransformationContext,
  node: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  switch (node.name.text) {
    case "length": {
      const expression = context.transformExpression(node.expression)
      return createTableLengthExpression(context, expression, node)
    }
    default:
      return undefined
  }
}
