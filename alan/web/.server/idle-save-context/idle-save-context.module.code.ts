import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { assertCredentialPathAllowed } from "akasha/alan/harness/supabase-auth/protected-user/protected-user.module.code.ts"
import {
  type AnonymousRequestContext,
  type AuthenticatedRequestContext,
  resolveRequestContext,
} from "akasha/alan/harness/supabase-rr/request-context/request-context.module.code.ts"
import { z } from "zod"

const optionalEnv = z.string().min(1).optional()
function readEnv(name: string): string | undefined {
  return optionalEnv.parse(process.env[name])
}

export type IdleSupabase = SupabaseClient

export type IdleSaveContext =
  | (AuthenticatedRequestContext & { devTestUser?: true })
  | AnonymousRequestContext

function devTestUserCreds(): { email: string; password: string } | null {
  if (readEnv("NODE_ENV") === "production") return null
  const email = readEnv("IDLE_TEST_USER_EMAIL")
  const password = readEnv("IDLE_TEST_USER_PASSWORD")
  if (email == null || password == null) return null
  return { email, password }
}

function devSupabaseUrl(): string {
  const url = readEnv("SUPABASE_URL")
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
  assertCredentialPathAllowed({ resolvedUserId: data.user.id })
  return { supabase, userId: data.user.id }
}

export async function resolveIdleSaveContext(request: Request): Promise<IdleSaveContext> {
  const creds = devTestUserCreds()
  if (creds != null) {
    if (devTestUserContext == null) devTestUserContext = getDevTestUserContext(creds)
    const { supabase, userId } = await devTestUserContext
    return { authenticated: true, supabase, userId, headers: new Headers(), devTestUser: true }
  }

  return resolveRequestContext(request)
}
