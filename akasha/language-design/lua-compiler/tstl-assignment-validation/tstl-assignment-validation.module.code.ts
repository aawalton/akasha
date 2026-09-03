import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import {
  unsupportedNoSelfFunctionConversion,
  unsupportedOverloadAssignment,
} from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import {
  ContextType,
  getFunctionContextType,
} from "../tstl-function-context/tstl-function-context.module.code.ts"
import { willWrapThisVoidAdapter } from "../tstl-this-void-adapter/tstl-this-void-adapter.module.code.ts"
import { isReferenceType } from "../tstl-typescript/tstl-typescript.module.code.ts"
import { cast, getOrUpdate } from "../tstl-utils/tstl-utils.module.code.ts"

const typeValidationCache = new WeakMap<ts.Type, Set<ts.Type>>()

const thisVoidConversionDiagnosed = new WeakSet<ts.Node>()

function resolveConversionNode(node: ts.Node): ts.Node {
  if (ts.isReturnStatement(node) && node.expression !== undefined) {
    return resolveConversionNode(node.expression)
  }
  if (ts.isParenthesizedExpression(node)) {
    return resolveConversionNode(node.expression)
  }
  return node
}

function validateThisVoidConversion(
  context: TransformationContext,
  node: ts.Node,
  fromType: ts.Type,
  toType: ts.Type,
  toName?: string
): undefined {
  const conversionNode = resolveConversionNode(node)
  if (ts.isObjectLiteralExpression(conversionNode) || ts.isArrayLiteralExpression(conversionNode)) {
    return
  }
  if (getFunctionContextType(context, fromType) !== ContextType.Void) return
  if (getFunctionContextType(context, toType) !== ContextType.NonVoid) return
  if (ts.isExpression(conversionNode) && willWrapThisVoidAdapter(context, conversionNode)) return
  if (thisVoidConversionDiagnosed.has(conversionNode)) return
  thisVoidConversionDiagnosed.add(conversionNode)
  context.addDiagnostic(unsupportedNoSelfFunctionConversion(conversionNode, toName))
}

