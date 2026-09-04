import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { createSelfIdentifier } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { ScopeType } from "../tstl-scope/tstl-scope.module.code.ts"
import { transformClassInstanceFields } from "../visit-fields/visit-fields.module.code.ts"
import {
  transformFunctionBodyContent,
  transformFunctionBodyHeader,
  transformParameters,
} from "../visit-function/visit-function.module.code.ts"
import { transformIdentifier } from "../visit-identifier/visit-identifier.module.code.ts"

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
