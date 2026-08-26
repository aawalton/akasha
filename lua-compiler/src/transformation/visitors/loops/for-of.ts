import * as ts from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import { assertNever } from "@shared/utils-narrow/assert-never"
import type { TransformationContext } from "../../context/transformation-context"
import type { FunctionVisitor } from "../../context/visitors"
import {
  getIterableExtensionKindForNode,
  IterableExtensionKind,
} from "../../utils/language-extensions"
import { transformLuaLibFunction } from "../../utils/lualib"
import { LuaLibFeature } from "../../../LuaLib"
import { isArrayType } from "../../utils/typescript/typescript"
import {
  transformForOfIterableStatement,
  transformForOfPairsIterableStatement,
  transformForOfPairsKeyIterableStatement,
} from "../language-extensions/iterable"
import { isRangeFunction, transformRangeStatement } from "../language-extensions/range"
import { transformForInitializer, transformLoopBody } from "./utils"

function transformForOfArrayStatement(
  context: TransformationContext,
  statement: ts.ForOfStatement,
  block: luaStatements.Block
): luaStatements.Statement {
  const valueVariable = transformForInitializer(context, statement.initializer, block)
  const ipairsCall = luaExpressions.createCallExpression(luaExpressions.createIdentifier("ipairs"), [
    context.transformExpression(statement.expression),
  ])

  return luaStatements.createForInStatement(
    block,
    [luaExpressions.createAnonymousIdentifier(), valueVariable],
    [ipairsCall],
    statement
  )
}

function transformForOfIteratorStatement(
  context: TransformationContext,
  statement: ts.ForOfStatement,
  block: luaStatements.Block
): luaStatements.Statement {
  const valueVariable = transformForInitializer(context, statement.initializer, block)
  const iterable = transformLuaLibFunction(
    context,
    LuaLibFeature.Iterator,
    statement.expression,
    context.transformExpression(statement.expression)
  )

  return luaStatements.createForInStatement(
    block,
    [luaExpressions.createAnonymousIdentifier(), valueVariable],
    [iterable],
    statement
  )
}

export const transformForOfStatement: FunctionVisitor<ts.ForOfStatement> = (node, context) => {
  const body = luaStatements.createBlock(transformLoopBody(context, node))

  if (ts.isCallExpression(node.expression) && isRangeFunction(context, node.expression)) {
    return transformRangeStatement(context, node, body)
  }
  const iterableExtensionType = getIterableExtensionKindForNode(context, node.expression)
  if (iterableExtensionType != null) {
    if (iterableExtensionType === IterableExtensionKind.Iterable) {
      return transformForOfIterableStatement(context, node, body)
    } else if (iterableExtensionType === IterableExtensionKind.Pairs) {
      return transformForOfPairsIterableStatement(context, node, body)
    } else if (iterableExtensionType === IterableExtensionKind.PairsKey) {
      return transformForOfPairsKeyIterableStatement(context, node, body)
    } else {
      assertNever(iterableExtensionType)
    }
  }
  if (isArrayType(context, context.checker.getTypeAtLocation(node.expression))) {
    return transformForOfArrayStatement(context, node, body)
  }

  return transformForOfIteratorStatement(context, node, body)
}
