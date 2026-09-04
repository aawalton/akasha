import { REFRESH_BUFFER_MS } from "../../../../claude-accounts/modules/oauth/claude-account-oauth.module.code.ts"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"

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

export function freshCredentialIn(seams: FreshCredentialSeams): FreshCredential {
  return async function freshCredentialFor(account) {
    const held = await seams.credentialByAccount(account, seams.logPrefix)
    if (held === null) return null
    const now = seams.now()
    if (held.expiresAt <= now) {
      seams.warned(expiredLine(seams.logPrefix, account, held.expiresAt))
      return null
    }
    if (held.expiresAt < now + REFRESH_BUFFER_MS) {
      seams.warned(behindLine(seams.logPrefix, account, held.expiresAt))
    }
    return held
  }
}
