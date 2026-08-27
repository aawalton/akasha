import { describe, expect, it } from "bun:test"
import { z } from "zod"
import {
  type Asked,
  askNamed,
  buildClaudeUsageResponse,
  type ClaudeUsageAnswers,
  type Fetcher,
  MEAN_WEEKLY_USED,
  NEXT_FIVE_HOUR_BACK,
  NEXT_SEVEN_DAY_BACK,
  NEXT_SEVEN_DAY_END,
} from "./api.claude-usage"

const NOW = Date.parse("2026-08-18T12:00:00.000Z")
const HOUR_MS = 3_600_000

const answered = (answer: {
  n: number
  value?: number | null
  over?: number | null
  rows?: readonly { values: Record<string, unknown> }[]
}): Asked => ({
  ok: true,
  answer: {
    value: null,
    over: null,
    faults: [],
    omitted: [],
    unfound: [],
    ...answer,
    rows: [...(answer.rows ?? [])],
  },
})

const NOTHING_MATCHED = answered({ n: 0 })

const resetsAt = (key: string, iso: string) =>
  answered({ n: 1, rows: [{ values: { [key]: iso } }] })

const ALL_ZERO: ClaudeUsageAnswers = {
  meanWeeklyUsed: answered({ n: 8, value: null, over: 0 }),
  nextFiveHourBack: NOTHING_MATCHED,
  nextSevenDayBack: NOTHING_MATCHED,
  nextSevenDayEnd: NOTHING_MATCHED,
}

const PayloadSchema = z.record(z.string(), z.unknown())
const bodyOf = async (response: Response): Promise<Record<string, unknown>> =>
  PayloadSchema.parse(await response.json())

describe("buildClaudeUsageResponse — a query that asked and matched nothing", () => {
  it("serves a figure-less payload rather than a failure when every query answered n=0", async () => {
    const response = buildClaudeUsageResponse(ALL_ZERO, NOW)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      avgUsedPct: 0,
      fiveHourBackAt: null,
      sevenDayBackAt: null,
      sevenDayEndsAt: null,
      tier: "blue",
    })
  })

  it("rounds the mean and parses each matched row's instant to epoch ms", async () => {
    const response = buildClaudeUsageResponse(
      {
        meanWeeklyUsed: answered({ n: 8, value: 38.375, over: 8 }),
        nextFiveHourBack: NOTHING_MATCHED,
        nextSevenDayBack: resetsAt("seven-day-resets-at", "2026-08-19T08:59:59.902088+00:00"),
        nextSevenDayEnd: resetsAt("seven-day-resets-at", "2026-08-20T22:59:59.513914+00:00"),
      },
      NOW
    )
    expect(await response.json()).toEqual({
      avgUsedPct: 38,
      fiveHourBackAt: null,
      sevenDayBackAt: Date.parse("2026-08-19T08:59:59.902088+00:00"),
      sevenDayEndsAt: Date.parse("2026-08-20T22:59:59.513914+00:00"),
      tier: "green",
    })
  })

  it("forbids any cache storing the credentialed body", () => {
    expect(buildClaudeUsageResponse(ALL_ZERO, NOW).headers.get("Cache-Control")).toBe("no-store")
  })
})

describe("buildClaudeUsageResponse — the tier bucketing of hours until sevenDayEndsAt", () => {
  const tierAt = async (hours: number): Promise<unknown> => {
    const answers: ClaudeUsageAnswers = {
      ...ALL_ZERO,
      nextSevenDayEnd: resetsAt(
        "seven-day-resets-at",
        new Date(NOW + hours * HOUR_MS).toISOString()
      ),
    }
    return (await bodyOf(buildClaudeUsageResponse(answers, NOW))).tier
  }

  it("reads under 24 hours as red", async () => expect(await tierAt(23)).toBe("red"))
  it("reads 24 up to 48 hours as yellow", async () => expect(await tierAt(24)).toBe("yellow"))
  it("reads 48 up to 72 hours as green", async () => expect(await tierAt(48)).toBe("green"))
  it("reads 72 hours or more as blue", async () => expect(await tierAt(72)).toBe("blue"))
  it("reads an end already past as red", async () => expect(await tierAt(-1)).toBe("red"))

  it("reads no end at all as blue", async () => {
    expect((await bodyOf(buildClaudeUsageResponse(ALL_ZERO, NOW))).tier).toBe("blue")
  })
})

