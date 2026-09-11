import type { SupabaseClient } from "@supabase/supabase-js"
import {
  getUser,
  getUserFromBearerToken,
  parseBearerToken,
} from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import {
  createBearerScopedClient,
  createServerClient,
} from "akasha/alan/harness/supabase-rr/server-client/server-client.module.code.ts"

export type AuthenticatedRequestContext = {
  authenticated: true
  supabase: SupabaseClient
  userId: string
  headers: Headers
}

export type AnonymousRequestContext = { authenticated: false; headers: Headers }

export type RequestContext = AuthenticatedRequestContext | AnonymousRequestContext

export async function bearerRequestContext(request: Request): Promise<RequestContext | null> {
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

export async function sessionRequestContext(request: Request): Promise<RequestContext> {
  const { user, headers } = await getUser(request)
  if (user == null) return { authenticated: false, headers }
  const { supabase, headers: dbHeaders } = createServerClient(request)
  for (const [key, value] of dbHeaders) headers.append(key, value)
  return { authenticated: true, supabase, userId: user.id, headers }
}

export async function resolveRequestContext(request: Request): Promise<RequestContext> {
  return (await bearerRequestContext(request)) ?? (await sessionRequestContext(request))
}
