import { createPublicKey, verify as cryptoVerify } from "node:crypto"
import { z } from "zod"
import { CONFIG } from "../auth-proxy-config/auth-proxy-config.module.code.ts"
import { parseSupabaseCookieMatch } from "../cookie-match-core/cookie-match-core.module.code.ts"
import { hashKey, makeTTLCache } from "../ttl-cache/ttl-cache.module.code.ts"

export interface Identity {
  sub: string
  email: string
  name: string
}

const sessionCache = makeTTLCache<Identity | null>(CONFIG.CACHE_MAX_ENTRIES)

function extractSupabaseCookieValue(cookieHeader: string): string | null {
  const chunks: Array<{ idx: number; value: string }> = []
  for (const pair of cookieHeader.split(";")) {
    const eqIdx = pair.indexOf("=")
    if (eqIdx === -1) continue
    const key = pair.slice(0, eqIdx).trim()
    const captured = parseSupabaseCookieMatch(key)
    if (!captured) continue
    const [chunkIdx] = captured
    const idx = chunkIdx != null ? Number(chunkIdx) : 0
    chunks.push({ idx, value: pair.slice(eqIdx + 1).trim() })
  }
  if (chunks.length === 0) return null
  chunks.sort((a, b) => a.idx - b.idx)
  return chunks.map((c) => c.value).join("")
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const SessionCookieSchema = z.unknown()

function extractAccessToken(rawCookieValue: string): string | null {
  try {
    const outer = decodeURIComponent(rawCookieValue)
    let json: string
    if (outer.startsWith("base64-")) {
      const b64 = outer.slice("base64-".length)
      json = Buffer.from(b64, "base64").toString("utf8")
    } else {
      json = outer
    }
    const parsed: unknown = SessionCookieSchema.parse(JSON.parse(json))
    if (!isRecord(parsed)) return null
    const token = parsed.access_token
    return typeof token === "string" && token.length > 0 ? token : null
  } catch {
    return null
  }
}

interface Jwk {
  kty: string
  kid?: string
  alg?: string
  use?: string
  n?: string
  e?: string
}

interface JwksResponse {
  keys: readonly Jwk[]
}

function isJwk(value: unknown): value is Jwk {
  return isRecord(value) && typeof value.kty === "string"
}

function isJwksResponse(value: unknown): value is JwksResponse {
  return isRecord(value) && Array.isArray(value.keys) && value.keys.every(isJwk)
}

let jwksCache: { value: JwksResponse; expiresAt: number } | null = null

async function getJwks(forceRefresh = false): Promise<JwksResponse> {
  const now = Date.now()
  if (!forceRefresh && jwksCache && jwksCache.expiresAt > now) {
    return jwksCache.value
  }
  const res = await fetch(CONFIG.SUPABASE_JWKS_URL, {
    signal: AbortSignal.timeout(CONFIG.SESSION_FETCH_TIMEOUT_MS),
  })
  if (!res.ok) {
    throw new Error(`JWKS fetch failed: ${res.status}`)
  }
  const data: unknown = await res.json()
  if (!isJwksResponse(data)) {
    throw new Error("JWKS response missing keys[]")
  }
  jwksCache = { value: data, expiresAt: now + CONFIG.JWKS_CACHE_TTL_MS }
  return data
}

function findKey(jwks: JwksResponse, kid: string | undefined): Jwk | undefined {
  if (kid == null) {
    return jwks.keys.length === 1 ? jwks.keys[0] : undefined
  }
  return jwks.keys.find((k) => k.kid === kid)
}

function base64UrlDecode(input: string): Buffer {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4))
  const b64 = (input + pad).replace(/-/g, "+").replace(/_/g, "/")
  return Buffer.from(b64, "base64")
}

interface JwtHeader {
  alg?: string
  kid?: string
  typ?: string
}

interface JwtClaims {
  sub?: string
  iss?: string
  aud?: string | readonly string[]
  exp?: number
  email?: string
  user_metadata?: { name?: string }
}

interface VerifiedJwtClaims extends JwtClaims {
  sub: string
  exp: number
}

function isJwtHeader(value: unknown): value is JwtHeader {
  if (!isRecord(value)) return false
  if (value.alg !== undefined && typeof value.alg !== "string") return false
  if (value.kid !== undefined && typeof value.kid !== "string") return false
  if (value.typ !== undefined && typeof value.typ !== "string") return false
  return true
}

