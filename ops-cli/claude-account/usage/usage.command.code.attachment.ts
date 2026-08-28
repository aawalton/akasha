export const summary =
  "Show what each claude account has spent of its limits, and which one the picker takes next"

import { rootsHere } from "../../../repo/roots/roots.ts"
import { deriverFor } from "../../../tools/lib/deriver-hold.ts"
import { selectAccount } from "../../../tools/lib/oauth-selection.ts"
import type { AccountState } from "../../../tools/lib/oauth-types.ts"

export const help = {
  description:
    "Print one line per claude account: what it has spent of its five-hour and seven-day " +
    "windows, when each window resets, and any mark that takes it out of the pool. An account " +
    "that can no longer renew itself is marked with the shell function that logs it back in, " +
    "so the mark is the thing to type rather than a word about it. The `>` names the account " +
    "the picker would take right now, skipping any whose access token has already lapsed, as " +
    "the picker does. Every account holding a page is printed, so a count that moves run to " +
    "run is a fault rather than a quiet drop. The numbers are read from the pages the upkeep " +
    "service refreshes; nothing here fetches.",
}

const PAGE_TYPE = "claude-account"

type Values = Readonly<Record<string, string | readonly string[] | null>>

type Line = {
  readonly account: string
  readonly fiveHour: number | null
  readonly sevenDay: number | null
  readonly fiveHourResetsAt: string | null
  readonly sevenDayResetsAt: string | null
  readonly marks: readonly string[]
}

function text(values: Values, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

function percent(values: Values, key: string): number | null {
  const held = text(values, key)
  if (held === null) return null
  const found = Number(held)
  return Number.isFinite(found) ? found : null
}

function instant(values: Values, key: string): number | null {
  const held = text(values, key)
  if (held === null) return null
  const at = Date.parse(held)
  return Number.isNaN(at) ? null : at
}

function clock(iso: string | null): string {
  if (iso === null) return ""
  const at = Date.parse(iso)
  if (Number.isNaN(at)) return ""
  const on = new Date(at)
  const day = on.toLocaleDateString("en-US", { weekday: "short" })
  const time = on.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
  return `${day} ${time}`
}

function reauthMark(values: Values): string {
  const alias = text(values, "alias-index")
  return alias === null ? "terminal" : `c${alias}`
}

function resetOrder(line: Line): number {
  if (line.sevenDayResetsAt === null) return Number.POSITIVE_INFINITY
  const at = Date.parse(line.sevenDayResetsAt)
  return Number.isNaN(at) ? Number.POSITIVE_INFINITY : at
}

export default async function usage(argv: readonly string[]): Promise<void> {
  if (argv.length > 0) {
    throw new Error(`claude-account usage takes no argument, and got \`${argv.join(" ")}\``)
  }

  const derive = deriverFor(rootsHere())
  const found = derive.rows(PAGE_TYPE)
  const rows = found === null ? [] : [...found]
  if (rows.length === 0) {
    throw new Error("no claude-account page was found, so there is no account to report on")
  }

  const now = Date.now()
  const lines: Line[] = []
  const states: AccountState[] = []
  for (const row of rows) {
    const values = row.values as Values
    const account = text(values, "slug")
    if (account === null) continue
    const disabled = text(values, "subscription-disabled-reason")
    const terminal = text(values, "terminal-at")
    const marks: string[] = []
    if (disabled !== null) marks.push("disabled")
    if (terminal !== null) marks.push(reauthMark(values))
    if (text(values, "usage-read-at") === null) marks.push("unread")
    const fiveHour = percent(values, "effective-five-hour-percent-used")
    const sevenDay = percent(values, "effective-seven-day-percent-used")
    const fiveHourResetsAt = text(values, "five-hour-resets-at")
    const sevenDayResetsAt = text(values, "seven-day-resets-at")
    lines.push({ account, fiveHour, sevenDay, fiveHourResetsAt, sevenDayResetsAt, marks })
    states.push({
      account,
      fiveHourUtil: fiveHour ?? 0,
      sevenDayUtil: sevenDay ?? 0,
      sevenDayResetsAt,
      fiveHourResetsAt,
      subscriptionType: text(values, "subscription-type"),
      subscriptionDisabled: disabled !== null,
      fiveHourAtLimitUntil: null,
      renewalTerminal: terminal !== null,
      accessTokenExpiresAt: instant(values, "access-token-expires-at"),
    })
  }

  const live = states.filter(
    (one) => one.accessTokenExpiresAt === null || one.accessTokenExpiresAt > now
  )
  const taken = selectAccount(live, now)
  const sorted = [...lines].sort((one, two) => {
    const at = resetOrder(one)
    const to = resetOrder(two)
    if (at !== to) return at < to ? -1 : 1
    return one.account < two.account ? -1 : one.account > two.account ? 1 : 0
  })
  const width = Math.max(...sorted.map((one) => one.account.length))

  for (const line of sorted) {
    const held = taken !== null && taken.account === line.account ? "> " : "  "
    const five = line.fiveHour === null ? "?" : String(line.fiveHour)
    const seven = line.sevenDay === null ? "?" : String(line.sevenDay)
    const marks = line.marks.length === 0 ? "" : `  ${line.marks.join(" ")}`
    console.log(
      `${held}${line.account.padEnd(width)} ${five.padStart(3)}% ` +
        `${clock(line.fiveHourResetsAt).padEnd(9)}  ${seven.padStart(3)}% ` +
        `${clock(line.sevenDayResetsAt).padEnd(9)}${marks}`.trimEnd()
    )
  }

  if (taken === null) {
    console.error("no account is eligible right now, so no line is marked")
  }
  for (const fault of derive.faults()) {
    console.error(`fault: ${fault}`)
  }
}
