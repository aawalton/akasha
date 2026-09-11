import type { SupabaseUser } from "akasha/alan/harness/supabase-auth/supabase-user/supabase-user.module.code.ts"
import { z } from "zod"

const claimsUserSchema = z.object({
  sub: z.string(),
  email: z.string().optional(),
})

export function parseClaimsToUser(rawClaims: unknown): SupabaseUser | null {
  const parsed = claimsUserSchema.safeParse(rawClaims)
  if (!parsed.success) return null
  return { id: parsed.data.sub, email: parsed.data.email ?? null }
}
