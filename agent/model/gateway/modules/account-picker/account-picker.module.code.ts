import type { OAuthEffects } from "akasha/agent/model/gateway/modules/oauth-effects/oauth-effects.module.code.ts"

export type PickResult = { readonly account: string }

export type PickAccount = (exclude?: string | ReadonlySet<string>) => Promise<PickResult | null>

export type PickerDoors = {
  readonly said: (line: string) => undefined
}

const DOORS: PickerDoors = {
  said: (line) => {
    console.log(line)
  },
}

export function excludesFrom(exclude?: string | ReadonlySet<string>): ReadonlySet<string> {
  if (exclude === undefined) return new Set()
  return typeof exclude === "string" ? new Set([exclude]) : exclude
}

export function bindLine(
  logPrefix: string,
  account: string,
  before: string | null,
  excludes: ReadonlySet<string>
): string {
  const command = before === null ? "bind" : "rebind"
  const from = before === null ? "" : ` from=${before}`
  const held = excludes.size > 0 ? ` exclude=${[...excludes].join(",")}` : ""
  return `${logPrefix} ${command} account=${account}${from}${held}`
}

export function buildAccountPicker(
  logPrefix: string,
  oauth: OAuthEffects,
  doors: PickerDoors = DOORS
): PickAccount {
  const inflight = new Map<string, Promise<PickResult | null>>()
  let before: string | null = null

  return async function pickAccount(exclude) {
    const excludes = excludesFrom(exclude)
    const key = JSON.stringify([...excludes].sort())
    const held = inflight.get(key)
    if (held !== undefined) return held
    const work: Promise<PickResult | null> = (async () => {
      const picked = await oauth.getBestCredential(logPrefix, excludes)
      if (picked === null) return null
      const account = picked.credential.account
      if (account !== before) {
        doors.said(bindLine(logPrefix, account, before, excludes))
        before = account
      }
      return { account }
    })().finally(() => {
      if (inflight.get(key) === work) inflight.delete(key)
    })
    inflight.set(key, work)
    return work
  }
}
