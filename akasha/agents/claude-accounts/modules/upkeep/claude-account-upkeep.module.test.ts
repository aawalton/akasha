import { describe, expect, test } from "bun:test"
import type { Usage } from "../marking/claude-account-marking.module.code.ts"
import {
  inAccountOrder,
  RateLimited,
  RETRY_BACKOFF_MS,
  retriedOn429,
  shouldTriggerWindow,
} from "./claude-account-upkeep.module.code.ts"

const NOW = Date.parse("2026-01-01T00:00:00.000Z")

const HOUR_MS = 3_600_000

function usageOf(fiveHourResetsAt: string | null, sevenDayResetsAt: string | null): Usage {
  return {
    fiveHour: { percentUsed: 10, resetsAt: fiveHourResetsAt },
    sevenDay: { percentUsed: 20, resetsAt: sevenDayResetsAt },
  }
}

function isoAt(ms: number): string {
  return new Date(ms).toISOString()
}

function waitsRecorded(): {
  readonly waits: number[]
  readonly slept: (ms: number) => Promise<undefined>
} {
  const waits: number[] = []
  return {
    waits,
    slept: async (ms) => {
      waits.push(ms)
      return undefined
    },
  }
}

function linesRecorded(): {
  readonly lines: string[]
  readonly warned: (line: string) => undefined
} {
  const lines: string[] = []
  return {
    lines,
    warned: (line) => {
      lines.push(line)
    },
  }
}

describe("shouldTriggerWindow", () => {
  test("two windows still running trigger nothing", () => {
    const usage = usageOf(isoAt(NOW + HOUR_MS), isoAt(NOW + HOUR_MS * 24))
    expect(shouldTriggerWindow(usage, NOW)).toBe(false)
  })

  test("a five-hour window whose reset has passed triggers a window", () => {
    const usage = usageOf(isoAt(NOW - HOUR_MS), isoAt(NOW + HOUR_MS * 24))
    expect(shouldTriggerWindow(usage, NOW)).toBe(true)
  })

  test("a seven-day window whose reset has passed triggers a window", () => {
    const usage = usageOf(isoAt(NOW + HOUR_MS), isoAt(NOW - HOUR_MS))
    expect(shouldTriggerWindow(usage, NOW)).toBe(true)
  })

  test("two windows whose resets have passed trigger a window", () => {
    const usage = usageOf(isoAt(NOW - HOUR_MS), isoAt(NOW - HOUR_MS * 24))
    expect(shouldTriggerWindow(usage, NOW)).toBe(true)
  })

  test("a reset standing exactly at the moment asked about counts as passed", () => {
    const usage = usageOf(isoAt(NOW), isoAt(NOW + HOUR_MS * 24))
    expect(shouldTriggerWindow(usage, NOW)).toBe(true)
  })

  test("a window naming no reset triggers a window", () => {
    expect(shouldTriggerWindow(usageOf(null, isoAt(NOW + HOUR_MS)), NOW)).toBe(true)
    expect(shouldTriggerWindow(usageOf(isoAt(NOW + HOUR_MS), null), NOW)).toBe(true)
    expect(shouldTriggerWindow(usageOf(null, null), NOW)).toBe(true)
  })

  test("a reset that will not read triggers a window", () => {
    expect(shouldTriggerWindow(usageOf("nope", isoAt(NOW + HOUR_MS)), NOW)).toBe(true)
    expect(shouldTriggerWindow(usageOf("", isoAt(NOW + HOUR_MS)), NOW)).toBe(true)
    expect(shouldTriggerWindow(usageOf(isoAt(NOW + HOUR_MS), "later"), NOW)).toBe(true)
  })

  test("nothing here reads a clock of its own", () => {
    const usage = usageOf(isoAt(NOW + HOUR_MS), isoAt(NOW + HOUR_MS * 24))
    expect(shouldTriggerWindow(usage, NOW)).toBe(false)
    expect(shouldTriggerWindow(usage, NOW + HOUR_MS * 48)).toBe(true)
  })
})

