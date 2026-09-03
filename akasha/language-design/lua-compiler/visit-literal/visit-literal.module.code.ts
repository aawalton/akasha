import { assertNever } from "@akasha/utils-narrow/assert-never"
import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor, Visitors } from "../context-visitors/context-visitors.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import {
  undefinedInArrayLiteral,
  unsupportedAccessorInObjectLiteral,
} from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import { trackSymbolReference } from "../tstl-symbols/tstl-symbols.module.code.ts"
import { isArrayType } from "../tstl-typescript/tstl-typescript.module.code.ts"
import { transformFunctionLikeDeclaration } from "../visit-function/visit-function.module.code.ts"
import { transformIdentifierWithSymbol } from "../visit-identifier/visit-identifier.module.code.ts"
import { transformPropertyName } from "../visit-property-name/visit-property-name.module.code.ts"

export function createShorthandIdentifier(
  context: TransformationContext,
  valueSymbol: ts.Symbol | undefined,
  propertyIdentifier: ts.Identifier
): luaExpressions.Expression {
  return transformIdentifierWithSymbol(context, propertyIdentifier, valueSymbol)
}

const transformNumericLiteralExpression: FunctionVisitor<ts.NumericLiteral> = (
  expression,
  context
) => {
  if (expression.text === "Infinity") {
    if (context.luaTarget === LuaTarget.Lua50) {
      const one = luaExpressions.createNumericLiteral(1)
      const zero = luaExpressions.createNumericLiteral(0)
      return luaExpressions.createBinaryExpression(one, zero, luaCore.SyntaxKind.DivisionOperator)
    } else {
      const math = luaExpressions.createIdentifier("math")
      const huge = luaExpressions.createStringLiteral("huge")
      return luaExpressions.createTableIndexExpression(math, huge, expression)
    }
  }

  return luaExpressions.createNumericLiteral(Number(expression.text), expression)
}

const transformObjectLiteralExpression: FunctionVisitor<ts.ObjectLiteralExpression> = (
  expression,
  context
) => {
  const properties: luaExpressions.Expression[] = []
  const initializers: ts.Node[] = []
  const keyPrecedingStatements: (readonly luaStatements.Statement[])[] = []
  const valuePrecedingStatements: (readonly luaStatements.Statement[])[] = []
  let lastPrecedingStatementsIndex = -1

  for (const [i, element] of expression.properties.entries()) {
    context.pushPrecedingStatements()

    const name = element.name ? transformPropertyName(context, element.name) : undefined

    let precedingStatements = context.popPrecedingStatements()
    keyPrecedingStatements.push(precedingStatements)
    if (precedingStatements.length > 0) {
      lastPrecedingStatementsIndex = i
    }

    context.pushPrecedingStatements()

    if (ts.isPropertyAssignment(element)) {
      const expression = context.transformExpression(element.initializer)
      properties.push(luaExpressions.createTableFieldExpression(expression, name, element))
      initializers.push(element.initializer)
    } else if (ts.isShorthandPropertyAssignment(element)) {
      const valueSymbol = context.checker.getShorthandAssignmentValueSymbol(element)
      if (valueSymbol) {
        trackSymbolReference(context, valueSymbol, element.name)
      }

      const identifier = createShorthandIdentifier(context, valueSymbol, element.name)
      properties.push(luaExpressions.createTableFieldExpression(identifier, name, element))
      initializers.push(element)
    } else if (ts.isMethodDeclaration(element)) {
      const expression = transformFunctionLikeDeclaration(element, context)
      properties.push(luaExpressions.createTableFieldExpression(expression, name, element))
      initializers.push(element)
    } else if (ts.isSpreadAssignment(element)) {
      const type = context.checker.getTypeAtLocation(element.expression)
      let tableExpression: luaExpressions.Expression
      if (isArrayType(context, type)) {
        tableExpression = transformLuaLibFunction(
          context,
          LuaLibFeature.ArrayToObject,
          element.expression,
          context.transformExpression(element.expression)
        )
      } else {
        tableExpression = context.transformExpression(element.expression)
      }

      properties.push(tableExpression)
      initializers.push(element.expression)
    } else if (ts.isAccessor(element)) {
      context.addDiagnostic(unsupportedAccessorInObjectLiteral(element))
    } else {
      assertNever(element)
    }

    precedingStatements = context.popPrecedingStatements()
    valuePrecedingStatements.push(precedingStatements)
    if (precedingStatements.length > 0) {
      lastPrecedingStatementsIndex = i
    }
  }

  if (lastPrecedingStatementsIndex >= 0) {
    for (const [i, property] of properties.entries()) {
      const keyPre = keyPrecedingStatements[i]
      const valuePre = valuePrecedingStatements[i]
      const sourceProp = expression.properties[i]
      const initializer = initializers[i]
      if (keyPre === undefined || valuePre === undefined || sourceProp === undefined) continue

      context.addPrecedingStatements(keyPre)

      if (
        i <= lastPrecedingStatementsIndex &&
        luaExpressions.isTableFieldExpression(property) &&
        property.key
      ) {
        property.key = context.moveToPrecedingTemp(property.key, sourceProp.name)
      }

      context.addPrecedingStatements(valuePre)

      if (i < lastPrecedingStatementsIndex && initializer !== undefined) {
        if (luaExpressions.isTableFieldExpression(property)) {
          property.value = context.moveToPrecedingTemp(property.value, initializer)
        } else {
          properties[i] = context.moveToPrecedingTemp(property, initializer)
        }
      }
    }
  }

  let fields: luaExpressions.TableFieldExpression[] = []
  const tableExpressions: luaExpressions.Expression[] = []
  for (const property of properties) {
    if (luaExpressions.isTableFieldExpression(property)) {
      fields.push(property)
    } else {
      if (fields.length > 0) {
        tableExpressions.push(luaExpressions.createTableExpression(fields))
      }
      tableExpressions.push(property)
      fields = []
    }
  }

  if (tableExpressions.length === 0) {
    return luaExpressions.createTableExpression(fields, expression)
  } else {
    if (fields.length > 0) {
      const tableExpression = luaExpressions.createTableExpression(fields, expression)
      tableExpressions.push(tableExpression)
    }

    if (tableExpressions[0]?.kind !== luaCore.SyntaxKind.TableExpression) {
      tableExpressions.unshift(luaExpressions.createTableExpression(undefined, expression))
    }
    return transformLuaLibFunction(
      context,
      LuaLibFeature.ObjectAssign,
      expression,
      ...tableExpressions
    )
  }
}

