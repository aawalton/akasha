import type { SupabaseUser } from "@akasha/supabase-auth/supabase-user"
import {
  getRequestServerClient,
  resolveRequestSession,
} from "../request-session-cache/request-session-cache.module.code.ts"
import type { SupabaseServerClient } from "../server-client/server-client.module.code.ts"

export async function refreshSession(
  request: Request
): Promise<{ supabase: SupabaseServerClient; headers: Headers; user: SupabaseUser | null }> {
  const { supabase, headers } = getRequestServerClient(request)
  const { user } = await resolveRequestSession(request)
  return { supabase, headers, user }
}