describe("inAccountOrder", () => {
  test("accounts come back in the order their slugs sort in", () => {
    const every = [{ slug: "carol" }, { slug: "alice" }, { slug: "bob" }]
    expect(inAccountOrder(every).map((one) => one.slug)).toEqual(["alice", "bob", "carol"])
  })

  test("the list handed in is left as it was", () => {
    const every = [{ slug: "carol" }, { slug: "alice" }]
    inAccountOrder(every)
    expect(every.map((one) => one.slug)).toEqual(["carol", "alice"])
  })

  test("no account is an empty answer", () => {
    expect(inAccountOrder([])).toEqual([])
  })

  test("a list already in order comes back in that order", () => {
    const every = [{ slug: "alice" }, { slug: "bob" }]
    expect(inAccountOrder(every).map((one) => one.slug)).toEqual(["alice", "bob"])
  })

  test("what an account carries beside its slug comes through", () => {
    const every = [
      { slug: "bob", alias: 2 },
      { slug: "alice", alias: 1 },
    ]
    expect(inAccountOrder(every)).toEqual([
      { slug: "alice", alias: 1 },
      { slug: "bob", alias: 2 },
    ])
  })
})

describe("retriedOn429", () => {
  test("a first try that works waits for nothing", async () => {
    const { waits, slept } = waitsRecorded()
    const { lines, warned } = linesRecorded()
    const answer = await retriedOn429({
      tried: async () => "read",
      label: "the usage read",
      warned,
      slept,
    })
    expect(answer).toBe("read")
    expect(waits).toEqual([])
    expect(lines).toEqual([])
  })

  test("a rate limit is waited out and the try after it answers", async () => {
    const { waits, slept } = waitsRecorded()
    const { lines, warned } = linesRecorded()
    let tries = 0
    const answer = await retriedOn429({
      tried: async () => {
        tries++
        if (tries === 1) throw new RateLimited("https://example.test/usage")
        return "read"
      },
      label: "the usage read",
      warned,
      slept,
    })
    expect(answer).toBe("read")
    expect(tries).toBe(2)
    expect(waits).toEqual([RETRY_BACKOFF_MS[0] ?? 0])
    expect(lines.length).toBe(1)
    expect(lines[0]).toContain("the usage read")
  })

  test("a rate limit outlasting the backoff is thrown on", async () => {
    const { waits, slept } = waitsRecorded()
    const { warned } = linesRecorded()
    let tries = 0
    const thrown = retriedOn429({
      tried: async () => {
        tries++
        throw new RateLimited("https://example.test/usage")
      },
      label: "the usage read",
      warned,
      slept,
    })
    await expect(thrown).rejects.toBeInstanceOf(RateLimited)
    expect(waits).toEqual([...RETRY_BACKOFF_MS])
    expect(tries).toBe(RETRY_BACKOFF_MS.length + 1)
  })

  test("the url the rate limit named survives the backoff", async () => {
    const { slept } = waitsRecorded()
    const { warned } = linesRecorded()
    try {
      await retriedOn429({
        tried: async () => {
          throw new RateLimited("https://example.test/messages")
        },
        label: "the window trigger",
        warned,
        slept,
        backoffMs: [1],
      })
      expect.unreachable()
    } catch (thrown) {
      expect(thrown).toBeInstanceOf(RateLimited)
      expect((thrown as RateLimited).url).toBe("https://example.test/messages")
    }
  })

  test("a throw that is no rate limit goes straight out", async () => {
    const { waits, slept } = waitsRecorded()
    const { lines, warned } = linesRecorded()
    let tries = 0
    const thrown = retriedOn429({
      tried: async () => {
        tries++
        throw new Error("the endpoint answered 500")
      },
      label: "the usage read",
      warned,
      slept,
    })
    await expect(thrown).rejects.toThrow("the endpoint answered 500")
    expect(tries).toBe(1)
    expect(waits).toEqual([])
    expect(lines).toEqual([])
  })

  test("a backoff handed in stands in for the one this module names", async () => {
    const { waits, slept } = waitsRecorded()
    const { warned } = linesRecorded()
    let tries = 0
    const answer = await retriedOn429({
      tried: async () => {
        tries++
        if (tries < 3) throw new RateLimited("https://example.test/usage")
        return "read"
      },
      label: "the usage read",
      warned,
      slept,
      backoffMs: [1, 2, 3],
    })
    expect(answer).toBe("read")
    expect(waits).toEqual([1, 2])
  })

  test("a backoff naming no wait refuses the first rate limit", async () => {
    const { waits, slept } = waitsRecorded()
    const { warned } = linesRecorded()
    let tries = 0
    const thrown = retriedOn429({
      tried: async () => {
        tries++
        throw new RateLimited("https://example.test/usage")
      },
      label: "the usage read",
      warned,
      slept,
      backoffMs: [],
    })
    await expect(thrown).rejects.toBeInstanceOf(RateLimited)
    expect(tries).toBe(1)
    expect(waits).toEqual([])
  })
})
