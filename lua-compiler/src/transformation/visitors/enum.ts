import * as ts from "typescript"
import * as luaCore from "../../LuaAST-core"
import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import type { FunctionVisitor } from "../context/visitors"
import { AnnotationKind, getTypeAnnotations } from "../utils/annotations"
import { addExportToIdentifier, getSymbolExportScope } from "../utils/export"
import { createLocalOrExportedOrGlobalDeclaration } from "../utils/lua-ast"
import { isFirstDeclaration } from "../utils/typescript/nodes"
import { transformIdentifier } from "./identifier"
import { transformPropertyName } from "./property-name"

export function tryGetConstEnumValue(
  context: TransformationContext,
  node: ts.EnumMember | ts.PropertyAccessExpression | ts.ElementAccessExpression
): luaExpressions.Expression | undefined {
  const value = context.checker.getConstantValue(node)
  if (typeof value === "string") {
    return luaExpressions.createStringLiteral(value, node)
  } else if (typeof value === "number") {
    return luaExpressions.createNumericLiteral(value, node)
  }
}

export const transformEnumDeclaration: FunctionVisitor<ts.EnumDeclaration> = (node, context) => {
  if (
    (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Const) !== 0 &&
    !context.options.preserveConstEnums
  ) {
    return undefined
  }

  const type = context.checker.getTypeAtLocation(node)
  const membersOnly = getTypeAnnotations(type).has(AnnotationKind.CompileMembersOnly)
  const result: luaStatements.Statement[] = []

  if (!membersOnly && isFirstDeclaration(context, node)) {
    const name = transformIdentifier(context, node.name)
    const table = luaExpressions.createBinaryExpression(
      addExportToIdentifier(context, name),
      luaExpressions.createTableExpression(),
      luaCore.SyntaxKind.OrOperator
    )
    result.push(...createLocalOrExportedOrGlobalDeclaration(context, name, table, node))
  }

  const enumReference = context.transformExpression(node.name)
  for (const member of node.members) {
    const memberName = transformPropertyName(context, member.name)

    let valueExpression: luaExpressions.Expression | undefined
    const constEnumValue = tryGetConstEnumValue(context, member)
    if (constEnumValue) {
      valueExpression = constEnumValue
    } else if (member.initializer) {
      if (ts.isIdentifier(member.initializer)) {
        const symbol = context.checker.getSymbolAtLocation(member.initializer)
        if (
          symbol?.valueDeclaration &&
          ts.isEnumMember(symbol.valueDeclaration) &&
          symbol.valueDeclaration.parent === node
        ) {
          const otherMemberName = transformPropertyName(context, symbol.valueDeclaration.name)
          valueExpression = luaExpressions.createTableIndexExpression(enumReference, otherMemberName)
        }
      }

      valueExpression ??= context.transformExpression(member.initializer)
    } else {
      valueExpression = luaExpressions.createNilLiteral()
    }

    if (membersOnly) {
      const enumSymbol = context.checker.getSymbolAtLocation(node.name)
      const exportScope = enumSymbol ? getSymbolExportScope(context, enumSymbol) : undefined

      result.push(
        ...createLocalOrExportedOrGlobalDeclaration(
          context,
          luaExpressions.isIdentifier(memberName)
            ? memberName
            : luaExpressions.createIdentifier(member.name.getText(), member.name),
          valueExpression,
          node,
          exportScope
        )
      )
    } else {
      const memberAccessor = luaExpressions.createTableIndexExpression(enumReference, memberName)
      result.push(luaStatements.createAssignmentStatement(memberAccessor, valueExpression, member))

      if (!luaExpressions.isStringLiteral(valueExpression) && !luaExpressions.isNilLiteral(valueExpression)) {
        const reverseMemberAccessor = luaExpressions.createTableIndexExpression(enumReference, memberAccessor)
        result.push(luaStatements.createAssignmentStatement(reverseMemberAccessor, memberName, member))
      }
    }
  }

  return result
}
