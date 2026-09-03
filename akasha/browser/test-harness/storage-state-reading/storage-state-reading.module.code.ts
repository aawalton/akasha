import type { Infer } from "@akasha/utils-narrow/shape-core"
import { shape } from "@tools/lib/shape"

export const JWT_FRESHNESS_MARGIN_MS = 10 * 60 * 1000

const COOKIE_CHUNK_LIMIT = 3180

const CookieSchema = shape
  .object({
    name: shape.string(),
    value: shape.string(),
  })
  .passthrough()

const StorageStateSchema = shape
  .object({
    cookies: shape.array(CookieSchema).default([]),
    origins: shape.array(shape.unknown()).default([]),
  })
  .passthrough()

export type StorageState = Infer<typeof StorageStateSchema>

const AuthSessionSchema = shape
  .object({
    access_token: shape.string(),
    refresh_token: shape.string(),
  })
  .passthrough()

export type AuthSession = Infer<typeof AuthSessionSchema>

export const RefreshedTokensSchema = shape
  .object({
    access_token: shape.string(),
    refresh_token: shape.string(),
    expires_in: shape.number(),
    expires_at: shape.number().optional(),
  })
  .passthrough()

export type RefreshedTokens = Infer<typeof RefreshedTokensSchema>

export type StorageStateClassification =
  | { kind: "fresh"; jwtExpIso: string; session: AuthSession }
  | { kind: "needs-refresh"; jwtExpIso: string; session: AuthSession }
  | { kind: "needs-export"; reason: string }

const JwtPayloadSchema = shape.object({ exp: shape.number() }).passthrough()

function decodeJwtExpMs(accessToken: string): number | null {
  const parts = accessToken.split(".")
  const payload = parts[1]
  if (parts.length !== 3 || payload === undefined) return null
  try {
    const json = Buffer.from(payload, "base64url").toString("utf8")
    const parsed = JwtPayloadSchema.safeParse(JSON.parse(json))
    return parsed.success ? parsed.data.exp * 1000 : null
  } catch {
    return null
  }
}

const AUTH_COOKIE_PATTERN = /^sb-.*-auth-token(\.\d+)?$/
const CHUNK_SUFFIX_RE = /\.(\d+)$/
const CHUNK_SUFFIX_MATCH_SCHEMA = shape.tuple([shape.string(), shape.string()])

function assembleAuthCookieValue(state: StorageState): string | null {
  const parts = state.cookies
    .filter((c) => AUTH_COOKIE_PATTERN.test(c.name))
    .map((c) => {
      const chunkMatch = CHUNK_SUFFIX_MATCH_SCHEMA.safeParse(CHUNK_SUFFIX_RE.exec(c.name))
      return {
        index: chunkMatch.success ? Number(chunkMatch.data[1]) : 0,
        value: c.value,
      }
    })
    .sort((a, b) => a.index - b.index)
  if (parts.length === 0) return null
  return parts.map((p) => p.value).join("")
}

function decodeAuthCookieValue(value: string): AuthSession | null {
  try {
    const json = value.startsWith("base64-")
      ? Buffer.from(value.slice("base64-".length), "base64").toString("utf8")
      : decodeURIComponent(value)
    const parsed = AuthSessionSchema.safeParse(JSON.parse(json))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function classifyPlaywrightStorageState(
  rawContents: string,
  nowMs: number
): StorageStateClassification {
  let state: StorageState
  try {
    const parsed = StorageStateSchema.safeParse(JSON.parse(rawContents))
    if (!parsed.success) return { kind: "needs-export", reason: "not a storage-state shape" }
    state = parsed.data
  } catch {
    return { kind: "needs-export", reason: "file is not valid JSON" }
  }
  const cookieValue = assembleAuthCookieValue(state)
  if (cookieValue === null) {
    return { kind: "needs-export", reason: "no sb-*-auth-token cookie (unauthenticated stub)" }
  }
  const session = decodeAuthCookieValue(cookieValue)
  if (session === null) {
    return { kind: "needs-export", reason: "auth cookie value did not decode to a session" }
  }
  const expMs = decodeJwtExpMs(session.access_token)
  if (expMs === null) {
    return { kind: "needs-export", reason: "access token JWT payload did not decode" }
  }
  const jwtExpIso = new Date(expMs).toISOString()
  if (expMs > nowMs + JWT_FRESHNESS_MARGIN_MS) return { kind: "fresh", jwtExpIso, session }
  return { kind: "needs-refresh", jwtExpIso, session }
}

export type RewriteResult = { ok: true; contents: string } | { ok: false; reason: string }

export function applyRefreshedSessionToStorageState(
  rawContents: string,
  refreshed: RefreshedTokens,
  nowMs: number
): RewriteResult {
  const parsed = StorageStateSchema.safeParse(JSON.parse(rawContents))
  if (!parsed.success) return { ok: false, reason: "not a storage-state shape" }
  const state = parsed.data
  const authCookies = state.cookies.filter((c) => AUTH_COOKIE_PATTERN.test(c.name))
  const target = authCookies[0]
  if (authCookies.length !== 1 || target === undefined) {
    return { ok: false, reason: `expected exactly 1 auth cookie, found ${authCookies.length}` }
  }
  if (!target.value.startsWith("base64-")) {
    return { ok: false, reason: "auth cookie is not base64-encoded; deferring to full export" }
  }
  const session = decodeAuthCookieValue(target.value)
  if (session === null) {
    return { ok: false, reason: "auth cookie value did not decode to a session" }
  }
  const nextSession = {
    ...session,
    access_token: refreshed.access_token,
    refresh_token: refreshed.refresh_token,
    expires_in: refreshed.expires_in,
    expires_at: refreshed.expires_at ?? Math.floor(nowMs / 1000) + refreshed.expires_in,
  }
  const nextValue = `base64-${Buffer.from(JSON.stringify(nextSession), "utf8").toString("base64")}`
  if (nextValue.length > COOKIE_CHUNK_LIMIT) {
    return { ok: false, reason: "rewritten cookie would exceed the chunk limit" }
  }
  const nextCookies = state.cookies.map((c) => (c === target ? { ...c, value: nextValue } : c))
  return { ok: true, contents: JSON.stringify({ ...state, cookies: nextCookies }) }
}
