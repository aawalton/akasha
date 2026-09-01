import type { Json } from "@akasha/supabase-database/json"
import { JsonSchema } from "./json-schema"

export function isJson(value: unknown): value is Json {
  return JsonSchema.safeParse(value).success
}
