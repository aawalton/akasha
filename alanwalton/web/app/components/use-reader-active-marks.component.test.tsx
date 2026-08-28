import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { waitFor } from "@testing-library/react"
import { createRoutesStub } from "react-router"

const mockSetProperty = mock((_args: unknown) => {})
mock.module("../../../../shared/pages/ui/src/supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => mockSetProperty,
}))

const { KOKORO_STREAM_VARIANT } = await import("@shared/pages-ui/media/media-src")
const { PlayingSessionProvider, usePlayingSession } = await import(
  "@shared/pages-ui/media/playing-session-context"
)
const { useReaderActiveMarks } = await import("./use-reader-active-marks")

type Mark = { sentenceIndex: number; startSec: number }

const PAGE_ID = "page-a"
const SSR_MARKS: readonly Mark[] = [{ sentenceIndex: 0, startSec: 0 }]
const FROM_N_MARKS: readonly Mark[] = [
  { sentenceIndex: 5, startSec: 0 },
  { sentenceIndex: 6, startSec: 3.2 },
]

let capturedMarks: readonly Mark[] | undefined
let capturedSession: ReturnType<typeof usePlayingSession> | undefined

function Harness() {
  capturedSession = usePlayingSession()
  capturedMarks = useReaderActiveMarks({ pageId: PAGE_ID, ssrMarks: SSR_MARKS })
  return null
}

function kokoroInit(fromSentence?: number) {
  return {
    pageId: PAGE_ID,
    pageTypeSlug: "story-chapter" as const,
    pageHref: "/chapter-a",
    title: "Chapter A",
    medium: "audio" as const,
    variant: KOKORO_STREAM_VARIANT,
    speed: 1,
    nextHref: null,
    ...(fromSentence !== undefined ? { fromSentence } : {}),
  }
}

let fetchCalls: string[] = []
const realFetch = globalThis.fetch
function stubFetch(res: { ok: boolean; body: unknown }) {
  const stub: typeof fetch = Object.assign(
    (input: Parameters<typeof fetch>[0]) => {
      fetchCalls.push(String(input))
      return Promise.resolve(new Response(JSON.stringify(res.body), { status: res.ok ? 200 : 404 }))
    },
    { preconnect: realFetch.preconnect }
  )
  globalThis.fetch = stub
}

beforeEach(() => {
  fetchCalls = []
  try {
    globalThis.sessionStorage?.clear()
  } catch {}
})
afterEach(() => {
  capturedMarks = undefined
  capturedSession = undefined
  globalThis.fetch = realFetch
  cleanup()
})

function renderHarness() {
  const Stub = createRoutesStub([
    {
      path: "/chapter-a",
      Component: () => (
        <PlayingSessionProvider>
          <Harness />
        </PlayingSessionProvider>
      ),
    },
  ])
  render(<Stub initialEntries={["/chapter-a"]} />)
}

describe("useReaderActiveMarks — from-N / whole-chapter marks channel (#15790)", () => {
  it("returns the SSR (stored) marks and fetches nothing when no session is active", () => {
    stubFetch({ ok: true, body: { marks: FROM_N_MARKS } })
    renderHarness()
    expect(capturedMarks).toEqual(SSR_MARKS)
    expect(fetchCalls).toHaveLength(0)
  })

  it("fetches and feeds the LIVE from-N marks while a kokoro from-N session plays here", async () => {
    stubFetch({ ok: true, body: { marks: FROM_N_MARKS } })
    renderHarness()
    act(() => {
      capturedSession?.startSession(kokoroInit(5))
    })
    await waitFor(() => expect(capturedMarks).toEqual(FROM_N_MARKS))
    expect(fetchCalls.some((u) => u.includes(`/api/media/${PAGE_ID}/audio/marks`))).toBe(true)
    expect(fetchCalls.some((u) => u.includes("variant=kokoro&fromSentence=5"))).toBe(true)
  })

  it("fetches fromSentence=0 for a whole-chapter kokoro first listen (the bonus highlight)", async () => {
    stubFetch({ ok: true, body: { marks: FROM_N_MARKS } })
    renderHarness()
    act(() => {
      capturedSession?.startSession(kokoroInit())
    })
    await waitFor(() => expect(capturedMarks).toEqual(FROM_N_MARKS))
    expect(fetchCalls.some((u) => u.includes("fromSentence=0"))).toBe(true)
  })

  it("degrades to the SSR marks when the /marks fetch fails (never blocks playback)", async () => {
    stubFetch({ ok: false, body: {} })
    renderHarness()
    act(() => {
      capturedSession?.startSession(kokoroInit(5))
    })
    await waitFor(() => expect(fetchCalls.length).toBeGreaterThan(0))
    expect(capturedMarks).toEqual(SSR_MARKS)
  })

  it("degrades to the SSR marks when the /marks body is malformed (boundary parse)", async () => {
    stubFetch({ ok: true, body: { marks: [{ sentenceIndex: "nope", startSec: 0 }] } })
    renderHarness()
    act(() => {
      capturedSession?.startSession(kokoroInit(5))
    })
    await waitFor(() => expect(fetchCalls.length).toBeGreaterThan(0))
    expect(capturedMarks).toEqual(SSR_MARKS)
  })

  it("keeps the SSR marks for a stored read-aloud session (not kokoro → no fetch)", () => {
    stubFetch({ ok: true, body: { marks: FROM_N_MARKS } })
    renderHarness()
    act(() => {
      capturedSession?.startSession({ ...kokoroInit(), variant: "read-aloud" })
    })
    expect(capturedMarks).toEqual(SSR_MARKS)
    expect(fetchCalls).toHaveLength(0)
  })
})
