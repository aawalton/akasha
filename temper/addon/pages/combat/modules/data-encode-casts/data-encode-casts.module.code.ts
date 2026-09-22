import type {
  DecodeInstance,
  EncodedValue,
  EncodedValueArray,
  LuaArray,
} from "akasha/temper/addon/pages/combat/modules/data-encode-types/data-encode-types.module.code.ts"

export type DecoderMethod = (this: void, self: DecodeInstance, controlChar: string) => unknown

export function asLuaArray(value: unknown): LuaArray {
  return value as LuaArray
}

export function asEncodedValue(value: unknown): EncodedValue {
  return value as EncodedValue
}

export function asEncodedValueArray(value: unknown): EncodedValueArray {
  return value as EncodedValueArray
}

export function asDecoderMethod(value: unknown): DecoderMethod {
  return value as DecoderMethod
}
