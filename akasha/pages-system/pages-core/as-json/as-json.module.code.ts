import type { Json } from "@akasha/utils-narrow/json-value"

export function asJson(value: unknown): Json {
  return value as Json
}
