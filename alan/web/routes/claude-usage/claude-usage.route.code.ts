import type { Asked, Query, Row } from "@akasha/pages-service/asking"
import { askingFor } from "@akasha/pages-service/calling"
import { READOUT_CACHE_CONTROL } from "akasha/readouts/credential/readout-credential.module.code.ts"
import { guardReadout } from "../../.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/claude-usage.route.code"

export type UsageTier = "red" | "yellow" | "green" | "blue"

export type UsageWidgetPayload = {
  avgUsedPct: number
  fiveHourBackAt: number | null
  sevenDayBackAt: number | null
  sevenDayEndsAt: number | null
  tier: UsageTier
}

export const MEAN_WEEKLY_USED = "the fleet's seven-day spend"
export const NEXT_FIVE_HOUR_BACK = "the next five-hour window to come back"
export const NEXT_SEVEN_DAY_BACK = "the next seven-day window to come back"
export const NEXT_SEVEN_DAY_END = "the next seven-day window to end"

export const ACCOUNT = "claude-account"
const SLUG = "slug"
const EFFECTIVE_FIVE_HOUR_USAGE = "effectiveFiveHourUsage"
const EFFECTIVE_SEVEN_DAY_USAGE = "effectiveSevenDayUsage"
const FIVE_HOUR_RESETS_AT = "fiveHourResetsAt"
const SEVEN_DAY_RESETS_AT = "sevenDayResetsAt"
const SPENT = 100
const HOUR_MS = 3_600_000

export type ClaudeUsageAskings = {
  readonly meanWeeklyUsed: Query
  readonly nextFiveHourBack: Query
  readonly nextSevenDayBack: Query
  readonly nextSevenDayEnd: Query
}

export function askingsAt(nowMs: number): ClaudeUsageAskings {
  const now = new Date(nowMs).toISOString()
  return {
    meanWeeklyUsed: {
      pageTypeSlug: ACCOUNT,
      keys: [SLUG, EFFECTIVE_SEVEN_DAY_USAGE],
    },
    nextFiveHourBack: {
      pageTypeSlug: ACCOUNT,
      where: {
        [EFFECTIVE_FIVE_HOUR_USAGE]: { "at-or-after": SPENT },
        [FIVE_HOUR_RESETS_AT]: { "at-or-after": now },
      },
      sortBy: FIVE_HOUR_RESETS_AT,
      limit: 1,
      keys: [FIVE_HOUR_RESETS_AT],
    },
    nextSevenDayBack: {
      pageTypeSlug: ACCOUNT,
      where: {
        [EFFECTIVE_SEVEN_DAY_USAGE]: { "at-or-after": SPENT },
        [SEVEN_DAY_RESETS_AT]: { "at-or-after": now },
      },
      sortBy: SEVEN_DAY_RESETS_AT,
      limit: 1,
      keys: [SEVEN_DAY_RESETS_AT],
    },
    nextSevenDayEnd: {
      pageTypeSlug: ACCOUNT,
      where: {
        [EFFECTIVE_SEVEN_DAY_USAGE]: { before: SPENT },
        [SEVEN_DAY_RESETS_AT]: { "at-or-after": now },
      },
      sortBy: SEVEN_DAY_RESETS_AT,
      limit: 1,
      keys: [SEVEN_DAY_RESETS_AT],
    },
  }
}

export type ClaudeUsageAnswers = {
  readonly meanWeeklyUsed: Asked
  readonly nextFiveHourBack: Asked
  readonly nextSevenDayBack: Asked
  readonly nextSevenDayEnd: Asked
}

type Reading<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly why: string }

function numberIn(row: Row, key: string): number | null {
  const said = row[key]
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said === "") return null
  const found = Number(said)
  return Number.isFinite(found) ? found : null
}

