import { secondsNow } from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { type Cookie, createCookie } from "react-router"

export const SESSION_COOKIE_NAME = "__Host-handover"

export const SESSION_SECONDS = 60 * 60 * 24 * 14

const AHEAD_SECONDS = 60

export type HandoverHeld = {
  readonly contributor: string
  readonly issuedAt: number
}

const made = new Map<string, Cookie>()

export function sessionCookie(site: HandoverSite): Cookie {
  const held = made.get(site.name)
  if (held !== undefined) return held
  const cookie = createCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
    secrets: [requireEnv(site.sessionKeyEnv)],
  })
  made.set(site.name, cookie)
  return cookie
}

export function heldIn(value: unknown): HandoverHeld | null {
  if (value === null || typeof value !== "object") return null
  const said = value as { readonly contributor?: unknown; readonly issuedAt?: unknown }
  const contributor = textIn(said.contributor)
  if (contributor === null) return null
  const issuedAt = said.issuedAt
  if (typeof issuedAt !== "number" || !Number.isFinite(issuedAt)) return null
  const now = secondsNow()
  if (issuedAt > now + AHEAD_SECONDS) return null
  if (now - issuedAt > SESSION_SECONDS) return null
  return { contributor, issuedAt }
}

export async function signedInAs(site: HandoverSite, request: Request): Promise<string | null> {
  let read: unknown
  try {
    read = await sessionCookie(site).parse(request.headers.get("cookie"))
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    console.error(`a session cookie would not read: ${why}`)
    return null
  }
  return heldIn(read)?.contributor ?? null
}

export async function signedInCookie(site: HandoverSite, contributor: string): Promise<string> {
  const held: HandoverHeld = { contributor, issuedAt: secondsNow() }
  return await sessionCookie(site).serialize(held)
}

export async function signedOutCookie(site: HandoverSite): Promise<string> {
  return await sessionCookie(site).serialize("", { maxAge: 0 })
}
