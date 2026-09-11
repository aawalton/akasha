import type { TransformationContext } from "akasha/language-design/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import { createSelfIdentifier } from "akasha/language-design/lua-compiler/lua-ast/lua-ast.module.code.ts"
import * as luaExpressions from "akasha/language-design/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/language-design/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { transformInPrecedingStatementScope } from "akasha/language-design/lua-compiler/preceding-statements/preceding-statements.module.code.ts"
import { transformPropertyName } from "akasha/language-design/lua-compiler/visit-property-name/visit-property-name.module.code.ts"
import type * as ts from "typescript"

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
