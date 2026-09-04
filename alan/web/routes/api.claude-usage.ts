import type { Asked, Query, Row } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { READOUT_CACHE_CONTROL } from "@akasha/readout-system/readout-credential"
import { guardReadout } from "../.server/readout-guarding/readout-guarding.module.code.ts"
import type { Route } from "./+types/api.claude-usage"

export type UsageTier = "red" | "yellow" | "green" | "blue"

export type UsageWidgetPayload = {
  avgUsedPct: number
  fiveHourBackAt: number | null
  sevenDayBackAt: number | null
  sevenDayEndsAt: number | null
  tier: UsageTier
}

export { type Asked, askingFor, type Query, type Row }

// THE FOUR SAVED QUERIES ARE ASKED OF THE PAGES HERE RATHER THAN NAMED AT THE OLD ENGINE. This
// route asked `@shared/pages-query` for four page-query pages by slug, and the store behind that
// engine holds only what a page states in the commit. Every figure the four reduce is declared
// `uncommitted` on the claude-account page type and stands in the file beside each account's page,
// so the store answered a fleet it could see and none of what that fleet had spent. The pages
// system service reads the values beside a page as well as the ones in it, which is what makes
// asking it for these four an answer rather than an empty set.
//
// THE SERVICE REDUCES NOTHING, SO THE REDUCTIONS STAND HERE. It answers rows. The mean and the
// three "next instant" picks the four saved queries carried are taken over those rows below. The
// `where`, `sortBy` and `limit` each pick states are the ones its saved query stated, so what the
// service narrows to is unchanged; only where the last step happens has moved.
export const MEAN_WEEKLY_USED = "the fleet's seven-day spend"
export const NEXT_FIVE_HOUR_BACK = "the next five-hour window to come back"
export const NEXT_SEVEN_DAY_BACK = "the next seven-day window to come back"
export const NEXT_SEVEN_DAY_END = "the next seven-day window to end"

export const ACCOUNT = "claude-account"
const SLUG = "slug"
const FIVE_HOUR_PERCENT_USED = "fiveHourPercentUsed"
const SEVEN_DAY_PERCENT_USED = "sevenDayPercentUsed"
const FIVE_HOUR_RESETS_AT = "fiveHourResetsAt"
const SEVEN_DAY_RESETS_AT = "sevenDayResetsAt"
const SUBSCRIPTION_DISABLED_REASON = "subscriptionDisabledReason"
const SPENT = 100
const HOUR_MS = 3_600_000

export type ClaudeUsageAskings = {
  readonly meanWeeklyUsed: Query
  readonly nextFiveHourBack: Query
  readonly nextSevenDayBack: Query
  readonly nextSevenDayEnd: Query
}

// What the four saved queries narrowed to, said as the service says it. `now` was a word the old
// engine read for itself; the service takes an instant, so the one moment this response is built
// against bounds all three picks and sets the tier as well.
export function askingsAt(nowMs: number): ClaudeUsageAskings {
  const now = new Date(nowMs).toISOString()
  return {
    meanWeeklyUsed: {
      pageTypeSlug: ACCOUNT,
      keys: [SLUG, SEVEN_DAY_PERCENT_USED, SUBSCRIPTION_DISABLED_REASON],
    },
    nextFiveHourBack: {
      pageTypeSlug: ACCOUNT,
      where: {
        [FIVE_HOUR_PERCENT_USED]: { "at-or-after": SPENT },
        [FIVE_HOUR_RESETS_AT]: { "at-or-after": now },
      },
      sortBy: FIVE_HOUR_RESETS_AT,
      limit: 1,
      keys: [FIVE_HOUR_RESETS_AT],
    },
    nextSevenDayBack: {
      pageTypeSlug: ACCOUNT,
      where: {
        [SEVEN_DAY_PERCENT_USED]: { "at-or-after": SPENT },
        [SEVEN_DAY_RESETS_AT]: { "at-or-after": now },
      },
      sortBy: SEVEN_DAY_RESETS_AT,
      limit: 1,
      keys: [SEVEN_DAY_RESETS_AT],
    },
    nextSevenDayEnd: {
      pageTypeSlug: ACCOUNT,
      where: {
        [SEVEN_DAY_PERCENT_USED]: { before: SPENT },
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

// What one account has spent of its seven-day window, which is what the deleted
// `effective-seven-day-percent-used` said: an account whose subscription is withdrawn has spent
// the whole of the window whatever its last reading was. `sevenDaySpent` in
// `@akasha/agents/claude-account-measuring` carries the same expression for `akasha measure`, so
// the mean here and that listing read one account the same way.
export function spentIn(row: Row): number | null {
  const reason = row[SUBSCRIPTION_DISABLED_REASON]
  if (typeof reason === "string" && reason !== "") return SPENT
  return numberIn(row, SEVEN_DAY_PERCENT_USED)
}

// A MEAN OVER NO ACCOUNT IS NO PERCENTAGE RATHER THAN ZERO. An account carrying no reading is left
// out of the average rather than counted as having spent nothing, which is the shape the old
// reduction had: a figure it could not read moved neither the mean nor what the mean was taken
// over. Where that leaves nothing to take a mean over, reading the empty sum as `avgUsedPct: 0`
// draws Alan a fleet that has spent nothing, which is a claim about his capacity rather than the
// absence it is. Refusing is what puts the true state on the tile: the widget reads anything but
// 200 as unreachable, falls back to its last known reading, and draws `—` where it holds none.
function meanUsedPct(asked: Asked): Reading<number> {
  if ("refused" in asked) return { ok: false, why: asked.refused }
  const { rows } = asked
  const spent = rows.map(spentIn).filter((one): one is number => one !== null)
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

// AN INSTANT NO ACCOUNT HOLDS IS ABSENT RATHER THAN UNREAD. A pick matching no account is a true
// `null`: no window is pending, and the widget draws that as nothing pending. A pick that matched
// an account and then carried no instant to read off it is a reading that failed, and refuses.
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
