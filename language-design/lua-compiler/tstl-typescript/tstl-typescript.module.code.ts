import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"

export function findFirstNodeAbove<T extends ts.Node>(
  node: ts.Node,
  callback: (n: ts.Node) => n is T
): T | undefined {
  let current = node
  while (current.parent) {
    if (callback(current.parent)) {
      return current.parent
    } else {
      current = current.parent
    }
  }
}

export function getCalledExpression(node: ts.CallExpression): ts.Expression {
  return ts.skipOuterExpressions(node.expression)
}

export function hasExportEquals(sourceFile: ts.SourceFile): boolean {
  return sourceFile.statements.some((node) => ts.isExportAssignment(node) && node.isExportEquals)
}

export function findFirstNonOuterParent(node: ts.Node): ts.Node {
  let current = ts.getOriginalNode(node).parent
  while (ts.isOuterExpression(current)) {
    current = ts.getOriginalNode(current).parent
  }
  return current
}

export function expressionResultIsUsed(node: ts.Expression): boolean {
  return !ts.isExpressionStatement(findFirstNonOuterParent(node))
}

export function isExpressionWithEvaluationEffect(node: ts.Expression): boolean {
  return !(
    ts.isLiteralExpression(node) ||
    ts.isIdentifier(node) ||
    node.kind === ts.SyntaxKind.ThisKeyword
  )
}

export function isAssignmentPattern(node: ts.Node): node is ts.AssignmentPattern {
  return ts.isObjectLiteralExpression(node) || ts.isArrayLiteralExpression(node)
}

export function isDestructuringAssignment(node: ts.Node): node is ts.DestructuringAssignment {
  return (
    ts.isBinaryExpression(node) &&
    node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
    isAssignmentPattern(node.left)
  )
}

export function isAmbientNode(node: ts.Declaration): boolean {
  return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Ambient) !== 0
}

export function isInDestructingAssignment(node: ts.Node): boolean {
  return (
    node.parent &&
    ((ts.isVariableDeclaration(node.parent) && ts.isArrayBindingPattern(node.parent.name)) ||
      (ts.isBinaryExpression(node.parent) && ts.isArrayLiteralExpression(node.parent.left)))
  )
}

export function isInAsyncFunction(node: ts.Node): boolean {
  const declaration = findFirstNodeAbove(node, ts.isFunctionLike)
  if (!declaration) {
    return false
  }

  if (ts.canHaveModifiers(declaration)) {
    return ts.getModifiers(declaration)?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword) ?? false
  } else {
    return false
  }
}

export function isInGeneratorFunction(node: ts.Node): boolean {
  const declaration = findFirstNodeAbove(node, ts.isFunctionDeclaration)
  if (!declaration) {
    return false
  }

  return declaration.asteriskToken !== undefined
}

export function getSymbolOfNode(
  context: TransformationContext,
  node: ts.Node
): ts.Symbol | undefined {
  return node.symbol ?? context.checker.getSymbolAtLocation(node)
}

export function isFirstDeclaration(context: TransformationContext, node: ts.Node) {
  const symbol = getSymbolOfNode(context, node)
  return symbol ? symbol.valueDeclaration === node : true
}

export function getFirstDeclarationInFile(
  symbol: ts.Symbol,
  sourceFile: ts.SourceFile
): ts.Declaration | undefined {
  const originalSourceFile = ts.getParseTreeNode(sourceFile) ?? sourceFile
  const declarations = (symbol.getDeclarations() ?? []).filter(
    (d) => d.getSourceFile() === originalSourceFile
  )

  return declarations.length > 0
    ? declarations.reduce((p, c) => (p.pos < c.pos ? p : c))
    : undefined
}

export function isConstIdentifier(context: TransformationContext, node: ts.Node) {
  let identifier = node
  if (ts.isComputedPropertyName(identifier)) {
    identifier = identifier.expression
  }
  if (!ts.isIdentifier(identifier)) {
    return false
  }
  const symbol = context.checker.getSymbolAtLocation(identifier)
  if (!symbol?.declarations) {
    return false
  }
  return symbol.declarations.some(
    (d) => ts.isVariableDeclarationList(d.parent) && (d.parent.flags & ts.NodeFlags.Const) !== 0
  )
}

export function isStandardLibraryDeclaration(
  context: TransformationContext,
  declaration: ts.Declaration
): boolean {
  const parseTreeNode = ts.getParseTreeNode(declaration) ?? declaration
  const sourceFile = parseTreeNode.getSourceFile()
  if (!sourceFile) {
    return false
  }

  return context.program.isSourceFileDefaultLibrary(sourceFile)
}

export function typeAlwaysHasSomeOfFlags(
  context: TransformationContext,
  type: ts.Type,
  flags: ts.TypeFlags
): boolean {
  const baseConstraint = context.checker.getBaseConstraintOfType(type)
  if (baseConstraint) {
    type = baseConstraint
  }

  if ((type.flags & flags) !== 0) {
    return true
  }

  if (type.isUnion()) {
    return type.types.every((t) => typeAlwaysHasSomeOfFlags(context, t, flags))
  }

  if (type.isIntersection()) {
    return type.types.some((t) => typeAlwaysHasSomeOfFlags(context, t, flags))
  }

  return false
}

