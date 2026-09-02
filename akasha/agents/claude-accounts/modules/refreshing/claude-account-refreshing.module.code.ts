import { secretsIn } from "@akasha/pages-system/page-secret"
import { fetchUsage, pushPacingToPage } from "@tools/lib/oauth-usage"
import { credentialIn, everyAccountSlugIn } from "../reading/claude-account-reading.module.code.ts"

const LOG = "[measure]"

const LAPSED_WHY = "its access token has lapsed, and renewing one is the upkeep service's alone"

const WITHDRAWN_WHY = "its subscription is withdrawn"

export type Outcome = "read" | "lapsed" | "absent" | "withdrawn" | "refused"

export type Refreshing = {
  readonly account: string
  readonly kind: Outcome
  readonly why: string | null
}

export function lapsed(expiresAtMs: number, now: number): boolean {
  return expiresAtMs <= now
}

export function noteOf(one: Refreshing): string | null {
  return one.kind === "read" ? null : `${one.account} was not refreshed — ${one.why}`
}

export function notesOf(every: readonly Refreshing[]): readonly string[] {
  const found: string[] = []
  for (const one of every) {
    const said = noteOf(one)
    if (said !== null) found.push(said)
  }
  return found
}

export async function refreshOne(root: string, account: string, now: number): Promise<Refreshing> {
  const held = credentialIn(root, account, secretsIn)
  if (held.kind === "absent") return { account, kind: "absent", why: held.why }
  const cred = held.credential
  if (cred.subscriptionDisabledReason !== null) {
    return { account, kind: "withdrawn", why: WITHDRAWN_WHY }
  }
  if (lapsed(cred.accessTokenExpiresAtMs, now)) {
    return { account, kind: "lapsed", why: LAPSED_WHY }
  }
  try {
    const usage = await fetchUsage(cred.accessToken)
    await pushPacingToPage(account, usage, LOG)
    return { account, kind: "read", why: null }
  } catch (err) {
    return { account, kind: "refused", why: err instanceof Error ? err.message : String(err) }
  }
}

export async function refreshAll(root: string, now: number): Promise<readonly Refreshing[]> {
  const found: Refreshing[] = []
  for (const account of everyAccountSlugIn(root)) {
    found.push(await refreshOne(root, account, now))
  }
  return found
}
