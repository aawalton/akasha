import { getUser, getUserFromBearerToken, parseBearerToken } from "@akasha/supabase-rr/auth-server"
import { createBearerScopedClient, createServerClient } from "@akasha/supabase-rr/server-client"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { z } from "zod"
import { assertNotProtectedSaveUser } from "../../idle-protected-user/idle-protected-user.module.code.ts"

const optionalEnv = z.string().min(1).optional()
function readEnv(name: string): string | undefined {
  return optionalEnv.parse(process.env[name])
}

export type IdleSupabase = SupabaseClient

export type IdleSaveContext =
  | {
      authenticated: true
      supabase: IdleSupabase
      userId: string
      headers: Headers
      devTestUser?: true
    }
  | { authenticated: false; headers: Headers }

function devTestUserCreds(): { email: string; password: string } | null {
  if (readEnv("NODE_ENV") === "production") return null
  const email = readEnv("IDLE_TEST_USER_EMAIL")
  const password = readEnv("IDLE_TEST_USER_PASSWORD")
  if (email == null || password == null) return null
  return { email, password }
}

function devSupabaseUrl(): string {
  const url = readEnv("SUPABASE_URL") ?? readEnv("NEXT_PUBLIC_SUPABASE_URL")
  if (url == null) throw new Error("idle dev test-user: SUPABASE_URL is not set")
  return url
}

function devSupabaseAnonKey(): string {
  const key = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") ?? readEnv("SUPABASE_ANON_KEY")
  if (key == null) throw new Error("idle dev test-user: SUPABASE anon key is not set")
  return key
}

let devTestUserContext: Promise<{ supabase: IdleSupabase; userId: string }> | null = null

async function getDevTestUserContext(creds: {
  email: string
  password: string
}): Promise<{ supabase: IdleSupabase; userId: string }> {
  const supabase = createClient(devSupabaseUrl(), devSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: true },
  })
  const { data, error } = await supabase.auth.signInWithPassword(creds)
  if (error != null || data.user == null) {
    throw new Error(`idle dev test-user sign-in failed: ${error?.message ?? "no user returned"}`)
  }
  assertNotProtectedSaveUser(data.user.id)
  return { supabase, userId: data.user.id }
}

async function resolveBearerContext(request: Request): Promise<IdleSaveContext | null> {
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

export async function resolveIdleSaveContext(request: Request): Promise<IdleSaveContext> {
  const creds = devTestUserCreds()
  if (creds != null) {
    if (devTestUserContext == null) devTestUserContext = getDevTestUserContext(creds)
    const { supabase, userId } = await devTestUserContext
    return { authenticated: true, supabase, userId, headers: new Headers(), devTestUser: true }
  }

  const bearer = await resolveBearerContext(request)
  if (bearer != null) return bearer

  const { user, headers } = await getUser(request)
  if (user == null) return { authenticated: false, headers }
  const { supabase, headers: dbHeaders } = createServerClient(request)
  for (const [key, value] of dbHeaders) headers.append(key, value)
  return { authenticated: true, supabase, userId: user.id, headers }
}
