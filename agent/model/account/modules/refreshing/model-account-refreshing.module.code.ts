import {
  markedIn,
  pacingMarks,
  usageFrom,
} from "akasha/agent/model/account/modules/marking/model-account-marking.module.code.ts"
import {
  ANTHROPIC,
  credentialIn,
  everyAccountSlugOfIn,
} from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import { usageFetched } from "akasha/agent/model/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { secretsIn } from "akasha/page/modules/secret/page-secret.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

const LAPSED_WHY = "its access token has lapsed, and renewing one is the upkeep service's alone"

const WITHDRAWN_WHY = "its subscription is withdrawn"

const MALFORMED_WHY = "the usage endpoint answered what does not read as a usage reading"

type Outcome = "read" | "lapsed" | "absent" | "withdrawn" | "refused"

export type Refreshing = {
  readonly account: string
  readonly kind: Outcome
  readonly why: string | null
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

async function refreshOne(root: string, account: string, now: number): Promise<Refreshing> {
  const held = credentialIn(root, account, secretsIn)
  if (held.kind === "absent") return { account, kind: "absent", why: held.why }
  const cred = held.credential
  if (cred.subscriptionDisabledReason !== null) {
    return { account, kind: "withdrawn", why: WITHDRAWN_WHY }
  }
  if (cred.accessTokenExpiresAtMs <= now) {
    return { account, kind: "lapsed", why: LAPSED_WHY }
  }
  const read = await usageFetched(cred.accessToken)
  if (read.kind === "refused") {
    return { account, kind: "refused", why: `the usage endpoint answered ${read.status}` }
  }
  if (read.kind === "threw") {
    return { account, kind: "refused", why: saidBy(read.error) }
  }
  const usage = usageFrom(read.body)
  if (usage === null) return { account, kind: "refused", why: MALFORMED_WHY }
  const marked = markedIn(root, account, pacingMarks(now, usage), readingIn(root), (path) =>
    valueAt(path, root)
  )
  if (marked.kind === "refused" || marked.kind === "absent") {
    return { account, kind: "refused", why: marked.why }
  }
  return { account, kind: "read", why: null }
}

export async function refreshAll(root: string, now: number): Promise<readonly Refreshing[]> {
  const found: Refreshing[] = []
  for (const account of everyAccountSlugOfIn(root, ANTHROPIC)) {
    found.push(await refreshOne(root, account, now))
  }
  return found
}
