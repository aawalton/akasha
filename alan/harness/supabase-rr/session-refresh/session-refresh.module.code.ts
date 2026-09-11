import type { SupabaseUser } from "akasha/alan/harness/supabase-auth/supabase-user/supabase-user.module.code.ts"
import {
  getRequestServerClient,
  resolveRequestSession,
} from "akasha/alan/harness/supabase-rr/request-session-cache/request-session-cache.module.code.ts"
import type { SupabaseServerClient } from "akasha/alan/harness/supabase-rr/server-client/server-client.module.code.ts"

export async function refreshSession(
  request: Request
): Promise<{ supabase: SupabaseServerClient; headers: Headers; user: SupabaseUser | null }> {
  const { supabase, headers } = getRequestServerClient(request)
  const { user } = await resolveRequestSession(request)
  return { supabase, headers, user }
}
