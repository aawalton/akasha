import type { OAuthEffects } from "../oauth-effects/oauth-effects.module.code.ts"

export type PickResult = { readonly account: string }

export type PickAccount = (exclude?: string | ReadonlySet<string>) => Promise<PickResult | null>

export type PickerDoors = {
  readonly said: (line: string) => undefined
}

export const DOORS: PickerDoors = {
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
  let inflight: Promise<PickResult | null> | null = null
  let before: string | null = null

  return async function pickAccount(exclude) {
    if (inflight !== null) return inflight
    const excludes = excludesFrom(exclude)
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
      if (inflight === work) inflight = null
    })
    inflight = work
    return work
  }
}