const transformArrayLiteralExpression: FunctionVisitor<ts.ArrayLiteralExpression> = (
  expression,
  context
) => {
  checkForUndefinedOrNullInArrayLiteral(expression, context)

  const filteredElements = expression.elements.map((e) =>
    ts.isOmittedExpression(e) ? ts.factory.createIdentifier("undefined") : e
  )
  const values = context
    .transformExpressionList(filteredElements)
    .map((e) => luaExpressions.createTableFieldExpression(e))

  return luaExpressions.createTableExpression(values, expression)
}

function checkForUndefinedOrNullInArrayLiteral(
  array: ts.ArrayLiteralExpression,
  context: TransformationContext
) {
  let lastNonUndefinedIndex = array.elements.length - 1
  for (; lastNonUndefinedIndex >= 0; lastNonUndefinedIndex--) {
    const elem = array.elements[lastNonUndefinedIndex]
    if (elem !== undefined && !isUndefinedOrNull(elem)) {
      break
    }
  }

  for (const [i, elem] of array.elements.entries()) {
    if (i < lastNonUndefinedIndex && isUndefinedOrNull(elem)) {
      context.addDiagnostic(undefinedInArrayLiteral(elem))
    }
  }
}

function isUndefinedOrNull(node: ts.Node) {
  return (
    node.kind === ts.SyntaxKind.UndefinedKeyword ||
    node.kind === ts.SyntaxKind.NullKeyword ||
    (ts.isIdentifier(node) && node.text === "undefined")
  )
}

export const literalVisitors: Visitors = {
  [ts.SyntaxKind.NullKeyword]: (node) => luaExpressions.createNilLiteral(node),
  [ts.SyntaxKind.TrueKeyword]: (node) => luaExpressions.createBooleanLiteral(true, node),
  [ts.SyntaxKind.FalseKeyword]: (node) => luaExpressions.createBooleanLiteral(false, node),
  [ts.SyntaxKind.NumericLiteral]: transformNumericLiteralExpression,
  [ts.SyntaxKind.StringLiteral]: (node) => luaExpressions.createStringLiteral(node.text, node),
  [ts.SyntaxKind.NoSubstitutionTemplateLiteral]: (node) =>
    luaExpressions.createStringLiteral(node.text, node),
  [ts.SyntaxKind.ObjectLiteralExpression]: transformObjectLiteralExpression,
  [ts.SyntaxKind.ArrayLiteralExpression]: transformArrayLiteralExpression,
}
