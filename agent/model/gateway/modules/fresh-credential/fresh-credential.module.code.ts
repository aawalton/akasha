import { REFRESH_BUFFER_MS } from "akasha/agent/model/account/modules/oauth/model-account-oauth.module.code.ts"
import type { OAuthCredential } from "akasha/agent/model/account/modules/oauth-types/oauth-types.module.code.ts"

export type CredentialByAccount = (
  account: string,
  logPrefix?: string
) => Promise<OAuthCredential | null>

export type FreshCredentialSeams = {
  readonly logPrefix: string
  readonly credentialByAccount: CredentialByAccount
  readonly now: () => number
  readonly warned: (line: string) => undefined
}

export type FreshCredential = (account: string) => Promise<OAuthCredential | null>

export function expiredLine(logPrefix: string, account: string, expiresAt: number): string {
  const at = new Date(expiresAt).toISOString()
  return `${logPrefix} ${account} expired at ${at} and nothing here renews one — the upkeep has not reached it`
}

export function behindLine(logPrefix: string, account: string, expiresAt: number): string {
  const at = new Date(expiresAt).toISOString()
  return `${logPrefix} ${account} expires at ${at}, inside the reader's buffer — the upkeep is behind`
}

export type Expiry = "expired" | "behind" | "fresh"

export function expiryAt(expiresAt: number, now: number): Expiry {
  if (expiresAt <= now) return "expired"
  if (expiresAt < now + REFRESH_BUFFER_MS) return "behind"
  return "fresh"
}

export function freshCredentialIn(seams: FreshCredentialSeams): FreshCredential {
  return async function freshCredentialFor(account) {
    const held = await seams.credentialByAccount(account, seams.logPrefix)
    if (held === null) return null
    const expiry = expiryAt(held.expiresAt, seams.now())
    if (expiry === "expired") {
      seams.warned(expiredLine(seams.logPrefix, account, held.expiresAt))
      return null
    }
    if (expiry === "behind") {
      seams.warned(behindLine(seams.logPrefix, account, held.expiresAt))
    }
    return held
  }
}
