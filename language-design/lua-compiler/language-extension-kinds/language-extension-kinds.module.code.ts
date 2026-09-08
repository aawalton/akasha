import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import {
  invalidMethodCallExtensionUse,
  invalidSpreadInCallExtension,
} from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"

export const ExtensionKind = {
  MultiFunction: "MultiFunction",
  RangeFunction: "RangeFunction",
  VarargConstant: "VarargConstant",
  AdditionOperatorType: "Addition",
  AdditionOperatorMethodType: "AdditionMethod",
  SubtractionOperatorType: "Subtraction",
  SubtractionOperatorMethodType: "SubtractionMethod",
  MultiplicationOperatorType: "Multiplication",
  MultiplicationOperatorMethodType: "MultiplicationMethod",
  DivisionOperatorType: "Division",
  DivisionOperatorMethodType: "DivisionMethod",
  ModuloOperatorType: "Modulo",
  ModuloOperatorMethodType: "ModuloMethod",
  PowerOperatorType: "Power",
  PowerOperatorMethodType: "PowerMethod",
  FloorDivisionOperatorType: "FloorDivision",
  FloorDivisionOperatorMethodType: "FloorDivisionMethod",
  BitwiseAndOperatorType: "BitwiseAnd",
  BitwiseAndOperatorMethodType: "BitwiseAndMethod",
  BitwiseOrOperatorType: "BitwiseOr",
  BitwiseOrOperatorMethodType: "BitwiseOrMethod",
  BitwiseExclusiveOrOperatorType: "BitwiseExclusiveOr",
  BitwiseExclusiveOrOperatorMethodType: "BitwiseExclusiveOrMethod",
  BitwiseLeftShiftOperatorType: "BitwiseLeftShift",
  BitwiseLeftShiftOperatorMethodType: "BitwiseLeftShiftMethod",
  BitwiseRightShiftOperatorType: "BitwiseRightShift",
  BitwiseRightShiftOperatorMethodType: "BitwiseRightShiftMethod",
  ConcatOperatorType: "Concat",
  ConcatOperatorMethodType: "ConcatMethod",
  LessThanOperatorType: "LessThan",
  LessThanOperatorMethodType: "LessThanMethod",
  GreaterThanOperatorType: "GreaterThan",
  GreaterThanOperatorMethodType: "GreaterThanMethod",
  NegationOperatorType: "Negation",
  NegationOperatorMethodType: "NegationMethod",
  BitwiseNotOperatorType: "BitwiseNot",
  BitwiseNotOperatorMethodType: "BitwiseNotMethod",
  LengthOperatorType: "Length",
  LengthOperatorMethodType: "LengthMethod",
  TableNewType: "TableNew",
  TableDeleteType: "TableDelete",
  TableDeleteMethodType: "TableDeleteMethod",
  TableGetType: "TableGet",
  TableGetMethodType: "TableGetMethod",
  TableHasType: "TableHas",
  TableHasMethodType: "TableHasMethod",
  TableSetType: "TableSet",
  TableSetMethodType: "TableSetMethod",
  TableAddKeyType: "TableAddKey",
  TableAddKeyMethodType: "TableAddKeyMethod",
  TableIsEmptyType: "TableIsEmpty",
  TableIsEmptyMethodType: "TableIsEmptyMethod",
} as const
export type ExtensionKind = (typeof ExtensionKind)[keyof typeof ExtensionKind]

const extensionValues: ReadonlySet<string> = new Set<string>(Object.values(ExtensionKind))

function isExtensionKind(value: string): value is ExtensionKind {
  return extensionValues.has(value)
}

export function getExtensionKindForType(
  context: TransformationContext,
  type: ts.Type
): ExtensionKind | undefined {
  const value = getPropertyValue(context, type, "__tstlExtension")
  if (value !== undefined && isExtensionKind(value)) {
    return value
  }
}

const excludedTypeFlags: ts.TypeFlags =
  ((1 << 18) - 1) | ts.TypeFlags.Index | ts.TypeFlags.NonPrimitive

