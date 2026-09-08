import type { SupabaseClient } from "@supabase/supabase-js"
import { parseClaimsToUser } from "../claims/claims.module.code.ts"
import {
  type AuthResult,
  type SupabaseUser,
  toSupabaseUser,
} from "../supabase-user/supabase-user.module.code.ts"

export function isInvalidCredentialsError(error: unknown): boolean {
  if (typeof error === "string") return /invalid (login )?credentials/i.test(error)
  if (typeof error !== "object" || error === null) return false
  if ("code" in error && error.code === "invalid_credentials") return true
  if (error instanceof Error) return /invalid (login )?credentials/i.test(error.message)
  return false
}

export async function signInWithPassword(
  client: SupabaseClient,
  email: string,
  password: string
): Promise<AuthResult> {
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) return { user: null, hasSession: false, error }
  return {
    user: data.user ? toSupabaseUser(data.user) : null,
    hasSession: data.session != null,
    error: null,
  }
}

export async function signUpWithPassword(
  client: SupabaseClient,
  email: string,
  password: string
): Promise<AuthResult> {
  const { data, error } = await client.auth.signUp({ email, password })
  if (error) return { user: null, hasSession: false, error }
  return {
    user: data.user ? toSupabaseUser(data.user) : null,
    hasSession: data.session != null,
    error: null,
  }
}

export async function signOut(client: SupabaseClient): Promise<{ error: Error | null }> {
  const { error } = await client.auth.signOut()
  return { error: error ?? null }
}

export async function getClaimsUser(client: SupabaseClient): Promise<SupabaseUser | null> {
  const { data, error } = await client.auth.getClaims()
  if (error != null || data == null) return null
  return parseClaimsToUser(data.claims)
}

export async function getUserFromToken(
  client: SupabaseClient,
  jwt: string
): Promise<SupabaseUser | null> {
  const { data, error } = await client.auth.getUser(jwt)
  if (error || !data.user) return null
  return toSupabaseUser(data.user)
}
