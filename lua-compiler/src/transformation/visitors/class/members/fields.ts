import type * as ts from "typescript"
import * as luaStatements from "../../../../LuaAST-statements"
import * as luaExpressions from "../../../../LuaAST-expressions"
import type { TransformationContext } from "../../../context/transformation-context"
import { createSelfIdentifier } from "../../../utils/lua-ast"
import { transformInPrecedingStatementScope } from "../../../utils/preceding-statements"
import { transformPropertyName } from "../../property-name"

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

        const selfIndex = luaExpressions.createTableIndexExpression(createSelfIdentifier(), fieldName)

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
  const classField = luaExpressions.createTableIndexExpression(luaExpressions.cloneIdentifier(className), fieldName)

  return luaStatements.createAssignmentStatement(classField, value)
}