function meanUsedPct(asked: Asked): Reading<number> {
  if ("refused" in asked) return { ok: false, why: asked.refused }
  const { rows } = asked
  const spent = rows
    .map((one) => numberIn(one, EFFECTIVE_SEVEN_DAY_USAGE))
    .filter((one): one is number => one !== null)
  if (spent.length === 0) {
    return {
      ok: false,
      why:
        `${MEAN_WEEKLY_USED} matched ${rows.length} account(s) and read what none of them had ` +
        "spent, so what the fleet has spent is unread rather than nothing",
    }
  }
  const total = spent.reduce((sum, one) => sum + one, 0)
  return { ok: true, value: Math.round(total / spent.length) }
}

function instantIn(asked: Asked, asking: string, key: string): Reading<number | null> {
  if ("refused" in asked) return { ok: false, why: asked.refused }
  const { rows } = asked
  if (rows.length === 0) return { ok: true, value: null }
  const row = rows[0]
  if (row === undefined) {
    return {
      ok: false,
      why:
        `${asking} matched ${rows.length} account(s) and carried no row to read ` +
        `\`${key}\` from`,
    }
  }
  const held = row[key]
  if (typeof held !== "string") {
    return { ok: false, why: `${asking} carried a row with no \`${key}\` text on it` }
  }
  const ms = Date.parse(held)
  if (Number.isNaN(ms)) {
    return { ok: false, why: `${asking} carried \`${key}\` as \`${held}\`, which is no instant` }
  }
  return { ok: true, value: ms }
}

function tierFor(sevenDayEndsAt: number | null, nowMs: number): UsageTier {
  if (sevenDayEndsAt === null) return "blue"
  const hours = (sevenDayEndsAt - nowMs) / HOUR_MS
  return hours < 24 ? "red" : hours < 48 ? "yellow" : hours < 72 ? "green" : "blue"
}

const UNANSWERED =
  "the usage this route reports went unread, so there is none to report; a payload of nulls and zeroes would read to the widget as a fleet that has spent nothing with nothing pending"

export function buildClaudeUsageResponse(answers: ClaudeUsageAnswers, nowMs: number): Response {
  const avgUsedPct = meanUsedPct(answers.meanWeeklyUsed)
  const fiveHourBackAt = instantIn(
    answers.nextFiveHourBack,
    NEXT_FIVE_HOUR_BACK,
    FIVE_HOUR_RESETS_AT
  )
  const sevenDayBackAt = instantIn(
    answers.nextSevenDayBack,
    NEXT_SEVEN_DAY_BACK,
    SEVEN_DAY_RESETS_AT
  )
  const sevenDayEndsAt = instantIn(answers.nextSevenDayEnd, NEXT_SEVEN_DAY_END, SEVEN_DAY_RESETS_AT)

  if (!avgUsedPct.ok || !fiveHourBackAt.ok || !sevenDayBackAt.ok || !sevenDayEndsAt.ok) {
    const unread = [avgUsedPct, fiveHourBackAt, sevenDayBackAt, sevenDayEndsAt].flatMap(
      (reading) => (reading.ok ? [] : [reading.why])
    )
    return Response.json(
      { error: UNANSWERED, unread },
      { status: 503, headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
    )
  }

  const payload: UsageWidgetPayload = {
    avgUsedPct: avgUsedPct.value,
    fiveHourBackAt: fiveHourBackAt.value,
    sevenDayBackAt: sevenDayBackAt.value,
    sevenDayEndsAt: sevenDayEndsAt.value,
    tier: tierFor(sevenDayEndsAt.value, nowMs),
  }
  return Response.json(payload, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = await guardReadout(request)
  if (refusal !== null) return refusal
  const nowMs = Date.now()
  const askings = askingsAt(nowMs)
  const [meanWeeklyUsed, nextFiveHourBack, nextSevenDayBack, nextSevenDayEnd] = await Promise.all([
    askingFor(askings.meanWeeklyUsed),
    askingFor(askings.nextFiveHourBack),
    askingFor(askings.nextSevenDayBack),
    askingFor(askings.nextSevenDayEnd),
  ])
  return buildClaudeUsageResponse(
    { meanWeeklyUsed, nextFiveHourBack, nextSevenDayBack, nextSevenDayEnd },
    nowMs
  )
}
