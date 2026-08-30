import { type Asked, askNamed, type Fetcher } from "@shared/pages-query"
import { type QueryAnswer } from "../../../../shared/pages-query/src/answer-schema"
import { READOUT_CACHE_CONTROL } from "../../../../akasha/readout-system/readout-credential/readout-credential.module.code.ts"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.claude-usage"

export type UsageTier = "red" | "yellow" | "green" | "blue"

export type UsageWidgetPayload = {
  avgUsedPct: number
  fiveHourBackAt: number | null
  sevenDayBackAt: number | null
  sevenDayEndsAt: number | null
  tier: UsageTier
}

export { type Asked, askNamed, type Fetcher, type QueryAnswer }
export const MEAN_WEEKLY_USED = "claude-accounts-mean-weekly-used"
export const NEXT_FIVE_HOUR_BACK = "claude-accounts-next-five-hour-back"
export const NEXT_SEVEN_DAY_BACK = "claude-accounts-next-seven-day-back"
export const NEXT_SEVEN_DAY_END = "claude-accounts-next-seven-day-end"
const FIVE_HOUR_RESETS_AT = "five-hour-resets-at"
const SEVEN_DAY_RESETS_AT = "seven-day-resets-at"
const HOUR_MS = 3_600_000

export type ClaudeUsageAnswers = {
  readonly meanWeeklyUsed: Asked
  readonly nextFiveHourBack: Asked
  readonly nextSevenDayBack: Asked
  readonly nextSevenDayEnd: Asked
}

type Reading<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly why: string }

function meanUsedPct(asked: Asked): Reading<number> {
  if (!asked.ok) return { ok: false, why: asked.why }
  const { value, over } = asked.answer
  if (over === null || over === 0) return { ok: true, value: 0 }
  if (value === null) {
    return {
      ok: false,
      why: `\`${MEAN_WEEKLY_USED}\` took a mean over ${over} page(s) and carried no value for it`,
    }
  }
  return { ok: true, value: Math.round(value) }
}

function instantIn(asked: Asked, slug: string, key: string): Reading<number | null> {
  if (!asked.ok) return { ok: false, why: asked.why }
  const { n, rows } = asked.answer
  if (n === 0) return { ok: true, value: null }
  const row = rows[0]
  if (row === undefined) {
    return {
      ok: false,
      why: `\`${slug}\` matched ${n} page(s) and carried no row to read \`${key}\` from`,
    }
  }
  const held = row.values[key]
  if (typeof held !== "string") {
    return { ok: false, why: `\`${slug}\` carried a row with no \`${key}\` text on it` }
  }
  const ms = Date.parse(held)
  if (Number.isNaN(ms)) {
    return { ok: false, why: `\`${slug}\` carried \`${key}\` as \`${held}\`, which is no instant` }
  }
  return { ok: true, value: ms }
}

function tierFor(sevenDayEndsAt: number | null, nowMs: number): UsageTier {
  if (sevenDayEndsAt === null) return "blue"
  const hours = (sevenDayEndsAt - nowMs) / HOUR_MS
  return hours < 24 ? "red" : hours < 48 ? "yellow" : hours < 72 ? "green" : "blue"
}

const UNANSWERED =
  "the page query service did not answer, so this route holds no usage to report; a payload of nulls and zeroes would read to the widget as accounts with nothing pending"

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
  const [meanWeeklyUsed, nextFiveHourBack, nextSevenDayBack, nextSevenDayEnd] = await Promise.all([
    askNamed(MEAN_WEEKLY_USED),
    askNamed(NEXT_FIVE_HOUR_BACK),
    askNamed(NEXT_SEVEN_DAY_BACK),
    askNamed(NEXT_SEVEN_DAY_END),
  ])
  return buildClaudeUsageResponse(
    { meanWeeklyUsed, nextFiveHourBack, nextSevenDayBack, nextSevenDayEnd },
    Date.now()
  )
}
