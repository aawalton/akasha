import type { SupabaseClient } from "@supabase/supabase-js"
import {
  type RequestContext,
  resolveRequestContext,
} from "akasha/alan/harness/supabase-rr/request-context/request-context.module.code.ts"

export type LocationIngestSupabase = SupabaseClient

export type LocationIngestContext = RequestContext

export async function resolveLocationIngestContext(
  request: Request
): Promise<LocationIngestContext> {
  return resolveRequestContext(request)
}
