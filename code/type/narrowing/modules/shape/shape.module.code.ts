import {
  array,
  discriminatedUnion,
  looseObject,
  object,
  record,
  tuple,
  union,
} from "akasha/code/type/narrowing/modules/shape-object/shape-object.module.code.ts"
import {
  booleanShape,
  coerceNumber,
  enumOf,
  json,
  literal,
  numberShape,
  stringShape,
  unknownShape,
} from "akasha/code/type/narrowing/modules/shape-scalar/shape-scalar.module.code.ts"

export const SHAPE = {
  string: stringShape,
  number: numberShape,
  boolean: booleanShape,
  unknown: unknownShape,
  literal,
  enum: enumOf,
  object,
  looseObject,
  array,
  tuple,
  record,
  union,
  discriminatedUnion,
  json,
  coerce: { number: coerceNumber },
} as const
