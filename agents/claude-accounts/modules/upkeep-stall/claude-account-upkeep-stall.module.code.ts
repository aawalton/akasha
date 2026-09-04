import type { Value } from "@akasha/pages-system/page-value"
import {
  UPKEEP_PERIOD_MS,
  UPKEEP_RENEWAL_MARGIN_MS,
} from "../oauth/claude-account-oauth.module.code.ts"
import { accountBesideIn, everyAccountIn } from "../reading/claude-account-reading.module.code.ts"

export const ACCESS_TOKEN_EXPIRES_AT = "accessTokenExpiresAt"

export const USAGE_READ_AT = "usageReadAt"

const NOTHING_BESIDE = "nothing stands beside its page, or nothing that parsed"

const MS_AN_HOUR = 60 * 60 * 1000

const HOUR_DECIMALS = 1

// The upkeep renews a token once its remaining life is under the margin, and passes on a period
// whose first pass may be deferred by one further period. Two periods is therefore the longest a
// pass can legitimately be late.
const PERIODS_A_PASS_MAY_BE_LATE = 2

// A missed pass with a whole further pass of slack on top.
const PERIODS_OF_USAGE_SLACK = 3

export const EXPIRY_FLOOR_MS =
  UPKEEP_RENEWAL_MARGIN_MS - PERIODS_A_PASS_MAY_BE_LATE * UPKEEP_PERIOD_MS

export const USAGE_CEILING_MS = PERIODS_OF_USAGE_SLACK * UPKEEP_PERIOD_MS

export type StallVerdict =
  | "current"
  | "expired"
  | "expiry-behind"
  | "usage-behind"
  | "never-reached"
  | "unread"

export type AccountReading = {
  readonly slug: string
  readonly beside: Value | null
  readonly why: string | null
}

export type StallEntry = {
  readonly slug: string
  readonly verdict: StallVerdict
  readonly detail: string
}

export type UpkeepStall = {
  readonly pages: number
  readonly judged: number
  readonly current: number
  readonly stalled: readonly string[]
  readonly unread: readonly string[]
  readonly entries: readonly StallEntry[]
}

function hoursOf(ms: number): string {
  return `${(ms / MS_AN_HOUR).toFixed(HOUR_DECIMALS)}h`
}

function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

type Stamp = { readonly at: number } | { readonly absent: true } | { readonly why: string }

function stampAt(beside: Value, key: string): Stamp {
  const raw = beside[key]
  if (raw === undefined || raw === null) return { absent: true }
  if (typeof raw !== "string") {
    return { why: `${key} stands beside as ${typeof raw}, not a timestamp` }
  }
  const at = Date.parse(raw)
  if (Number.isNaN(at)) {
    return { why: `${key} stands beside as '${raw}', which is not a timestamp` }
  }
  return { at }
}

export function judgeAccount(reading: AccountReading, nowMs: number): StallEntry {
  const { slug } = reading
  if (reading.why !== null) return { slug, verdict: "unread", detail: reading.why }
  if (reading.beside === null) {
    return { slug, verdict: "unread", detail: "nothing was held to look at" }
  }

  const expiry = stampAt(reading.beside, ACCESS_TOKEN_EXPIRES_AT)
  const usage = stampAt(reading.beside, USAGE_READ_AT)

  if ("why" in expiry) return { slug, verdict: "unread", detail: expiry.why }
  if ("why" in usage) return { slug, verdict: "unread", detail: usage.why }

  if ("absent" in expiry && "absent" in usage) {
    return {
      slug,
      verdict: "never-reached",
      detail: `holds neither ${ACCESS_TOKEN_EXPIRES_AT} nor ${USAGE_READ_AT}, so upkeep has never reached it`,
    }
  }

  if ("absent" in expiry) {
    return {
      slug,
      verdict: "expiry-behind",
      detail: `holds no ${ACCESS_TOKEN_EXPIRES_AT}, so nothing here says its token was ever renewed`,
    }
  }

  const life = expiry.at - nowMs
  if (life <= 0) {
    return {
      slug,
      verdict: "expired",
      detail: `its token expired ${hoursOf(-life)} ago and upkeep is the only thing that renews one`,
    }
  }
  if (life < EXPIRY_FLOOR_MS) {
    return {
      slug,
      verdict: "expiry-behind",
      detail: `${hoursOf(life)} of token life left, under the ${hoursOf(EXPIRY_FLOOR_MS)} floor upkeep's own margin and period set`,
    }
  }

  if ("absent" in usage) {
    return {
      slug,
      verdict: "usage-behind",
      detail: `holds no ${USAGE_READ_AT}, so its eligibility stands on nothing upkeep read`,
    }
  }
  const since = nowMs - usage.at
  if (since > USAGE_CEILING_MS) {
    return {
      slug,
      verdict: "usage-behind",
      detail: `its usage was read ${hoursOf(since)} ago, past the ${hoursOf(USAGE_CEILING_MS)} ceiling, so its eligibility is frozen at whatever it then held`,
    }
  }

  return {
    slug,
    verdict: "current",
    detail: `${hoursOf(life)} of token life left, usage read ${hoursOf(since)} ago`,
  }
}

export function stallAcross(readings: readonly AccountReading[], nowMs: number): UpkeepStall {
  const entries = readings.map((one) => judgeAccount(one, nowMs))
  const unread = entries.filter((one) => one.verdict === "unread").map((one) => one.slug)
  const stalled = entries
    .filter((one) => one.verdict !== "current" && one.verdict !== "unread")
    .map((one) => one.slug)
  return {
    pages: readings.length,
    judged: entries.length - unread.length,
    current: entries.filter((one) => one.verdict === "current").length,
    stalled,
    unread,
    entries,
  }
}

export function stallLines(stall: UpkeepStall): readonly string[] {
  const lines = stall.entries.map((one) => `${one.slug}: ${one.verdict} — ${one.detail}`)
  lines.push(
    `${stall.current} of ${stall.pages} account page(s) current; ` +
      `${stall.stalled.length} behind upkeep, ${stall.unread.length} could not be looked at`
  )
  return lines
}

export function readingsIn(root: string): readonly AccountReading[] {
  return everyAccountIn(root).map((one) => {
    try {
      const beside = accountBesideIn(root, one.slug)
      // A page with nothing beside it is a failure to look rather than an account upkeep has
      // never reached: `accountBesideIn` answers an empty record both where the file is absent
      // and where it would not parse, and the two are not told apart here.
      if (beside === null || Object.keys(beside).length === 0) {
        return { slug: one.slug, beside: null, why: NOTHING_BESIDE }
      }
      return { slug: one.slug, beside, why: null }
    } catch (thrown) {
      return {
        slug: one.slug,
        beside: null,
        why: `what stands beside \`${one.slug}\` would not read: ${sayOf(thrown)}`,
      }
    }
  })
}
