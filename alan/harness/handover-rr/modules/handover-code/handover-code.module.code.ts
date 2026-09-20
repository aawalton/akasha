import { base64Url } from "akasha/code/type/narrowing/modules/base64-url/base64-url.module.code.ts"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { importPKCS8, importSPKI, type JWTPayload, jwtVerify, SignJWT } from "jose"

export const HANDOVER_ALG = "EdDSA"

export const HANDOVER_ISSUER = "https://alanwalton.com"

export const CODE_SECONDS = 30

export const CODE_SECONDS_CEILING = 60

const SIGNING_KEY_ENV = "HANDOVER_SIGNING_KEY"

const PUBLIC_KEY_ENV = "HANDOVER_PUBLIC_KEY"

type HandoverKey = Awaited<ReturnType<typeof importPKCS8>>

let signing: Promise<HandoverKey> | null = null

let reading: Promise<HandoverKey> | null = null

export function secondsNow(): number {
  return Math.floor(Date.now() / 1000)
}

function signingKey(): Promise<HandoverKey> {
  signing ??= importPKCS8(requireEnv(SIGNING_KEY_ENV), HANDOVER_ALG)
  return signing
}

function readingKey(): Promise<HandoverKey> {
  reading ??= importSPKI(requireEnv(PUBLIC_KEY_ENV), HANDOVER_ALG)
  return reading
}

export const CHALLENGE_CLAIM = "challenge"

const BYTES = new TextEncoder()

export async function challengeFor(verifier: string): Promise<string> {
  return base64Url(await crypto.subtle.digest("SHA-256", BYTES.encode(verifier)))
}

export type CodeAsked = {
  readonly audience: string
  readonly contributor: string
  readonly challenge: string | null
}

export type CodeShown = {
  readonly code: string
  readonly audience: string
  readonly verifier: string | null
}

export async function handoverCodeFor(asked: CodeAsked): Promise<string> {
  const now = secondsNow()
  const bound: JWTPayload = asked.challenge === null ? {} : { [CHALLENGE_CLAIM]: asked.challenge }
  return await new SignJWT(bound)
    .setProtectedHeader({ alg: HANDOVER_ALG, typ: "JWT" })
    .setIssuer(HANDOVER_ISSUER)
    .setAudience(asked.audience)
    .setSubject(asked.contributor)
    .setIssuedAt(now)
    .setNotBefore(now)
    .setExpirationTime(now + CODE_SECONDS)
    .setJti(crypto.randomUUID())
    .sign(await signingKey())
}

async function bindingHolds(claimed: unknown, verifier: string | null): Promise<boolean> {
  const challenge = textIn(claimed)
  if (challenge === null) return verifier === null
  if (verifier === null) return false
  return (await challengeFor(verifier)) === challenge
}

export async function contributorInCode(shown: CodeShown): Promise<string | null> {
  try {
    const read = await jwtVerify(shown.code, await readingKey(), {
      algorithms: [HANDOVER_ALG],
      issuer: HANDOVER_ISSUER,
      audience: shown.audience,
      clockTolerance: 0,
      requiredClaims: ["iss", "aud", "sub", "iat", "exp"],
    })
    const claims = read.payload
    if (claims.iss !== HANDOVER_ISSUER) return null
    if (claims.aud !== shown.audience) return null
    const issuedAt = claims.iat
    const expiresAt = claims.exp
    if (typeof issuedAt !== "number" || typeof expiresAt !== "number") return null
    if (expiresAt - issuedAt > CODE_SECONDS_CEILING) return null
    if (expiresAt - secondsNow() > CODE_SECONDS_CEILING) return null
    if (!(await bindingHolds(claims[CHALLENGE_CLAIM], shown.verifier))) return null
    return textIn(claims.sub)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    console.error(`a handover code would not read: ${why}`)
    return null
  }
}
