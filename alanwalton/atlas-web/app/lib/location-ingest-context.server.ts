import type { Database } from "../../../../shared/supabase-database/src/generated/database"
import { getUser, getUserFromBearerToken, parseBearerToken } from "@shared/supabase-rr/auth/server"
import { createBearerScopedClient, createServerClient } from "@shared/supabase-rr/server"
import type { SupabaseClient } from "@supabase/supabase-js"

export type LocationIngestSupabase = SupabaseClient<Database>

export type LocationIngestContext =
  | { authenticated: true; supabase: LocationIngestSupabase; userId: string; headers: Headers }
  | { authenticated: false; headers: Headers }

async function resolveBearerContext(request: Request): Promise<LocationIngestContext | null> {
  const token = parseBearerToken(request.headers.get("authorization"))
  if (token === null) return null
  const { user } = await getUserFromBearerToken(token)
  if (user == null) return { authenticated: false, headers: new Headers() }
  return {
    authenticated: true,
    supabase: createBearerScopedClient(token),
    userId: user.id,
    headers: new Headers(),
  }
}

export async function resolveLocationIngestContext(
  request: Request
): Promise<LocationIngestContext> {
  const bearer = await resolveBearerContext(request)
  if (bearer != null) return bearer

  const { user, headers } = await getUser(request)
  if (user == null) return { authenticated: false, headers }
  const { supabase, headers: dbHeaders } = createServerClient(request)
  for (const [key, value] of dbHeaders) headers.append(key, value)
  return { authenticated: true, supabase, userId: user.id, headers }
}
