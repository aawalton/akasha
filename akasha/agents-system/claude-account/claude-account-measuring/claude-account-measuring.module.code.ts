import { valueAt } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { everyOfTypeAnswered } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { uncommittedIn } from "../../../pages-system/page/page-uncommitted/page-uncommitted.module.code.ts"

const PAGE_TYPE = "claude-account"

const CEILING = 100

const FALLBACK_HOURS = 144

const MS_AN_HOUR = 3_600_000

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

function textIn(held: Record<string, unknown>, key: string): string | null {
  const said = held[key]
  return typeof said === "string" && said !== "" ? said : null
}

function numberIn(held: Record<string, unknown>, key: string): number | null {
  const said = held[key]
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  const text = textIn(held, key)
  if (text === null) return null
  const found = Number(text)
  return Number.isFinite(found) ? found : null
}

export function instantOf(iso: string | null): number | null {
  if (iso === null) return null
  const at = Date.parse(iso)
  return Number.isNaN(at) ? null : at
}

export function readingsIn(root: string): readonly Reading[] {
  const found: Reading[] = []
  for (const one of everyOfTypeAnswered(root, PAGE_TYPE)) {
    const stated = valueAt(one.path, root)
    if (stated === null) continue
    const account = textIn(stated, "slug")
    if (account === null) continue
    const beside = uncommittedIn(root, one.path) ?? {}
    found.push({
      account,
      aliasIndex: numberIn(stated, "aliasIndex"),
      fiveHourPercentUsed: numberIn(beside, "fiveHourPercentUsed"),
      sevenDayPercentUsed: numberIn(beside, "sevenDayPercentUsed"),
      fiveHourResetsAt: textIn(beside, "fiveHourResetsAt"),
      sevenDayResetsAt: textIn(beside, "sevenDayResetsAt"),
      accessTokenExpiresAt: textIn(beside, "accessTokenExpiresAt"),
      usageReadAt: textIn(beside, "usageReadAt"),
      terminalAt: textIn(beside, "terminalAt"),
      subscriptionDisabledReason: textIn(beside, "subscriptionDisabledReason"),
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

function hoursUntil(iso: string | null, now: number): number {
  const at = instantOf(iso)
  if (at === null) return FALLBACK_HOURS
  const left = at - now
  return left <= 0 ? FALLBACK_HOURS : left / MS_AN_HOUR
}

export function aheadOf(one: Reading, two: Reading, now: number): number {
  const at = hoursUntil(one.sevenDayResetsAt, now)
  const to = hoursUntil(two.sevenDayResetsAt, now)
  if (at !== to) return at - to
  const seven = (sevenDaySpent(one) ?? 0) - (sevenDaySpent(two) ?? 0)
  if (seven !== 0) return seven
  const five = (fiveHourSpent(one) ?? 0) - (fiveHourSpent(two) ?? 0)
  if (five !== 0) return five
  return one.account < two.account ? -1 : one.account > two.account ? 1 : 0
}

export function takenOf(readings: readonly Reading[], now: number): string | null {
  let best: Reading | null = null
  for (const one of readings) {
    const expires = instantOf(one.accessTokenExpiresAt)
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
  const at = instantOf(iso)
  if (at === null) return ""
  const on = new Date(at)
  const day = on.toLocaleDateString("en-US", { weekday: "short" })
  const time = on.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
  return `${day} ${time}`
}

function orderOf(one: Reading): number {
  return instantOf(one.sevenDayResetsAt) ?? Number.POSITIVE_INFINITY
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
      `${held}${one.account.padEnd(width)} ${five}% ${clockOf(one.fiveHourResetsAt).padEnd(CLOCK_WIDTH)}` +
      `  ${seven}% ${clockOf(one.sevenDayResetsAt).padEnd(CLOCK_WIDTH)}${tail}`
    ).trimEnd()
  })
}
