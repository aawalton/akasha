import type { TransformationContext } from "akasha/language-design/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import { createSelfIdentifier } from "akasha/language-design/lua-compiler/lua-ast/lua-ast.module.code.ts"
import * as luaCore from "akasha/language-design/lua-compiler/lua-ast-core/lua-ast-core.module.code.ts"
import * as luaExpressions from "akasha/language-design/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/language-design/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { ScopeType } from "akasha/language-design/lua-compiler/scope/scope.module.code.ts"
import { transformClassInstanceFields } from "akasha/language-design/lua-compiler/visit-fields/visit-fields.module.code.ts"
import {
  transformFunctionBodyContent,
  transformFunctionBodyHeader,
  transformParameters,
} from "akasha/language-design/lua-compiler/visit-function/visit-function.module.code.ts"
import { transformIdentifier } from "akasha/language-design/lua-compiler/visit-identifier/visit-identifier.module.code.ts"
import * as ts from "typescript"

export function createPrototypeName(
  className: luaExpressions.Identifier
): luaExpressions.TableIndexExpression {
  return luaExpressions.createTableIndexExpression(
    luaExpressions.cloneIdentifier(className),
    luaExpressions.createStringLiteral("prototype")
  )
}

export function createConstructorName(
  className: luaExpressions.Identifier
): luaExpressions.TableIndexExpression {
  return luaExpressions.createTableIndexExpression(
    createPrototypeName(className),
    luaExpressions.createStringLiteral("____constructor")
  )
}

export function transformConstructorDeclaration(
  context: TransformationContext,
  statement: ts.ConstructorDeclaration,
  className: luaExpressions.Identifier,
  instanceFields: readonly ts.PropertyDeclaration[],
  classDeclaration: ts.ClassLikeDeclaration
): luaStatements.Statement | undefined {
  if (!statement.body) {
    return undefined
  }

  const scope = context.pushScope(ScopeType.Function, statement)
  let body: readonly luaStatements.Statement[] = transformFunctionBodyContent(
    context,
    statement.body
  )

  const [params, dotsLiteral, restParamName] = transformParameters(
    context,
    statement.parameters,
    createSelfIdentifier()
  )

  const bodyWithFieldInitializers: luaStatements.Statement[] = [
    ...transformFunctionBodyHeader(context, scope, statement.parameters, restParamName),
  ]

  const constructorFieldsDeclarations = statement.parameters.filter(
    (p) => p.modifiers !== undefined
  )

  const classInstanceFields = transformClassInstanceFields(context, instanceFields)

  if (
    (constructorFieldsDeclarations.length > 0 || classInstanceFields.length > 0) &&
    statement.body &&
    statement.body.statements.length > 0
  ) {
    const superIndex = statement.body.statements.findIndex(
      (s) =>
        ts.isExpressionStatement(s) &&
        ts.isCallExpression(s.expression) &&
        s.expression.expression.kind === ts.SyntaxKind.SuperKeyword
    )

    if (superIndex !== -1) {
      bodyWithFieldInitializers.push(...body.slice(0, superIndex + 1))
      body = body.slice(superIndex + 1)
    }
  }

  for (const declaration of constructorFieldsDeclarations) {
    if (ts.isIdentifier(declaration.name)) {
      const assignment = luaStatements.createAssignmentStatement(
        luaExpressions.createTableIndexExpression(
          createSelfIdentifier(),
          luaExpressions.createStringLiteral(declaration.name.text)
        ),
        transformIdentifier(context, declaration.name)
      )
      bodyWithFieldInitializers.push(assignment)
    }
  }

  bodyWithFieldInitializers.push(...classInstanceFields)

  bodyWithFieldInitializers.push(...body)

  const block = luaStatements.createBlock(bodyWithFieldInitializers)

  const constructorWasGenerated = statement.pos === -1

  context.popScope()

  return luaStatements.createAssignmentStatement(
    createConstructorName(className),
    luaExpressions.createFunctionExpression(
      block,
      params,
      dotsLiteral,
      luaCore.NodeFlags.Declaration
    ),
    constructorWasGenerated ? classDeclaration : statement
  )
}