function getPropertyValue(
  context: TransformationContext,
  type: ts.Type,
  propertyName: string
): string | undefined {
  if ((type.flags & excludedTypeFlags) !== 0) return
  const property = type.getProperty(propertyName)
  if (!property) return undefined
  const propertyType = context.checker.getTypeOfSymbolAtLocation(property, context.sourceFile)
  if (propertyType.isStringLiteral()) return propertyType.value
}

export function getExtensionKindForNode(
  context: TransformationContext,
  node: ts.Node
): ExtensionKind | undefined {
  const originalNode = ts.getOriginalNode(node)
  let type = context.checker.getTypeAtLocation(originalNode)
  if (ts.isOptionalChain(originalNode)) {
    type = context.checker.getNonNullableType(type)
  }
  return getExtensionKindForType(context, type)
}

export function getExtensionKindForSymbol(
  context: TransformationContext,
  symbol: ts.Symbol
): ExtensionKind | undefined {
  const type = context.checker.getTypeOfSymbolAtLocation(symbol, context.sourceFile)
  return getExtensionKindForType(context, type)
}

export const IterableExtensionKind = {
  Iterable: "Iterable",
  Pairs: "Pairs",
  PairsKey: "PairsKey",
} as const
export type IterableExtensionKind =
  (typeof IterableExtensionKind)[keyof typeof IterableExtensionKind]

export function isLuaIterable(context: TransformationContext, type: ts.Type): boolean {
  return getPropertyValue(context, type, "__tstlIterable") !== undefined
}

const iterableExtensionValues: ReadonlySet<string> = new Set<string>(
  Object.values(IterableExtensionKind)
)

function isIterableExtensionKind(value: string): value is IterableExtensionKind {
  return iterableExtensionValues.has(value)
}

export function getIterableExtensionTypeForType(
  context: TransformationContext,
  type: ts.Type
): IterableExtensionKind | undefined {
  const value = getPropertyValue(context, type, "__tstlIterable")
  if (value !== undefined && isIterableExtensionKind(value)) {
    return value
  }
}

export function getIterableExtensionKindForNode(
  context: TransformationContext,
  node: ts.Node
): IterableExtensionKind | undefined {
  const type = context.checker.getTypeAtLocation(node)
  return getIterableExtensionTypeForType(context, type)
}

export const methodExtensionKinds: ReadonlySet<ExtensionKind> = new Set<ExtensionKind>(
  Object.values(ExtensionKind).filter((key) => key.endsWith("Method"))
)

export function getNaryCallExtensionArgs(
  context: TransformationContext,
  node: ts.CallExpression,
  kind: ExtensionKind,
  numArgs: number
): readonly ts.Expression[] | undefined {
  let expressions: readonly ts.Expression[]
  if (node.arguments.some(ts.isSpreadElement)) {
    context.addDiagnostic(invalidSpreadInCallExtension(node))
    return undefined
  }
  if (methodExtensionKinds.has(kind)) {
    if (
      !(
        ts.isPropertyAccessExpression(node.expression) ||
        ts.isElementAccessExpression(node.expression)
      )
    ) {
      context.addDiagnostic(invalidMethodCallExtensionUse(node))
      return undefined
    }
    if (node.arguments.length < numArgs - 1) {
      return undefined
    }
    expressions = [node.expression.expression, ...node.arguments]
  } else {
    if (node.arguments.length < numArgs) {
      return undefined
    }
    expressions = node.arguments
  }
  return expressions
}

export function getUnaryCallExtensionArg(
  context: TransformationContext,
  node: ts.CallExpression,
  kind: ExtensionKind
): ts.Expression | undefined {
  return getNaryCallExtensionArgs(context, node, kind, 1)?.[0]
}

export function getBinaryCallExtensionArgs(
  context: TransformationContext,
  node: ts.CallExpression,
  kind: ExtensionKind
): readonly [ts.Expression, ts.Expression] | undefined {
  const expressions = getNaryCallExtensionArgs(context, node, kind, 2)
  if (expressions === undefined) return undefined
  const [first, second] = expressions
  if (first === undefined || second === undefined) return undefined
  return [first, second]
}
