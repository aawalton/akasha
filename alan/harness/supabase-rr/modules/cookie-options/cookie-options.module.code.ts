import { z } from "zod"

const SCHEMA = z.string().optional()

export function parseSupabaseCookieOptions(
  env: string | undefined
): { domain: string } | undefined {
  const parsed = SCHEMA.parse(env)
  return parsed != null && parsed !== "" ? { domain: parsed } : undefined
}
