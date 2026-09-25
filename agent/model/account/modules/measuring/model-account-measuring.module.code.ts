import { fiveHourResetIn } from "akasha/agent/model/account/modules/five-hour-reset/five-hour-reset.computed-property-module.code.ts"
import { hoursUntilReset } from "akasha/agent/model/account/modules/pacing/model-account-pacing.module.code.ts"
import { ANTHROPIC } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import { rankedAhead } from "akasha/agent/model/account/modules/selection/model-account-selection.module.code.ts"
import type { AccountState } from "akasha/agent/model/gateway/modules/oauth-types/oauth-types.module.code.ts"
import { asInstant } from "akasha/code/type/narrowing/modules/as-instant/as-instant.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import {
  everyOfType,
  typeSlugOf,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { wholeValue } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const CEILING = 100

const NOTHING_SPENT = 0

const CLOCK_WIDTH = 9

const PERCENT_WIDTH = 3

export type Reading = {
  readonly account: string
  readonly aliasIndex: number | null
  readonly fiveHourPercentUsed: number | null
  readonly sevenDayPercentUsed: number | null
  readonly fiveHourResetsAt: string | null
  readonly sevenDayResetsAt: string | null
  readonly accessTokenExpiresAt: string | null
  readonly usageReadAt: string | null
  readonly terminalAt: string | null
  readonly subscriptionDisabledReason: string | null
}

function numberIn(held: Record<string, unknown>, key: string): number | null {
  const said = held[key]
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  const text = textAt(held, key)
  if (text === null) return null
  const found = Number(text)
  return Number.isFinite(found) ? found : null
}

export function readingsIn(root: string): readonly Reading[] {
  const found: Reading[] = []
  for (const one of everyOfType(root, typeSlugOf(root, ACCOUNT_TYPE))) {
    const stated = valueAt(one.path, root)
    if (stated === null) continue
    const whole = wholeValue(root, one.path, stated)
    const account = textAt(whole, "slug")
    if (account === null) continue
    if (textAt(whole, "provider") !== ANTHROPIC) continue
    found.push({
      account,
      aliasIndex: numberIn(whole, "aliasIndex"),
      fiveHourPercentUsed: numberIn(whole, "fiveHourPercentUsed"),
      sevenDayPercentUsed: numberIn(whole, "sevenDayPercentUsed"),
      fiveHourResetsAt: textAt(whole, "fiveHourResetsAt"),
      sevenDayResetsAt: textAt(whole, "sevenDayResetsAt"),
      accessTokenExpiresAt: textAt(whole, "accessTokenExpiresAt"),
      usageReadAt: textAt(whole, "usageReadAt"),
      terminalAt: textAt(whole, "terminalAt"),
      subscriptionDisabledReason: textAt(whole, "subscriptionDisabledReason"),
    })
  }
  return found
}

export function sevenDaySpent(one: Reading): number | null {
  if (one.subscriptionDisabledReason !== null) return CEILING
  return one.sevenDayPercentUsed
}

export function fiveHourSpent(one: Reading): number | null {
  if (one.subscriptionDisabledReason !== null) return CEILING
  const seven = one.sevenDayPercentUsed
  if (seven !== null && seven >= CEILING) return CEILING
  return one.fiveHourPercentUsed
}

export function fiveHourResets(one: Reading): string | null {
  return fiveHourResetIn(sevenDaySpent(one), one.fiveHourResetsAt)
}

function stateOf(one: Reading): AccountState {
  return {
    account: one.account,
    fiveHourUtil: fiveHourSpent(one) ?? NOTHING_SPENT,
    sevenDayUtil: sevenDaySpent(one) ?? NOTHING_SPENT,
    sevenDayResetsAt: one.sevenDayResetsAt,
    fiveHourResetsAt: one.fiveHourResetsAt,
    subscriptionType: null,
    subscriptionDisabled: one.subscriptionDisabledReason !== null,
    fiveHourAtLimitUntil: null,
    renewalTerminal: one.terminalAt !== null,
    accessTokenExpiresAt: asInstant(one.accessTokenExpiresAt),
  }
}

export function aheadOf(one: Reading, two: Reading, now: number): number {
  return rankedAhead(stateOf(one), stateOf(two), now, hoursUntilReset)
}

export function takenOf(readings: readonly Reading[], now: number): string | null {
  let best: Reading | null = null
  for (const one of readings) {
    const expires = asInstant(one.accessTokenExpiresAt)
    if (expires !== null && expires <= now) continue
    if ((fiveHourSpent(one) ?? 0) >= CEILING) continue
    if ((sevenDaySpent(one) ?? 0) >= CEILING) continue
    if (best === null || aheadOf(one, best, now) < 0) best = one
  }
  return best === null ? null : best.account
}

export function marksOf(one: Reading): readonly string[] {
  const found: string[] = []
  if (one.subscriptionDisabledReason !== null) found.push("disabled")
  if (one.terminalAt !== null) {
    found.push(one.aliasIndex === null ? "terminal" : `c${one.aliasIndex}`)
  }
  if (one.usageReadAt === null) found.push("unread")
  return found
}

export function clockOf(iso: string | null): string {
  const at = asInstant(iso)
  if (at === null) return ""
  const on = new Date(at)
  const day = on.toLocaleDateString("en-US", { weekday: "short" })
  const time = on.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
  return `${day} ${time}`
}

function orderOf(one: Reading): number {
  return asInstant(one.sevenDayResetsAt) ?? Number.POSITIVE_INFINITY
}

function sayPercent(spent: number | null): string {
  return spent === null ? "?" : String(spent)
}

export function inOrder(readings: readonly Reading[]): readonly Reading[] {
  return [...readings].sort((one, two) => {
    const at = orderOf(one)
    const to = orderOf(two)
    if (at !== to) return at < to ? -1 : 1
    return one.account < two.account ? -1 : one.account > two.account ? 1 : 0
  })
}

export function linesOf(readings: readonly Reading[], now: number): readonly string[] {
  const taken = takenOf(readings, now)
  const sorted = inOrder(readings)
  const width = Math.max(0, ...sorted.map((one) => one.account.length))
  return sorted.map((one) => {
    const held = taken === one.account ? "> " : "  "
    const five = sayPercent(fiveHourSpent(one)).padStart(PERCENT_WIDTH)
    const seven = sayPercent(sevenDaySpent(one)).padStart(PERCENT_WIDTH)
    const marks = marksOf(one)
    const tail = marks.length === 0 ? "" : `  ${marks.join(" ")}`
    return (
      `${held}${one.account.padEnd(width)} ${five}% ${clockOf(fiveHourResets(one)).padEnd(CLOCK_WIDTH)}` +
      `  ${seven}% ${clockOf(one.sevenDayResetsAt).padEnd(CLOCK_WIDTH)}${tail}`
    ).trimEnd()
  })
}
