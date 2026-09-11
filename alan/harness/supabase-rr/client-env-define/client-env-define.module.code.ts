import type { Plugin } from "vite"
import { z } from "zod"

const REQUIRED_KEYS = ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY"] as const

const REQUIRED_SCHEMA = z.string().min(1)

function refuseUnsetClientEnv(): undefined {
  for (const key of REQUIRED_KEYS) {
    if (!REQUIRED_SCHEMA.safeParse(process.env[key]).success) {
      throw new Error(
        `supabaseClientEnvDefine: ${key} is empty — the bundle would ship with an un-inlined client env (compiles to undefined). Set it before building.`
      )
    }
  }
}

export function supabaseClientEnvGuard(): Plugin {
  return {
    name: "supabase-client-env-guard",
    apply: "build",
    buildStart() {
      refuseUnsetClientEnv()
    },
  }
}
