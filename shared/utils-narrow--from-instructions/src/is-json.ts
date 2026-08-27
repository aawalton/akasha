import type { Json } from "@shared/supabase-database/generated/database"
import { JsonSchema } from "./json-schema"

export function isJson(value: unknown): value is Json {
  return JsonSchema.safeParse(value).success
}
