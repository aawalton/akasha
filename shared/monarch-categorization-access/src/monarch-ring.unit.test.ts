import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { z } from "zod"
import { fetchRingCountsFromMonarch } from "./monarch-ring"

const COOKIE = "csrftoken=csrf-value; sessionid=whatever"
const NOW = new Date("2026-08-13T12:00:00.000Z")
const DAY_MS = 86_400_000

const dayBefore = (days: number) =>
  new Date(NOW.getTime() - days * DAY_MS).toISOString().slice(0, 10)

const READING = {
  data: {
    unreviewed: { totalCount: 19 },
    total: { totalCount: 2951 },
    intake: { totalCount: 246 },
  },
}

const askedFor = z.object({
  variables: z.object({
    backlog: z.object({ startDate: z.string(), endDate: z.string(), needsReview: z.boolean() }),
    all: z.object({ startDate: z.string(), endDate: z.string() }),
    recent: z.object({ startDate: z.string(), endDate: z.string() }),
  }),
})

const realFetch = globalThis.fetch

let asked: z.infer<typeof askedFor> | null = null
let answer: () => Response = () => Response.json(READING)

beforeEach(() => {
  asked = null
  answer = () => Response.json(READING)
  globalThis.fetch = async (_input, init) => {
    asked = askedFor.parse(JSON.parse(String(init?.body)))
    return answer()
  }
})

afterEach(() => {
  globalThis.fetch = realFetch
})

function askedOrThrow(): z.infer<typeof askedFor> {
  if (asked === null) throw new Error("Monarch was never asked, so there is nothing to judge")
  return asked
}

describe("the windows the ring asks Monarch for", () => {
  test("measures the backlog over a year, ending today", async () => {
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    const { backlog } = askedOrThrow().variables
    expect(backlog.startDate).toBe(dayBefore(365))
    expect(backlog.endDate).toBe(dayBefore(0))
    expect(backlog.needsReview).toBe(true)
  })

  test("measures the intake over a month, ending today", async () => {
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    const { recent } = askedOrThrow().variables
    expect(recent.startDate).toBe(dayBefore(30))
    expect(recent.endDate).toBe(dayBefore(0))
  })

  test("asks the year's total over its own window rather than the intake's", async () => {
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    const { all, recent } = askedOrThrow().variables
    expect(all.startDate).toBe(dayBefore(365))
    expect(all.startDate).not.toBe(recent.startDate)
  })
})

describe("what the ring reads back", () => {
  test("takes each count from its own alias", async () => {
    expect(await fetchRingCountsFromMonarch(COOKIE, NOW)).toEqual({
      unreviewed: 19,
      total: 2951,
      intake: 246,
    })
  })

  test("throws rather than reading a body that carries no intake", async () => {
    answer = () =>
      Response.json({ data: { unreviewed: { totalCount: 19 }, total: { totalCount: 2951 } } })
    await expect(fetchRingCountsFromMonarch(COOKIE, NOW)).rejects.toThrow()
  })
})