export function typeCanHaveSomeOfFlags(
  context: TransformationContext,
  type: ts.Type,
  flags: ts.TypeFlags
): boolean {
  const baseConstraint = context.checker.getBaseConstraintOfType(type)
  if (!baseConstraint) {
    if (type.isTypeParameter()) return true
  } else {
    type = baseConstraint
  }

  if ((type.flags & flags) !== 0) {
    return true
  }

  if (type.isUnion()) {
    return type.types.some((t) => typeCanHaveSomeOfFlags(context, t, flags))
  }

  if (type.isIntersection()) {
    return type.types.some((t) => typeCanHaveSomeOfFlags(context, t, flags))
  }

  return false
}

export function isStringType(context: TransformationContext, type: ts.Type): boolean {
  return typeAlwaysHasSomeOfFlags(context, type, ts.TypeFlags.StringLike)
}

export function isNumberType(context: TransformationContext, type: ts.Type): boolean {
  return typeAlwaysHasSomeOfFlags(context, type, ts.TypeFlags.NumberLike)
}

function isExplicitArrayType(context: TransformationContext, type: ts.Type): boolean {
  if (context.checker.isArrayType(type) || context.checker.isTupleType(type)) return true

  if (type.isUnionOrIntersection()) {
    if (type.types.some((t) => isExplicitArrayType(context, t))) {
      return true
    }
  }

  const baseTypes = type.getBaseTypes()
  if (baseTypes) {
    if (baseTypes.some((t) => isExplicitArrayType(context, t))) {
      return true
    }
  }

  if (type.symbol) {
    const baseConstraint = context.checker.getBaseConstraintOfType(type)
    if (baseConstraint && baseConstraint !== type) {
      return isExplicitArrayType(context, baseConstraint)
    }
  }

  return false
}

function isAlwaysExplicitArrayType(context: TransformationContext, type: ts.Type): boolean {
  if (context.checker.isArrayType(type) || context.checker.isTupleType(type)) return true
  if (type.symbol) {
    const baseConstraint = context.checker.getBaseConstraintOfType(type)
    if (baseConstraint && baseConstraint !== type) {
      return isAlwaysExplicitArrayType(context, baseConstraint)
    }
  }

  if (type.isUnionOrIntersection()) {
    return type.types.every((t) => isAlwaysExplicitArrayType(context, t))
  }

  return false
}

export function forTypeOrAnySupertype(
  context: TransformationContext,
  type: ts.Type,
  predicate: (type: ts.Type) => boolean
): boolean {
  if (predicate(type)) {
    return true
  }

  if (!type.isClassOrInterface() && type.symbol) {
    type = context.checker.getDeclaredTypeOfSymbol(type.symbol)
  }

  const baseTypes = type.getBaseTypes()
  if (!baseTypes) return false
  return baseTypes.some((superType) => forTypeOrAnySupertype(context, superType, predicate))
}

export function isArrayType(context: TransformationContext, type: ts.Type): boolean {
  return forTypeOrAnySupertype(context, type, (t) => isExplicitArrayType(context, t))
}

export function isAlwaysArrayType(context: TransformationContext, type: ts.Type): boolean {
  return forTypeOrAnySupertype(context, type, (t) => isAlwaysExplicitArrayType(context, t))
}

export function isFunctionType(type: ts.Type): boolean {
  return type.getCallSignatures().length > 0
}

export function isReferenceType(t: ts.Type): t is ts.TypeReference {
  return (
    (t.flags & ts.TypeFlags.Object) !== 0 &&
    t.objectFlags !== undefined &&
    (t.objectFlags & ts.ObjectFlags.Reference) !== 0
  )
}

export function canBeFalsy(context: TransformationContext, type: ts.Type): boolean {
  const strictNullChecks =
    context.options.strict === true || context.options.strictNullChecks === true
  if (!strictNullChecks && !type.isLiteral()) return true
  const falsyFlags =
    ts.TypeFlags.Boolean |
    ts.TypeFlags.BooleanLiteral |
    ts.TypeFlags.Never |
    ts.TypeFlags.Void |
    ts.TypeFlags.Unknown |
    ts.TypeFlags.Any |
    ts.TypeFlags.Undefined |
    ts.TypeFlags.Null
  return typeCanHaveSomeOfFlags(context, type, falsyFlags)
}

export function canBeFalsyWhenNotNull(context: TransformationContext, type: ts.Type): boolean {
  const falsyFlags =
    ts.TypeFlags.Boolean |
    ts.TypeFlags.BooleanLiteral |
    ts.TypeFlags.Never |
    ts.TypeFlags.Void |
    ts.TypeFlags.Unknown |
    ts.TypeFlags.Any
  return typeCanHaveSomeOfFlags(context, type, falsyFlags)
}

export function isStandardLibraryType(
  context: TransformationContext,
  type: ts.Type,
  name: string | undefined
): boolean {
  const symbol = type.getSymbol()
  if (!symbol || (name != null ? symbol.name !== name : symbol.name === "__type")) {
    return false
  }

  const declaration = symbol.valueDeclaration
  if (!declaration) {
    return true
  }

  return isStandardLibraryDeclaration(context, declaration)
}

export function inferAssignedType(
  context: TransformationContext,
  expression: ts.Expression
): ts.Type {
  return (
    context.checker.getContextualType(expression) ?? context.checker.getTypeAtLocation(expression)
  )
}

export function getAllCallSignatures(type: ts.Type): readonly ts.Signature[] {
  return type.isUnion() ? type.types.flatMap(getAllCallSignatures) : type.getCallSignatures()
}