function isJwtClaims(value: unknown): value is JwtClaims {
  if (!isRecord(value)) return false
  if (value.sub !== undefined && typeof value.sub !== "string") return false
  if (value.iss !== undefined && typeof value.iss !== "string") return false
  if (
    value.aud !== undefined &&
    typeof value.aud !== "string" &&
    !(Array.isArray(value.aud) && value.aud.every((a) => typeof a === "string"))
  ) {
    return false
  }
  if (value.exp !== undefined && typeof value.exp !== "number") return false
  if (value.email !== undefined && typeof value.email !== "string") return false
  if (value.user_metadata !== undefined && !isRecord(value.user_metadata)) return false
  return true
}

async function verifyJwt(token: string): Promise<VerifiedJwtClaims | null> {
  const parts = token.split(".")
  if (parts.length !== 3) return null
  const [headerB64, payloadB64, signatureB64] = parts
  if (headerB64 === undefined || payloadB64 === undefined || signatureB64 === undefined) {
    return null
  }

  let header: JwtHeader
  let claims: JwtClaims
  try {
    const headerParsed: unknown = z
      .unknown()
      .parse(JSON.parse(base64UrlDecode(headerB64).toString("utf8")))
    const claimsParsed: unknown = z
      .unknown()
      .parse(JSON.parse(base64UrlDecode(payloadB64).toString("utf8")))
    if (!isJwtHeader(headerParsed)) return null
    if (!isJwtClaims(claimsParsed)) return null
    header = headerParsed
    claims = claimsParsed
  } catch {
    return null
  }

  if (header.alg !== "RS256") return null

  let jwks = await getJwks()
  let jwk = findKey(jwks, header.kid)
  if (!jwk) {
    jwks = await getJwks(true)
    jwk = findKey(jwks, header.kid)
    if (!jwk) return null
  }

  let publicKey: ReturnType<typeof createPublicKey>
  try {
    publicKey = createPublicKey({ key: jwk, format: "jwk" })
  } catch {
    return null
  }

  const signingInput = Buffer.from(`${headerB64}.${payloadB64}`, "utf8")
  const signature = base64UrlDecode(signatureB64)
  const ok = cryptoVerify("RSA-SHA256", signingInput, publicKey, signature)
  if (!ok) return null

  const nowMs = Date.now()
  const exp = claims.exp
  if (typeof exp !== "number") return null
  if (exp * 1000 + CONFIG.JWT_CLOCK_SKEW_MS < nowMs) return null
  if (claims.iss !== CONFIG.SUPABASE_JWT_ISSUER) return null
  const aud = claims.aud
  const audOk = Array.isArray(aud)
    ? aud.includes(CONFIG.SUPABASE_JWT_AUDIENCE)
    : aud === CONFIG.SUPABASE_JWT_AUDIENCE
  if (!audOk) return null
  const sub = claims.sub
  if (typeof sub !== "string" || sub.length === 0) return null

  return { ...claims, sub, exp }
}

function claimsToIdentity(claims: VerifiedJwtClaims): Identity {
  const sub = claims.sub
  const email = typeof claims.email === "string" ? claims.email : ""
  const metaName = claims.user_metadata?.name
  const name =
    typeof metaName === "string" && metaName.length > 0
      ? metaName
      : (() => {
          const local = email.split("@")[0]
          return local != null && local.length > 0 ? local : sub
        })()
  return { sub, email, name }
}

export async function validateSession(cookieHeader: string): Promise<Identity | null> {
  const raw = extractSupabaseCookieValue(cookieHeader)
  if (raw == null) return null

  const accessToken = extractAccessToken(raw)
  if (accessToken == null) return null

  return validateAccessToken(accessToken)
}

export async function validateAccessToken(accessToken: string): Promise<Identity | null> {
  const key = await hashKey(accessToken)
  const cached = sessionCache.get(key)
  if (cached !== undefined) return cached.value

  const claims = await verifyJwt(accessToken).catch(() => null)
  const identity = claims ? claimsToIdentity(claims) : null

  if (identity != null && claims?.exp != null) {
    const expMs = claims.exp * 1000
    const untilExpMs = Math.max(0, expMs - Date.now())
    const ttl = Math.min(untilExpMs, CONFIG.CACHE_POSITIVE_TTL_MS)
    sessionCache.set(key, identity, ttl)
  } else {
    sessionCache.set(key, identity, CONFIG.CACHE_NEGATIVE_TTL_MS)
  }
  return identity
}
