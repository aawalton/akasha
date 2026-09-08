import type { User } from "@supabase/supabase-js"

export type SupabaseUser = {
  id: string
  email: string | null
}

export type AuthResult = {
  user: SupabaseUser | null
  hasSession: boolean
  error: Error | null
}

export function toSupabaseUser(user: User): SupabaseUser {
  return {
    id: user.id,
    email: user.email ?? null,
  }
}
