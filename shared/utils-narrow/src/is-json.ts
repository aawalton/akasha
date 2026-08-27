import type { Json } from "../../supabase-database/src/generated/database"
import { JsonSchema } from "./json-schema"

export function isJson(value: unknown): value is Json {
  return JsonSchema.safeParse(value).success
}
