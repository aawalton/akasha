import { describe, expect, test } from "bun:test"
import type { GachaGirl, GameState, Teammate } from "./core/types"
import { createIdleGameStore } from "./idle-game-store"
import { type IdleSave, parseIdleSave } from "./idle-save"

const NOW = 5_000_000
const TEST_SLUGS = ["aura", "abby", "aelwyn"] as const

const TEST_TEAMMATES: readonly Teammate[] = TEST_SLUGS.map((slug) => ({
  slug,
  name: slug,
  color: "#fff",
  portrait: "p",
  flavor: "f",
  cost: 0,
  rate: 10,
  rank: 1,
  level: null,
  stage: "s",
}))

function roster(): { girls: Record<string, GachaGirl>; cycleDraws: number } {
  const girls: Record<string, GachaGirl> = {}
  for (const slug of TEST_SLUGS) girls[slug] = { stars: 0, dupeProgress: 0, images: [] }
  return { girls, cycleDraws: 0 }
}

function rawSave(resource: number, auraRank = 1): unknown {
  return {
    resource,
    teammates: TEST_TEAMMATES.map((t) => (t.slug === "aura" ? { ...t, rank: auraRank } : t)),
    lastTickAt: NOW,
    synergyMatrix: {},
    gacha: roster(),
    ranksZeroIndexed: true,
  }
}

function rankOf(state: GameState | null, slug: string): number {
  return state?.teammates.find((t) => t.slug === slug)?.rank ?? -1
}

function recordingFetch(): {
  calls: ReadonlyArray<{ url: string; init?: RequestInit }>
  fetch: (url: string, init?: RequestInit) => Promise<Response>
} {
  const calls: Array<{ url: string; init?: RequestInit }> = []
  return {
    calls,
    fetch: (url, init) => {
      calls.push({ url, init })
      return Promise.resolve(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
      )
    },
  }
}

function persistedSave(init: RequestInit | undefined): IdleSave {
  const body = init?.body
  if (typeof body !== "string") throw new Error("persist call had no string body")
  return parseIdleSave(JSON.parse(body))
}

function persistedAuraRank(init: RequestInit | undefined): number {
  return persistedSave(init).teammates.find((t) => t.slug === "aura")?.rank ?? -1
}

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

describe("createIdleGameStore", () => {
  test("load('ready') marks ready and takes authority over the banked state", () => {
    const store = createIdleGameStore({ now: () => NOW })
    store.load(rawSave(500), "ready")
    expect(store.getSnapshot().status).toBe("ready")
    expect(store.getSnapshot().state?.resource).toBe(500)
  })

  test("load('signin') / load('nosave') set status without a state", () => {
    const signin = createIdleGameStore({ now: () => NOW })
    signin.load(undefined, "signin")
    expect(signin.getSnapshot().status).toBe("signin")
    expect(signin.getSnapshot().state).toBeNull()

    const nosave = createIdleGameStore({ now: () => NOW })
    nosave.load(undefined, "nosave")
    expect(nosave.getSnapshot().status).toBe("nosave")
    expect(nosave.getSnapshot().state).toBeNull()
  })

  test("dispatch applies locally and FINALLY — the rank climbs with no server round-trip", () => {
    const store = createIdleGameStore({
      fetch: () => new Promise<Response>(() => {}),
      now: () => NOW,
    })
    store.load(rawSave(100_000), "ready")
    store.dispatch({ type: "train", slug: "aura" })
    expect(rankOf(store.getSnapshot().state, "aura")).toBe(2)
    expect(store.getSnapshot().error).toBeNull()
  })

  test("a rejected dispatch surfaces the reason and leaves state untouched", () => {
    const store = createIdleGameStore({
      fetch: () => new Promise<Response>(() => {}),
      now: () => NOW,
    })
    store.load(rawSave(0), "ready")
    store.dispatch({ type: "train", slug: "aura" })
    expect(rankOf(store.getSnapshot().state, "aura")).toBe(1)
    expect(store.getSnapshot().error).toEqual({ key: "train:aura", reason: "insufficient" })
    store.dispatch({ type: "team", members: ["abby", "aura"] })
    expect(store.getSnapshot().error).toBeNull()
  })

  test("the flip-flop is structurally impossible: a stale load after local intents is a no-op", () => {
    const store = createIdleGameStore({
      fetch: () => new Promise<Response>(() => {}),
      now: () => NOW,
    })
    store.load(rawSave(100_000, 1), "ready")
    store.dispatch({ type: "train", slug: "aura" })
    const afterTrain = store.getSnapshot().state
    expect(rankOf(afterTrain, "aura")).toBe(2)

    store.load(rawSave(999_999, 1), "ready")
    expect(rankOf(store.getSnapshot().state, "aura")).toBe(2)
    expect(store.getSnapshot().state?.resource).toBe(afterTrain?.resource)
    expect(store.getSnapshot().state?.resource).not.toBe(999_999)
  })

  test("dispatch schedules a debounced whole-blob persist of the ONE state", async () => {
    const rec = recordingFetch()
    const store = createIdleGameStore({ fetch: rec.fetch, now: () => NOW, persistDebounceMs: 1 })
    store.load(rawSave(100_000), "ready")
    store.dispatch({ type: "train", slug: "aura" })
    expect(rec.calls.length).toBe(0)
    await wait(10)
    expect(rec.calls.length).toBe(1)
    expect(rec.calls[0]?.url).toBe("/api/save")
    expect(rec.calls[0]?.init?.method).toBe("POST")
    expect(persistedAuraRank(rec.calls[0]?.init)).toBe(2)
  })

  test("flushPersist forces the pending persist immediately (draw's flush-before-POST)", async () => {
    const rec = recordingFetch()
    const store = createIdleGameStore({
      fetch: rec.fetch,
      now: () => NOW,
      persistDebounceMs: 100_000,
    })
    store.load(rawSave(100_000), "ready")
    store.dispatch({ type: "train", slug: "aura" })
    expect(rec.calls.length).toBe(0)
    await store.flushPersist()
    expect(rec.calls.length).toBe(1)
    expect(persistedAuraRank(rec.calls[0]?.init)).toBe(2)
  })

  test("adoptServerSave moves state forward (the draw round-trip's forward adopt)", () => {
    const store = createIdleGameStore({
      fetch: () => new Promise<Response>(() => {}),
      now: () => NOW,
    })
    store.load(rawSave(100_000, 1), "ready")
    store.dispatch({ type: "train", slug: "aura" })
    store.adoptServerSave(rawSave(50_000, 2))
    expect(store.getSnapshot().state?.resource).toBe(50_000)
    expect(rankOf(store.getSnapshot().state, "aura")).toBe(2)
  })
})
