import type { Json } from "akasha/util/narrow/modules/json-value/json-value.module.code.ts"

export function asJson(value: unknown): Json {
  return value as Json
}
