import type { Json } from "@akasha/supabase-database/json"
import { JsonSchema } from "../json-schema/json-schema.module.code.ts"

export function isJson(value: unknown): value is Json {
  return JsonSchema.safeParse(value).success
}
