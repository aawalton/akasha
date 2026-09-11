import type { FunctionVisitor } from "akasha/design/language/lua-compiler/context-visitors/context-visitors.module.code.ts"
import { createExportsIdentifier } from "akasha/design/language/lua-compiler/exports-identifier/exports-identifier.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { transformInPrecedingStatementScope } from "akasha/design/language/lua-compiler/preceding-statements/preceding-statements.module.code.ts"
import {
  performHoisting,
  ScopeType,
} from "akasha/design/language/lua-compiler/scope/scope.module.code.ts"
import { hasExportEquals } from "akasha/design/language/lua-compiler/typescript/typescript.module.code.ts"
import { assert } from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import * as ts from "typescript"
import { z } from "zod"

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
      const errorCall = luaExpressions.createCallExpression(
        luaExpressions.createIdentifier("error"),
        [luaExpressions.createStringLiteral("Unexpected end of JSON input")]
      )

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
