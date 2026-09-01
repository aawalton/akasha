import { z } from "zod"

const REQUIRED_KEYS = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] as const

const OPTIONAL_KEYS = ["NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN"] as const

const REQUIRED_SCHEMA = z.string().min(1)
const OPTIONAL_SCHEMA = z.string().optional()

export type SupabaseClientEnvDefine = Record<string, string>

export function supabaseClientEnvDefine(): SupabaseClientEnvDefine {
  const out: Record<string, string> = {}
  for (const key of REQUIRED_KEYS) {
    const value = REQUIRED_SCHEMA.safeParse(process.env[key])
    if (!value.success) {
      throw new Error(
        `supabaseClientEnvDefine: required env var ${key} is not set; the vite build cannot inline a value the client bundle needs at runtime`
      )
    }
    out[`process.env.${key}`] = JSON.stringify(value.data)
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
