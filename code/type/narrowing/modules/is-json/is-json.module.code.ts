import { JsonSchema } from "akasha/code/type/narrowing/modules/json-schema/json-schema.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"

export function isJson(value: unknown): value is Json {
  return JsonSchema.safeParse(value).success
}
