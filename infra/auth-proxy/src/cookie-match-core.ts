import { z } from "zod"

const SB_COOKIE_RE = /^sb-[^=]*-auth-token(?:\.(\d+))?$/

const SB_COOKIE_MATCH_SCHEMA = z.tuple([z.string(), z.string().optional()]).nullable()

export function parseSupabaseCookieMatch(key: string): readonly [string | undefined] | null {
  const result = SB_COOKIE_MATCH_SCHEMA.parse(key.match(SB_COOKIE_RE))
  if (result === null) return null
  return [result[1]]
}
