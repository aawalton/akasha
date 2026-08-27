import { describe, expect, test } from "bun:test"
import { createRingReader } from "./ring-reading"

const AT = (ms: number) => new Date(ms)
const MINUTE = 60_000
const READING = { unreviewed: 4, total: 100, intake: 9 }

function answering(counts = READING) {
  let calls = 0
  return {
    calls: () => calls,
    fetchCounts: async () => {
      calls++
      return counts
    },
  }
}

function refusing() {
  let calls = 0
  return {
    calls: () => calls,
    fetchCounts: async () => {
      calls++
      throw new Error("Monarch answered 401 for the ring counts")
    },
  }
}

describe("createRingReader", () => {
  test("serves what it read", async () => {
    const feed = answering()
    const reader = createRingReader({ fetchCounts: feed.fetchCounts })
    expect(await reader.read(AT(0))).toEqual(READING)
  })

  test("asks Monarch once inside the refresh window, however often it is read", async () => {
    const feed = answering()
    const reader = createRingReader({ fetchCounts: feed.fetchCounts })

    await reader.read(AT(0))
    for (let i = 1; i <= 20; i++) await reader.read(AT(i * 10_000))

    expect(feed.calls()).toBe(1)
  })

  test("asks again once the refresh window has passed", async () => {
    const feed = answering()
    const reader = createRingReader({ fetchCounts: feed.fetchCounts })
    await reader.read(AT(0))
    await reader.read(AT(6 * MINUTE))
    expect(feed.calls()).toBe(2)
  })

  test("runs one refresh for a burst of reads that all find the reading expired", async () => {
    const feed = answering()
    const reader = createRingReader({ fetchCounts: feed.fetchCounts })

    await Promise.all([reader.read(AT(0)), reader.read(AT(0)), reader.read(AT(0))])
    expect(feed.calls()).toBe(1)
  })

  test("has no reading before it has ever read one", async () => {
    const feed = refusing()
    const reader = createRingReader({ fetchCounts: feed.fetchCounts })

    expect(await reader.read(AT(0))).toBeNull()
  })

  test("keeps serving a good reading through a refusal inside the bound", async () => {
    let refuse = false
    let calls = 0
    const reader = createRingReader({
      fetchCounts: async () => {
        calls++
        if (refuse) throw new Error("Monarch answered 401")
        return READING
      },
    })

    await reader.read(AT(0))
    refuse = true
    expect(await reader.read(AT(20 * MINUTE))).toEqual(READING)
    expect(calls).toBe(2)
  })

  test("REFUSES to serve a reading older than the staleness bound", async () => {
    let refuse = false
    const reader = createRingReader({
      fetchCounts: async () => {
        if (refuse) throw new Error("Monarch answered 401")
        return READING
      },
    })

    await reader.read(AT(0))
    refuse = true

    const served = await reader.read(AT(50 * MINUTE))
    expect(served).toBeNull()
  })

  test("recovers when Monarch comes back after the bound has passed", async () => {
    let refuse = false
    const reader = createRingReader({
      fetchCounts: async () => {
        if (refuse) throw new Error("Monarch answered 401")
        return READING
      },
    })

    await reader.read(AT(0))
    refuse = true
    expect(await reader.read(AT(50 * MINUTE))).toBeNull()

    refuse = false
    expect(await reader.read(AT(60 * MINUTE))).toEqual(READING)
  })

  test("serves a genuine empty backlog rather than mistaking it for no reading", async () => {
    const feed = answering({ unreviewed: 0, total: 3051, intake: 254 })
    const reader = createRingReader({ fetchCounts: feed.fetchCounts })

    expect(await reader.read(AT(0))).toEqual({ unreviewed: 0, total: 3051, intake: 254 })
  })
})
