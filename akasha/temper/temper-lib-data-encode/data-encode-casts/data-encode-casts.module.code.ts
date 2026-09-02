import type {
  DecodeInstance,
  LdeValue,
  LdeValueArray,
  LuaArray,
  OptionalNumber,
} from "../data-encode-types/data-encode-types.module.code.ts"

export type DecoderMethod = (this: void, self: DecodeInstance, controlChar: string) => unknown

export function asLuaArray(value: unknown): LuaArray {
  return value as LuaArray
}

export function asLdeValue(value: unknown): LdeValue {
  return value as LdeValue
}

export function asOptionalNumber(value: unknown): OptionalNumber {
  return value as OptionalNumber
}

export function asLdeValueArray(value: unknown): LdeValueArray {
  return value as LdeValueArray
}

export function asDecoderMethod(value: unknown): DecoderMethod {
  return value as DecoderMethod
}
