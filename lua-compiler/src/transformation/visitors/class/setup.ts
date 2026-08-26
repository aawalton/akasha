import * as ts from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import { assert } from "../../../utils"
import type { TransformationContext } from "../../context/transformation-context"
import {
  createDefaultExportStringLiteral,
  createExportedIdentifier,
  getIdentifierExportScope,
  hasDefaultExportModifier,
} from "../../utils/export"
import { createExportsIdentifier } from "../../utils/exports-identifier"
import { createLocalOrExportedOrGlobalDeclaration } from "../../utils/lua-ast"
import { transformLuaLibFunction } from "../../utils/lualib"
import { LuaLibFeature } from "../../../LuaLib"
import { getExtendedNode, getExtendsClause } from "./syntax"

export function createClassSetup(
  context: TransformationContext,
  statement: ts.ClassLikeDeclarationBase,
  className: luaExpressions.Identifier,
  localClassName: luaExpressions.Identifier,
  extendsType?: ts.Type
): readonly luaStatements.Statement[] {
  const result: luaStatements.Statement[] = []

  const classInitializer = transformLuaLibFunction(context, LuaLibFeature.Class, statement)

  const defaultExportLeftHandSide = hasDefaultExportModifier(statement)
    ? luaExpressions.createTableIndexExpression(
        createExportsIdentifier(),
        createDefaultExportStringLiteral(statement)
      )
    : undefined

  if (defaultExportLeftHandSide) {
    result.push(
      luaStatements.createAssignmentStatement(defaultExportLeftHandSide, classInitializer, statement)
    )
  } else {
    result.push(
      ...createLocalOrExportedOrGlobalDeclaration(context, className, classInitializer, statement)
    )
  }

  if (defaultExportLeftHandSide) {
    result.push(luaStatements.createVariableDeclarationStatement(localClassName, defaultExportLeftHandSide))
  } else {
    const exportScope = getIdentifierExportScope(context, className)
    if (exportScope) {
      result.push(
        luaStatements.createVariableDeclarationStatement(
          localClassName,
          createExportedIdentifier(context, luaExpressions.cloneIdentifier(className), exportScope)
        )
      )
    }
  }

  result.push(
    luaStatements.createAssignmentStatement(
      luaExpressions.createTableIndexExpression(
        luaExpressions.cloneIdentifier(localClassName),
        luaExpressions.createStringLiteral("name")
      ),
      getReflectionClassName(statement, className),
      statement
    )
  )

  if (extendsType) {
    const extendedNode = getExtendedNode(statement)
    assert(extendedNode)
    result.push(
      luaStatements.createExpressionStatement(
        transformLuaLibFunction(
          context,
          LuaLibFeature.ClassExtends,
          getExtendsClause(statement),
          luaExpressions.cloneIdentifier(localClassName),
          context.transformExpression(extendedNode.expression)
        )
      )
    )
  }

  return result
}

export function getReflectionClassName(
  declaration: ts.ClassLikeDeclarationBase,
  className: luaExpressions.Identifier
): luaExpressions.Expression {
  if (declaration.name) {
    return luaExpressions.createStringLiteral(declaration.name.text)
  } else if (
    ts.isVariableDeclaration(declaration.parent) &&
    ts.isIdentifier(declaration.parent.name)
  ) {
    return luaExpressions.createStringLiteral(declaration.parent.name.text)
  } else if (hasDefaultExportModifier(declaration)) {
    return luaExpressions.createStringLiteral("default")
  }

  if (getExtendedNode(declaration)) {
    return luaExpressions.createTableIndexExpression(className, luaExpressions.createStringLiteral("name"))
  }

  return luaExpressions.createStringLiteral("")
}
