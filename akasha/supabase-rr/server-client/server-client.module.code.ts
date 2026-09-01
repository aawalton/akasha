import { createServerClient as createSsrServerClient } from "@supabase/ssr"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { parseCookie, stringifySetCookie } from "cookie"
import { z } from "zod"
import { parseSupabaseCookieOptions } from "../cookie-options/cookie-options.module.code.ts"

export type SupabaseServerClient = SupabaseClient

export type CreateServerClientOptions = {
  url?: string
  anonKey?: string
}

export function createServerClient(
  request: Request,
  options: CreateServerClientOptions = {}
): { supabase: SupabaseServerClient; headers: Headers } {
  const url = options.url ?? z.string().optional().parse(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const anonKey =
    options.anonKey ?? z.string().optional().parse(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  if (url == null) {
    throw new Error("createServerClient: NEXT_PUBLIC_SUPABASE_URL is not set")
  }
  if (anonKey == null) {
    throw new Error("createServerClient: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set")
  }

  const cookieHeader = request.headers.get("cookie") ?? ""
  const cookies = parseCookie(cookieHeader)
  const cookieEntries: { name: string; value: string }[] = []
  for (const [name, value] of Object.entries(cookies)) {
    if (value != null) cookieEntries.push({ name, value })
  }

  const headers = new Headers()

  const supabase = createSsrServerClient(url, anonKey, {
    cookieOptions: parseSupabaseCookieOptions(process.env.NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN),
    cookies: {
      getAll() {
        return cookieEntries
      },
      setAll(cookiesToSet, extraHeaders) {
        for (const { name, value, options: cookieOptions } of cookiesToSet) {
          headers.append("Set-Cookie", stringifySetCookie(name, value, cookieOptions))
        }
        for (const [key, value] of Object.entries(extraHeaders)) {
          headers.set(key, value)
        }
      },
    },
  })

  return { supabase, headers }
}

export function bearerScopedClientOptions(token: string): {
  global: { headers: { Authorization: string } }
  auth: { persistSession: false; autoRefreshToken: false; detectSessionInUrl: false }
} {
  return {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  }
}

export function createBearerScopedClient(token: string): SupabaseServerClient {
  const url = z.string().optional().parse(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const anonKey = z.string().optional().parse(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  if (url == null) {
    throw new Error("createBearerScopedClient: NEXT_PUBLIC_SUPABASE_URL is not set")
  }
  if (anonKey == null) {
    throw new Error("createBearerScopedClient: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set")
  }
  return createClient(url, anonKey, bearerScopedClientOptions(token))
}
