import {
  signInWithPassword as baseSignInWithPassword,
  signOut as baseSignOut,
  signUpWithPassword as baseSignUpWithPassword,
} from "@akasha/supabase-auth/auth"
import type { AuthResult } from "@akasha/supabase-auth/supabase-user"
import { getBrowserClient } from "../browser-client/browser-client.module.code.ts"

export function signInWithPassword(email: string, password: string): Promise<AuthResult> {
  return baseSignInWithPassword(getBrowserClient(), email, password)
}

export function signUpWithPassword(email: string, password: string): Promise<AuthResult> {
  return baseSignUpWithPassword(getBrowserClient(), email, password)
}

export function signOut(): Promise<{ error: Error | null }> {
  return baseSignOut(getBrowserClient())
}
