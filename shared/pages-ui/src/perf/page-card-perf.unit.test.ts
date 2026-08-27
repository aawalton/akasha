import { beforeEach, describe, expect, test } from "bun:test"
import {
  bindMutationId,
  clearPageCardPerf,
  findTokenByMutationId,
  getPageCardPerf,
  recordPglitePersisted,
  recordRoundTripSettled,
  recordVisibleUpdate,
  startInteraction,
} from "./page-card-perf"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function installWindowOnGlobalThis(): undefined {
  if (typeof window !== "undefined") return undefined
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: globalThis,
  })
  return undefined
}

beforeEach(() => {
  installWindowOnGlobalThis()
  clearPageCardPerf()
})

describe("startInteraction", () => {
  test("returns a token with a uuid interactionId and timing fields", () => {
    const before = performance.now()
    const token = startInteraction({
      pageId: "page-1",
      propertyId: "prop-1",
      eventTimeStamp: 123.5,
    })
    const after = performance.now()

    expect(token.interactionId).toMatch(UUID_RE)
    expect(token.startTimeStamp).toBe(123.5)
    expect(token.startNow).toBeGreaterThanOrEqual(before)
    expect(token.startNow).toBeLessThanOrEqual(after)
  })

  test("creates a buffer entry with null Ms fields and null mutationId", () => {
    const token = startInteraction({
      pageId: "page-1",
      propertyId: "prop-1",
      eventTimeStamp: 1,
    })

    const { entries } = getPageCardPerf()
    expect(entries).toHaveLength(1)
    const entry = entries[0]
    expect(entry).toBeDefined()
    if (entry === undefined) {
      return
    }
    expect(entry.interactionId).toBe(token.interactionId)
    expect(entry.pageId).toBe("page-1")
    expect(entry.propertyId).toBe("prop-1")
    expect(entry.startTimeStamp).toBe(1)
    expect(entry.startNow).toBe(token.startNow)
    expect(entry.mutationId).toBeNull()
    expect(entry.visibleMs).toBeNull()
    expect(entry.pgliteMs).toBeNull()
    expect(entry.roundTripMs).toBeNull()
  })

  test("emits a performance.mark named page-card.interaction:<id>:start", () => {
    const token = startInteraction({
      pageId: "p",
      propertyId: "q",
      eventTimeStamp: 0,
    })
    const marks = performance.getEntriesByName(
      `page-card.interaction:${token.interactionId}:start`,
      "mark"
    )
    expect(marks.length).toBeGreaterThanOrEqual(1)
  })
})

describe("bindMutationId / findTokenByMutationId", () => {
  test("sets the mutationId on the existing entry", () => {
    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    bindMutationId(token, "mutation-abc")

    const { entries } = getPageCardPerf()
    expect(entries[0]?.mutationId).toBe("mutation-abc")
  })

  test("findTokenByMutationId returns the original token", () => {
    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    bindMutationId(token, "mutation-xyz")

    const found = findTokenByMutationId("mutation-xyz")
    expect(found).not.toBeNull()
    expect(found?.interactionId).toBe(token.interactionId)
    expect(found?.startTimeStamp).toBe(token.startTimeStamp)
    expect(found?.startNow).toBe(token.startNow)
  })

  test("findTokenByMutationId returns null for an unknown mutationId", () => {
    startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    expect(findTokenByMutationId("nope")).toBeNull()
  })

  test("re-binding replaces the previous mutationId", () => {
    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    bindMutationId(token, "first")
    bindMutationId(token, "second")

    expect(findTokenByMutationId("first")).toBeNull()
    expect(findTokenByMutationId("second")?.interactionId).toBe(token.interactionId)
  })
})

describe("recordVisibleUpdate", () => {
  test("populates visibleMs with a finite non-negative number", () => {
    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    recordVisibleUpdate(token)

    const entry = getPageCardPerf().entries[0]
    expect(entry?.visibleMs).not.toBeNull()
    const ms = entry?.visibleMs
    expect(typeof ms).toBe("number")
    expect(Number.isFinite(ms ?? Number.NaN)).toBe(true)
    expect(ms).toBeGreaterThanOrEqual(0)
  })

  test("emits page-card.interaction:<id>:visible mark and measure", () => {
    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    recordVisibleUpdate(token)

    const name = `page-card.interaction:${token.interactionId}:visible`
    expect(performance.getEntriesByName(name, "mark").length).toBeGreaterThanOrEqual(1)
    expect(performance.getEntriesByName(name, "measure").length).toBeGreaterThanOrEqual(1)
  })
})

