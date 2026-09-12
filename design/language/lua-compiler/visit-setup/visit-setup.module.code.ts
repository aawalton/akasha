import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import {
  createDefaultExportStringLiteral,
  createExportedIdentifier,
  getIdentifierExportScope,
  hasDefaultExportModifier,
} from "akasha/design/language/lua-compiler/export-scope/export-scope.module.code.ts"
import { createExportsIdentifier } from "akasha/design/language/lua-compiler/exports-identifier/exports-identifier.module.code.ts"
import { createLocalOrExportedOrGlobalDeclaration } from "akasha/design/language/lua-compiler/lua-ast/lua-ast.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { transformLuaLibFunction } from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import { assert } from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import {
  getExtendedNode,
  getExtendsClause,
} from "akasha/design/language/lua-compiler/visit-syntax/visit-syntax.module.code.ts"
import * as ts from "typescript"

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
      luaStatements.createAssignmentStatement(
        defaultExportLeftHandSide,
        classInitializer,
        statement
      )
    )
  } else {
    result.push(
      ...createLocalOrExportedOrGlobalDeclaration(context, className, classInitializer, statement)
    )
  }

  if (defaultExportLeftHandSide) {
    result.push(
      luaStatements.createVariableDeclarationStatement(localClassName, defaultExportLeftHandSide)
    )
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

function getReflectionClassName(
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
    return luaExpressions.createTableIndexExpression(
      className,
      luaExpressions.createStringLiteral("name")
    )
  }

  return luaExpressions.createStringLiteral("")
}
