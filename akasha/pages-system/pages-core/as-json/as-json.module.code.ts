import type { Json } from "@akasha/supabase-database/json"

export function asJson(value: unknown): Json {
  return value as Json
}