describe("buildClaudeUsageResponse — a query that could not be answered at all", () => {
  const unasked: Asked = { ok: false, why: "the page query service replied 503" }

  it("refuses rather than passing a zero off as a real mean", async () => {
    const response = buildClaudeUsageResponse({ ...ALL_ZERO, meanWeeklyUsed: unasked }, NOW)
    expect(response.status).toBe(503)
    const body = await bodyOf(response)
    expect(body.avgUsedPct).toBeUndefined()
    expect(body.tier).toBeUndefined()
    expect(body.unread).toEqual([unasked.why])
  })

  it("refuses rather than passing a null off as nothing pending", async () => {
    const response = buildClaudeUsageResponse({ ...ALL_ZERO, nextSevenDayEnd: unasked }, NOW)
    expect(response.status).toBe(503)
    expect((await bodyOf(response)).sevenDayEndsAt).toBeUndefined()
  })

  it("names every query it could not read, not merely the first", async () => {
    const response = buildClaudeUsageResponse(
      {
        meanWeeklyUsed: unasked,
        nextFiveHourBack: unasked,
        nextSevenDayBack: unasked,
        nextSevenDayEnd: unasked,
      },
      NOW
    )
    expect((await bodyOf(response)).unread).toHaveLength(4)
  })

  it("refuses a row that matched but carries no readable instant", async () => {
    const response = buildClaudeUsageResponse(
      {
        ...ALL_ZERO,
        nextSevenDayEnd: answered({
          n: 1,
          rows: [{ values: { "seven-day-resets-at": "whenever" } }],
        }),
      },
      NOW
    )
    expect(response.status).toBe(503)
    expect(String((await bodyOf(response)).unread)).toContain("which is no instant")
  })

  it("refuses a row that matched but carries no such key", async () => {
    const response = buildClaudeUsageResponse(
      {
        ...ALL_ZERO,
        nextSevenDayEnd: answered({
          n: 1,
          rows: [{ values: { "five-hour-resets-at": "2026-08-20T22:00:00Z" } }],
        }),
      },
      NOW
    )
    expect(response.status).toBe(503)
    expect(String((await bodyOf(response)).unread)).toContain("no `seven-day-resets-at` text")
  })

  it("refuses a mean taken over pages that carried no value", async () => {
    const response = buildClaudeUsageResponse(
      { ...ALL_ZERO, meanWeeklyUsed: answered({ n: 8, value: null, over: 8 }) },
      NOW
    )
    expect(response.status).toBe(503)
  })
})

describe("askNamed — what a reply from the page query service means", () => {
  const replying = (body: unknown, status: number): Fetcher => {
    return () => Promise.resolve(Response.json(body, { status }))
  }
  const unreachable: Fetcher = () => Promise.reject(new Error("ECONNREFUSED"))

  const NOTHING_BODY = { n: 0, rows: [], groups: [], value: null, over: null }
  const MEAN_BODY = { n: 8, rows: [], groups: [], value: 38.375, over: 8 }

  it("asks the page query service the named query at its in-cluster address", async () => {
    let asking = ""
    await askNamed(NEXT_SEVEN_DAY_END, (url) => {
      asking = url
      return Promise.resolve(Response.json(NOTHING_BODY, { status: 200 }))
    })
    expect(asking).toBe(
      `http://page-query-service.page-query-service.svc.cluster.local:8787/q/${NEXT_SEVEN_DAY_END}`
    )
  })

  it("takes n=0 as an answer", async () => {
    const asked = await askNamed(NEXT_FIVE_HOUR_BACK, replying(NOTHING_BODY, 200))
    expect(asked.ok).toBe(true)
    if (asked.ok) expect(asked.answer.n).toBe(0)
  })

  it("takes a reduced value as an answer", async () => {
    const asked = await askNamed(MEAN_WEEKLY_USED, replying(MEAN_BODY, 200))
    expect(asked.ok).toBe(true)
    if (asked.ok) expect(asked.answer.over).toBe(8)
  })

  it("takes an unnamed query as no answer at all", async () => {
    const asked = await askNamed(NEXT_SEVEN_DAY_BACK, replying({ error: "no query is named" }, 404))
    expect(asked.ok).toBe(false)
    if (!asked.ok) expect(asked.why).toContain("404")
  })

  it("takes an unreached page type as no answer at all", async () => {
    const asked = await askNamed(NEXT_SEVEN_DAY_END, replying({ error: "unreached" }, 503))
    expect(asked.ok).toBe(false)
    if (!asked.ok) expect(asked.why).toContain("503")
  })

  it("takes a service it cannot reach as no answer at all", async () => {
    const asked = await askNamed(MEAN_WEEKLY_USED, unreachable)
    expect(asked.ok).toBe(false)
    if (!asked.ok) expect(asked.why).toContain("went unasked")
  })

  it("takes a reply in an unreadable shape as no answer at all", async () => {
    const asked = await askNamed(MEAN_WEEKLY_USED, replying({ rows: [] }, 200))
    expect(asked.ok).toBe(false)
  })

  it("carries a service failure through to a refusal, not a payload", async () => {
    const asked = await askNamed(NEXT_SEVEN_DAY_END, replying({ error: "unreached" }, 503))
    expect(buildClaudeUsageResponse({ ...ALL_ZERO, nextSevenDayEnd: asked }, NOW).status).toBe(503)
  })

  it("carries an n=0 through to a payload carrying a null figure", async () => {
    const asked = await askNamed(NEXT_FIVE_HOUR_BACK, replying(NOTHING_BODY, 200))
    const response = buildClaudeUsageResponse({ ...ALL_ZERO, nextFiveHourBack: asked }, NOW)
    expect(response.status).toBe(200)
    expect((await bodyOf(response)).fiveHourBackAt).toBeNull()
  })
})
