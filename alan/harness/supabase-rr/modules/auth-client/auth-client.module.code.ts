import {
  signInWithPassword as baseSignInWithPassword,
  signOut as baseSignOut,
  signUpWithPassword as baseSignUpWithPassword,
} from "akasha/alan/harness/supabase-auth/modules/auth/auth.module.code.ts"
import type { AuthResult } from "akasha/alan/harness/supabase-auth/supabase-user/supabase-user.module.code.ts"
import { getBrowserClient } from "akasha/alan/harness/supabase-rr/browser-client/browser-client.module.code.ts"

export function signInWithPassword(email: string, password: string): Promise<AuthResult> {
  return baseSignInWithPassword(getBrowserClient(), email, password)
}

export function signUpWithPassword(email: string, password: string): Promise<AuthResult> {
  return baseSignUpWithPassword(getBrowserClient(), email, password)
}

export function signOut(): Promise<{ error: Error | null }> {
  return baseSignOut(getBrowserClient())
}
