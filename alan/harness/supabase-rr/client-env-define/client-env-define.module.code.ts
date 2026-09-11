import { z } from "zod"

const REQUIRED_KEYS = ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY"] as const

const INLINED_KEYS = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] as const

const OPTIONAL_KEYS = ["NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN"] as const

const REQUIRED_SCHEMA = z.string().min(1)
const OPTIONAL_SCHEMA = z.string().optional()

export type SupabaseClientEnvDefine = Record<string, string>

export function supabaseClientEnvDefine(): SupabaseClientEnvDefine {
  for (const key of REQUIRED_KEYS) {
    if (!REQUIRED_SCHEMA.safeParse(process.env[key]).success) {
      throw new Error(
        `supabaseClientEnvDefine: ${key} is empty — the bundle would ship with an un-inlined client env (compiles to undefined). Set it before building.`
      )
    }
  }
  const out: Record<string, string> = {}
  for (const key of INLINED_KEYS) {
    out[`process.env.${key}`] = JSON.stringify(OPTIONAL_SCHEMA.parse(process.env[key]) ?? "")
  }
  for (const key of OPTIONAL_KEYS) {
    const value = OPTIONAL_SCHEMA.parse(process.env[key])
    out[`process.env.${key}`] = JSON.stringify(value)
  }
  out["process.env.NEXT_PUBLIC_API_ORIGIN"] = JSON.stringify(
    OPTIONAL_SCHEMA.parse(process.env.NEXT_PUBLIC_API_ORIGIN) ?? ""
  )
  return out
}
