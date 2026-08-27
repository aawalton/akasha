import { afterEach, describe, expect, mock, spyOn, test } from "bun:test"
import { createFetchStub } from "./fetch-stub"
import { runDraw } from "./idle-draw-verb"
import { idleGameStore } from "./idle-game-store"
import { clearReveal, getRevealSnapshot } from "./reveal-store"

function jsonStub(body: unknown, status = 200) {
  const fetchMock = mock(
    (_input: Parameters<typeof fetch>[0], _init?: Parameters<typeof fetch>[1]) =>
      Promise.resolve(
        new Response(JSON.stringify(body), {
          status,
          headers: { "content-type": "application/json" },
        })
      )
  )
  globalThis.fetch = createFetchStub(fetchMock)
  return fetchMock
}

const DRAW_SAVE = { resource: 0, lastTickAt: 0, teammates: [], activeTeam: [] }
const APPLIED_REVEAL = {
  outcome: { applied: true },
  save: DRAW_SAVE,
  reveal: {
    slug: "aura",
    name: "Aura",
    image: "img-1",
    isNewImage: true,
    isNewGirl: false,
    stars: 3,
    starUp: false,
  },
}

describe("runDraw — single-flight POST of {type:'draw'}", () => {
  const originalFetch = globalThis.fetch
  const adoptSpy = spyOn(idleGameStore, "adoptServerSave").mockImplementation(() => {})
  const flushSpy = spyOn(idleGameStore, "flushPersist").mockResolvedValue(undefined)
  afterEach(() => {
    globalThis.fetch = originalFetch
    clearReveal()
    adoptSpy.mockClear()
    flushSpy.mockClear()
  })

  test("POSTs the draw intent to /api/save", async () => {
    const fetchMock = jsonStub(APPLIED_REVEAL)
    await runDraw()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const call = fetchMock.mock.calls[0]
    if (call === undefined) throw new Error("fetch not called")
    const [url, init] = call
    expect(url).toBe("/api/save")
    expect(init?.method).toBe("POST")
    expect(init?.body).toBe(JSON.stringify({ type: "draw" }))
  })

  test("flushes the debounced persist BEFORE POSTing (server draws on current state)", async () => {
    let flushCallsAtPost = -1
    const fetchMock = mock(
      (_input: Parameters<typeof fetch>[0], _init?: Parameters<typeof fetch>[1]) => {
        flushCallsAtPost = flushSpy.mock.calls.length
        return Promise.resolve(
          new Response(JSON.stringify(APPLIED_REVEAL), {
            status: 200,
            headers: { "content-type": "application/json" },
          })
        )
      }
    )
    globalThis.fetch = createFetchStub(fetchMock)
    await runDraw()
    expect(flushSpy).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(flushCallsAtPost).toBe(1)
  })

  test("applied pull reconciles the store to the returned save AND pushes the reveal", async () => {
    jsonStub(APPLIED_REVEAL)
    await runDraw()
    expect(adoptSpy).toHaveBeenCalledWith(DRAW_SAVE)
    expect(getRevealSnapshot()?.slug).toBe("aura")
  })

  test("rejected draw (applied:false) reconciles nothing and pushes nothing", async () => {
    jsonStub({ outcome: { applied: false }, save: DRAW_SAVE, reveal: null })
    await runDraw()
    expect(adoptSpy).not.toHaveBeenCalled()
    expect(getRevealSnapshot()).toBeNull()
  })

  test("non-ok response reconciles nothing and pushes nothing (swallowed, mirror-not-driver)", async () => {
    jsonStub(APPLIED_REVEAL, 500)
    await runDraw()
    expect(adoptSpy).not.toHaveBeenCalled()
    expect(getRevealSnapshot()).toBeNull()
  })
})
