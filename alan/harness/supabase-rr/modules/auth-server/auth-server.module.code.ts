import { createClient } from "@supabase/supabase-js"
import { getUserFromToken as baseGetUserFromToken } from "akasha/alan/harness/supabase-auth/modules/auth/auth.module.code.ts"
import type { SupabaseUser } from "akasha/alan/harness/supabase-auth/supabase-user/supabase-user.module.code.ts"
import { resolveRequestSession } from "akasha/alan/harness/supabase-rr/request-session-cache/request-session-cache.module.code.ts"
import { z } from "zod"

export async function getUser(
  request: Request
): Promise<{ user: SupabaseUser | null; headers: Headers }> {
  return resolveRequestSession(request)
}

export async function getUserFromBearerToken(jwt: string): Promise<{ user: SupabaseUser | null }> {
  const url = z
    .string()
    .optional()
    .parse(import.meta.env.VITE_SUPABASE_URL)
  const anonKey = z
    .string()
    .optional()
    .parse(import.meta.env.VITE_SUPABASE_ANON_KEY)
  if (url == null) {
    throw new Error("getUserFromBearerToken: VITE_SUPABASE_URL is not set")
  }
  if (anonKey == null) {
    throw new Error("getUserFromBearerToken: VITE_SUPABASE_ANON_KEY is not set")
  }

  const client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  const user = await baseGetUserFromToken(client, jwt)
  return { user }
}

const BEARER_PREFIX = "bearer "

export function parseBearerToken(authHeader: string | null): string | null {
  if (authHeader?.toLowerCase().startsWith(BEARER_PREFIX) !== true) return null
  return authHeader.slice(BEARER_PREFIX.length)
}

export async function resolveRequestUser(
  request: Request
): Promise<{ user: SupabaseUser | null; headers: Headers }> {
  const token = parseBearerToken(request.headers.get("authorization"))
  if (token !== null) {
    const { user } = await getUserFromBearerToken(token)
    return { user, headers: new Headers() }
  }
  return getUser(request)
}
