import * as ts from "typescript"
import { z } from "zod"
import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import { assert } from "../../utils"
import type { FunctionVisitor } from "../context/visitors"
import { createExportsIdentifier } from "../utils/exports-identifier"
import { transformInPrecedingStatementScope } from "../utils/preceding-statements"
import { performHoisting, ScopeType } from "../utils/scope"
import { hasExportEquals } from "../utils/typescript/typescript"

export const transformSourceFileNode: FunctionVisitor<ts.SourceFile> = (node, context) => {
  let statements: readonly luaStatements.Statement[] = []
  if ((node.flags & ts.NodeFlags.JsonFile) !== 0) {
    const [statement] = node.statements
    if (statement) {
      assert(ts.isExpressionStatement(statement))
      const { precedingStatements, result: expression } = transformInPrecedingStatementScope(
        context,
        () => context.transformExpression(statement.expression)
      )
      statements = [...precedingStatements, luaStatements.createReturnStatement([expression])]
    } else {
      const errorCall = luaExpressions.createCallExpression(luaExpressions.createIdentifier("error"), [
        luaExpressions.createStringLiteral("Unexpected end of JSON input"),
      ])

      statements = [luaStatements.createExpressionStatement(errorCall)]
    }
  } else {
    context.pushScope(ScopeType.File, node)

    statements = performHoisting(context, context.transformStatements(node.statements))
    context.popScope()

    if (context.isModule) {
      if (!hasExportEquals(node)) {
        statements = [
          luaStatements.createVariableDeclarationStatement(
            createExportsIdentifier(),
            luaExpressions.createTableExpression()
          ),
          ...statements,
        ]
      }

      statements = [...statements, luaStatements.createReturnStatement([createExportsIdentifier()])]
    }
  }

  const triviaMatch = z
    .array(z.string())
    .nullable()
    .parse(node.getFullText().match(/^#!.*\r?\n/))
  const trivia = triviaMatch?.[0] ?? ""
  return luaStatements.createFile(statements, context.usedLuaLibFeatures, trivia, node)
}
