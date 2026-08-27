import type { SupabaseUser } from "../../supabase-auth/src/types"
import { getRequestServerClient, resolveRequestSession } from "./request-session-cache"
import type { SupabaseServerClient } from "./server"

export async function refreshSession(
  request: Request
): Promise<{ supabase: SupabaseServerClient; headers: Headers; user: SupabaseUser | null }> {
  const { supabase, headers } = getRequestServerClient(request)
  const { user } = await resolveRequestSession(request)
  return { supabase, headers, user }
}