describe("recordPglitePersisted", () => {
  test("populates pgliteMs with a finite non-negative number", () => {
    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    recordPglitePersisted(token)

    const entry = getPageCardPerf().entries[0]
    expect(entry?.pgliteMs).not.toBeNull()
    const ms = entry?.pgliteMs
    expect(typeof ms).toBe("number")
    expect(Number.isFinite(ms ?? Number.NaN)).toBe(true)
    expect(ms).toBeGreaterThanOrEqual(0)
  })

  test("emits page-card.interaction:<id>:pglite mark and measure", () => {
    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    recordPglitePersisted(token)

    const name = `page-card.interaction:${token.interactionId}:pglite`
    expect(performance.getEntriesByName(name, "mark").length).toBeGreaterThanOrEqual(1)
    expect(performance.getEntriesByName(name, "measure").length).toBeGreaterThanOrEqual(1)
  })
})

describe("recordRoundTripSettled", () => {
  test("populates roundTripMs with a finite non-negative number", () => {
    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    recordRoundTripSettled(token)

    const entry = getPageCardPerf().entries[0]
    expect(entry?.roundTripMs).not.toBeNull()
    const ms = entry?.roundTripMs
    expect(typeof ms).toBe("number")
    expect(Number.isFinite(ms ?? Number.NaN)).toBe(true)
    expect(ms).toBeGreaterThanOrEqual(0)
  })

  test("emits page-card.interaction:<id>:round-trip mark and measure", () => {
    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    recordRoundTripSettled(token)

    const name = `page-card.interaction:${token.interactionId}:round-trip`
    expect(performance.getEntriesByName(name, "mark").length).toBeGreaterThanOrEqual(1)
    expect(performance.getEntriesByName(name, "measure").length).toBeGreaterThanOrEqual(1)
  })
})

describe("FIFO ring buffer", () => {
  test("caps at 200 entries; oldest is evicted on the 201st", () => {
    const first = startInteraction({
      pageId: "first",
      propertyId: "x",
      eventTimeStamp: 0,
    })
    for (let i = 0; i < 199; i++) {
      startInteraction({ pageId: `p${i}`, propertyId: "x", eventTimeStamp: 0 })
    }

    expect(getPageCardPerf().entries).toHaveLength(200)
    expect(getPageCardPerf().entries.some((e) => e.interactionId === first.interactionId)).toBe(
      true
    )

    startInteraction({ pageId: "overflow", propertyId: "x", eventTimeStamp: 0 })

    const { entries } = getPageCardPerf()
    expect(entries).toHaveLength(200)
    expect(entries.some((e) => e.interactionId === first.interactionId)).toBe(false)
  })
})

describe("clearPageCardPerf", () => {
  test("empties the ring buffer", () => {
    startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    expect(getPageCardPerf().entries).toHaveLength(2)

    clearPageCardPerf()
    expect(getPageCardPerf().entries).toHaveLength(0)
  })

  test("clears performance marks and measures with our prefix only", () => {
    performance.mark("unrelated-mark")

    const token = startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    recordVisibleUpdate(token)

    const startName = `page-card.interaction:${token.interactionId}:start`
    const visibleName = `page-card.interaction:${token.interactionId}:visible`
    expect(performance.getEntriesByName(startName, "mark").length).toBeGreaterThan(0)
    expect(performance.getEntriesByName(visibleName, "measure").length).toBeGreaterThan(0)

    clearPageCardPerf()

    expect(performance.getEntriesByName(startName, "mark")).toHaveLength(0)
    expect(performance.getEntriesByName(visibleName, "mark")).toHaveLength(0)
    expect(performance.getEntriesByName(visibleName, "measure")).toHaveLength(0)
    expect(performance.getEntriesByName("unrelated-mark", "mark").length).toBeGreaterThan(0)
    performance.clearMarks("unrelated-mark")
  })
})

describe("getPageCardPerf snapshot semantics", () => {
  test("returns a fresh entries array on each call", () => {
    startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })

    const first = getPageCardPerf()
    const second = getPageCardPerf()
    expect(first.entries).not.toBe(second.entries)

    expect(first.entries[0]).not.toBe(second.entries[0])
  })

  test("window.__pageCardPerf reflects the current state on each access", () => {
    expect(window.__pageCardPerf?.entries).toHaveLength(0)
    startInteraction({ pageId: "p", propertyId: "q", eventTimeStamp: 0 })
    expect(window.__pageCardPerf?.entries).toHaveLength(1)
  })
})
