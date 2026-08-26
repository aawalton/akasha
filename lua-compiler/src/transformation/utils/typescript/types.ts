import * as ts from "typescript"
import type { TransformationContext } from "../../context/transformation-context"

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