export function validateAssignment(
  context: TransformationContext,
  node: ts.Node,
  fromType: ts.Type,
  toType: ts.Type,
  toName?: string
): undefined {
  if (toType === fromType) {
    return
  }

  if ((toType.flags & ts.TypeFlags.Any) !== 0) {
    return
  }

  validateThisVoidConversion(context, node, fromType, toType, toName)

  if (toType.isUnion()) {
    for (const constituent of toType.types) {
      validateAssignment(context, node, fromType, constituent, toName)
    }
    return
  }

  if (ts.isArrayLiteralExpression(node)) {
    const checkerForElements = context.checker
    const toTypeArguments = isReferenceType(toType)
      ? checkerForElements.getTypeArguments(toType)
      : undefined
    const isIndexed =
      toTypeArguments !== undefined &&
      toTypeArguments.length > 0 &&
      (checkerForElements.isTupleType(toType) || checkerForElements.isArrayType(toType))
    const isIterableShaped =
      !isIndexed && toTypeArguments !== undefined && toTypeArguments.length >= 1
    if (isIndexed || isIterableShaped) {
      node.elements.forEach((element, index) => {
        if (ts.isSpreadElement(element)) return
        const toElementType = checkerForElements.isTupleType(toType)
          ? toTypeArguments[index]
          : toTypeArguments[0]
        if (toElementType === undefined) return
        validateAssignment(
          context,
          element,
          checkerForElements.getTypeAtLocation(element),
          toElementType,
          toName
        )
      })
    }
  }

  if (ts.isObjectLiteralExpression(node)) {
    const checkerForMembers = context.checker
    for (const property of node.properties) {
      const initializer = ts.isPropertyAssignment(property)
        ? property.initializer
        : ts.isShorthandPropertyAssignment(property)
          ? property.name
          : undefined
      if (initializer === undefined || property.name === undefined) continue
      const propertyName = ts.isIdentifier(property.name)
        ? property.name.text
        : ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name)
          ? property.name.text
          : undefined
      if (propertyName === undefined) continue
      const toMemberSymbol = checkerForMembers.getPropertyOfType(toType, propertyName)
      const toMemberType =
        toMemberSymbol !== undefined
          ? checkerForMembers.getTypeOfSymbolAtLocation(toMemberSymbol, node)
          : (checkerForMembers.getIndexTypeOfType(toType, ts.IndexKind.String) ??
            checkerForMembers.getIndexTypeOfType(toType, ts.IndexKind.Number))
      if (toMemberType === undefined) continue
      validateAssignment(
        context,
        initializer,
        checkerForMembers.getTypeAtLocation(initializer),
        toMemberType,
        toName != null ? `${toName}.${propertyName}` : propertyName
      )
    }
  }

  const fromTypeCache = getOrUpdate(typeValidationCache, fromType, () => new Set())
  if (fromTypeCache.has(toType)) return
  fromTypeCache.add(toType)

  if (fromType.isUnion()) {
    for (const constituent of fromType.types) {
      validateAssignment(context, node, constituent, toType, toName)
    }
    return
  }

  validateFunctionAssignment(context, node, fromType, toType, toName)

  const checker = context.checker
  if (
    (checker.isTupleType(toType) || checker.isArrayType(toType)) &&
    (checker.isTupleType(fromType) || checker.isArrayType(fromType))
  ) {
    const fromTypeArguments = cast(fromType, isReferenceType).typeArguments
    const toTypeArguments = cast(toType, isReferenceType).typeArguments

    if (fromTypeArguments === undefined || toTypeArguments === undefined) {
      return
    }

    const count = Math.min(fromTypeArguments.length, toTypeArguments.length)
    for (let i = 0; i < count; ++i) {
      const fromArg = fromTypeArguments[i]
      const toArg = toTypeArguments[i]
      if (fromArg === undefined || toArg === undefined) continue
      validateAssignment(context, node, fromArg, toArg, toName)
    }
  }

  const fromMembers = fromType.symbol?.members
  const toMembers = toType.symbol?.members

  if (fromMembers && toMembers) {
    if (toMembers.size < fromMembers.size) {
      toMembers.forEach((toMember, escapedMemberName) => {
        const fromMember = fromMembers.get(escapedMemberName)
        if (fromMember) {
          validateMember(toMember, fromMember, escapedMemberName)
        }
      })
    } else {
      fromMembers.forEach((fromMember, escapedMemberName) => {
        const toMember = toMembers.get(escapedMemberName)
        if (toMember) {
          validateMember(toMember, fromMember, escapedMemberName)
        }
      })
    }
  }

  function validateMember(
    toMember: ts.Symbol,
    fromMember: ts.Symbol,
    escapedMemberName: ts.__String
  ): undefined {
    const toMemberType = context.checker.getTypeOfSymbolAtLocation(toMember, node)
    const fromMemberType = context.checker.getTypeOfSymbolAtLocation(fromMember, node)
    const memberName = ts.unescapeLeadingUnderscores(escapedMemberName)
    validateAssignment(
      context,
      node,
      fromMemberType,
      toMemberType,
      toName != null ? `${toName}.${memberName}` : memberName
    )
  }
}

function validateFunctionAssignment(
  context: TransformationContext,
  node: ts.Node,
  fromType: ts.Type,
  toType: ts.Type,
  toName?: string
): undefined {
  const fromContext = getFunctionContextType(context, fromType)
  const toContext = getFunctionContextType(context, toType)

  if (fromContext === ContextType.Mixed || toContext === ContextType.Mixed) {
    context.addDiagnostic(unsupportedOverloadAssignment(node, toName))
  } else if (fromContext === ContextType.NonVoid && toContext === ContextType.Void) {
    context.addDiagnostic(unsupportedNoSelfFunctionConversion(node, toName))
  }
}
