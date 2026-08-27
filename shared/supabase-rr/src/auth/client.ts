import { signInWithPassword as baseSignInWithPassword, signOut as baseSignOut, signUpWithPassword as baseSignUpWithPassword } from "../../../supabase-auth/src/auth"
import { type AuthResult } from "../../../supabase-auth/src/types"
import { getBrowserClient } from "../browser"

export function signInWithPassword(email: string, password: string): Promise<AuthResult> {
  return baseSignInWithPassword(getBrowserClient(), email, password)
}

export function signUpWithPassword(email: string, password: string): Promise<AuthResult> {
  return baseSignUpWithPassword(getBrowserClient(), email, password)
}

export function signOut(): Promise<{ error: Error | null }> {
  return baseSignOut(getBrowserClient())
}
