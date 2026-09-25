import { modelProvider } from "akasha/agent/model/provider/model-provider.page-type.ts"
import { anthropic } from "akasha/agent/model/provider/pages/anthropic/anthropic.model-provider.ts"
import { READOUT_CACHE_CONTROL } from "akasha/alan/harness/readout/modules/credential/readout-credential.module.code.ts"
import {
  groupServedBy,
  type WordsByWireKey,
  wordsInGroup,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { stated } from "akasha/alan/harness/readout/modules/none-left/readout-none-left.module.code.ts"
import {
  type Rung,
  rungsIn,
  type TierColor,
  tierAt,
} from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"
import { guardReadout } from "akasha/alan/web/.server/readout-guarding/readout-guarding.module.code.ts"
import { claudeUsage } from "akasha/alan/web/routes/claude-usage/claude-usage.route.ts"
import { route } from "akasha/code/route/route.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  Asked,
  Query,
  Row,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Route } from "./+types/claude-usage.route.code"

type UsageTier = "red" | "yellow" | "green" | "blue"

export type UsageWidgetPayload = {
  avgUsedPct: number
  fiveHourBackAt: number | null
  sevenDayBackAt: number | null
  sevenDayEndsAt: number | null
  tier: UsageTier
  readouts?: WordsByWireKey
}

const SERVED_BY = namedAs(route.slug, claudeUsage.slug, null)

const READOUT = "readout"

const READOUT_SCALE = "readout-scale"

const READOUT_GROUP = "readout-group"

const MEAN_WEEKLY_USED = "the fleet's seven-day spend"
const NEXT_FIVE_HOUR_BACK = "the next five-hour window to come back"
const NEXT_SEVEN_DAY_BACK = "the next seven-day window to come back"
const NEXT_SEVEN_DAY_END = "the next seven-day window to end"

export const ACCOUNT = "model-account"
export const ANTHROPIC = `${modelProvider.slug}/${anthropic.slug}` as const
const PROVIDER = "provider"
const SLUG = "slug"
const EFFECTIVE_FIVE_HOUR_USAGE = "effectiveFiveHourUsage"
const EFFECTIVE_SEVEN_DAY_USAGE = "effectiveSevenDayUsage"
const FIVE_HOUR_RESETS_AT = "fiveHourResetsAt"
const SEVEN_DAY_RESETS_AT = "sevenDayResetsAt"
const SPENT = 100
const HOUR_MS = 3_600_000

type ClaudeUsageAskings = {
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
      where: { [PROVIDER]: { is: ANTHROPIC } },
      keys: [SLUG, EFFECTIVE_SEVEN_DAY_USAGE],
    },
    nextFiveHourBack: {
      pageTypeSlug: ACCOUNT,
      where: {
        [PROVIDER]: { is: ANTHROPIC },
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
        [PROVIDER]: { is: ANTHROPIC },
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
        [PROVIDER]: { is: ANTHROPIC },
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

const USAGE_TIERS: readonly TierColor[] = ["red", "yellow", "green", "blue"]

const WORSE_THAN_EVERY_USAGE_TIER: UsageTier = "red"

function usageTierOf(tier: TierColor): UsageTier {
  return USAGE_TIERS.includes(tier) ? (tier as UsageTier) : WORSE_THAN_EVERY_USAGE_TIER
}

const UNCOLORED =
  "the scale of the reading the group's colored readout takes its color from went unread"

function tierFor(
  sevenDayEndsAt: number | null,
  nowMs: number,
  rungs: readonly Rung[]
): Reading<UsageTier> {
  const top = rungs.at(-1)
  if (top === undefined) return { ok: false, why: UNCOLORED }
  if (sevenDayEndsAt === null) return { ok: true, value: usageTierOf(top.color) }
  const reached = tierAt((sevenDayEndsAt - nowMs) / HOUR_MS, rungs)
  if (reached === null) return { ok: false, why: UNCOLORED }
  return { ok: true, value: usageTierOf(reached.tier) }
}

export async function colorRungsIn(groupSlug: string): Promise<readonly Rung[]> {
  const grouped = await askingFor({
    pageTypeSlug: READOUT,
    where: { groups: { has: namedAs(READOUT_GROUP, groupSlug, null) } },
  })
  if ("refused" in grouped) return []
  const colorFrom = grouped.rows
    .map((row) => stated(row.colorFrom))
    .find((one) => one !== undefined)
  if (colorFrom === undefined) return []

  const colored = await askingFor({
    pageTypeSlug: READOUT,
    where: { slug: { is: slugOf(colorFrom) } },
  })
  if ("refused" in colored) return []
  const scale = stated(colored.rows[0]?.scale)
  if (scale === undefined) return []

  const scaled = await askingFor({
    pageTypeSlug: READOUT_SCALE,
    where: { slug: { is: slugOf(scale) } },
  })
  if ("refused" in scaled) return []
  const [scaleRow] = scaled.rows
  return scaleRow === undefined ? [] : rungsIn(scaleRow)
}

const UNANSWERED =
  "the usage this route reports went unread, so there is none to report; a payload of nulls and zeroes would read to the widget as a fleet that has spent nothing with nothing pending"

export function buildClaudeUsageResponse(
  answers: ClaudeUsageAnswers,
  nowMs: number,
  rungs: readonly Rung[],
  readouts: WordsByWireKey = {}
): Response {
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
  const tier: Reading<UsageTier> = sevenDayEndsAt.ok
    ? tierFor(sevenDayEndsAt.value, nowMs, rungs)
    : { ok: true, value: WORSE_THAN_EVERY_USAGE_TIER }

  if (
    !avgUsedPct.ok ||
    !fiveHourBackAt.ok ||
    !sevenDayBackAt.ok ||
    !sevenDayEndsAt.ok ||
    !tier.ok
  ) {
    const unread = [avgUsedPct, fiveHourBackAt, sevenDayBackAt, sevenDayEndsAt, tier].flatMap(
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
    tier: tier.value,
    ...(Object.keys(readouts).length === 0 ? {} : { readouts }),
  }
  return Response.json(payload, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}

async function groupRead(): Promise<readonly [WordsByWireKey, readonly Rung[]]> {
  const groupSlug = await groupServedBy(SERVED_BY)
  if (groupSlug === null) return [{}, []]
  return Promise.all([wordsInGroup(groupSlug), colorRungsIn(groupSlug)])
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = await guardReadout(request)
  if (refusal !== null) return refusal
  const nowMs = Date.now()
  const askings = askingsAt(nowMs)
  const [meanWeeklyUsed, nextFiveHourBack, nextSevenDayBack, nextSevenDayEnd, [readouts, rungs]] =
    await Promise.all([
      askingFor(askings.meanWeeklyUsed),
      askingFor(askings.nextFiveHourBack),
      askingFor(askings.nextSevenDayBack),
      askingFor(askings.nextSevenDayEnd),
      groupRead(),
    ])
  return buildClaudeUsageResponse(
    { meanWeeklyUsed, nextFiveHourBack, nextSevenDayBack, nextSevenDayEnd },
    nowMs,
    rungs,
    readouts
  )
}
