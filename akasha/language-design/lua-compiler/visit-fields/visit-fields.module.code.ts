import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { createSelfIdentifier } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { transformInPrecedingStatementScope } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { transformPropertyName } from "../visit-property-name/visit-property-name.module.code.ts"

export function transformClassInstanceFields(
  context: TransformationContext,
  instanceFields: readonly ts.PropertyDeclaration[]
): readonly luaStatements.Statement[] {
  const statements: luaStatements.Statement[] = []

  for (const f of instanceFields) {
    const { precedingStatements, result: statement } = transformInPrecedingStatementScope(
      context,
      () => {
        const fieldName = transformPropertyName(context, f.name)

        const value = f.initializer ? context.transformExpression(f.initializer) : undefined

        const selfIndex = luaExpressions.createTableIndexExpression(
          createSelfIdentifier(),
          fieldName
        )

        const assignClassField = luaStatements.createAssignmentStatement(selfIndex, value, f)

        return assignClassField
      }
    )

    statements.push(...precedingStatements, statement)
  }

  return statements
}

export function transformStaticPropertyDeclaration(
  context: TransformationContext,
  field: ts.PropertyDeclaration,
  className: luaExpressions.Identifier
): luaStatements.AssignmentStatement | undefined {
  if (!field.initializer) return
  const fieldName = transformPropertyName(context, field.name)
  const value = context.transformExpression(field.initializer)
  const classField = luaExpressions.createTableIndexExpression(
    luaExpressions.cloneIdentifier(className),
    fieldName
  )

  return luaStatements.createAssignmentStatement(classField, value)
}
