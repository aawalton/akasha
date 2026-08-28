import { afterEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { within } from "@testing-library/react"
import { createRoutesStub } from "react-router"

const mockSetProperty = mock((_args: unknown) => {})
mock.module("../../../../shared/pages-ui/src/supabase/use-set-property-optimistic.tsx", () => ({
  useSetPropertyOptimistic: () => mockSetProperty,
}))

const { PlayingSessionProvider } = await import("@shared/pages-ui/media/playing-session-context")
const { useReaderPlayFromSentence } = await import("./reader-narration-detail")

const MARKS = [
  { sentenceIndex: 0, startSec: 0 },
  { sentenceIndex: 1, startSec: 12.5 },
  { sentenceIndex: 2, startSec: 41 },
]

let capturedOnPlay: ((sentenceIndex: number) => void) | undefined
function Harness({ marks }: { marks: readonly { sentenceIndex: number; startSec: number }[] }) {
  capturedOnPlay = useReaderPlayFromSentence({
    pageId: "page-a",
    pageTypeSlug: "story-chapter",
    title: "Chapter A",
    audioNextHref: "/chapter-b",
    sentenceMarks: marks,
  })
  return null
}

afterEach(() => {
  capturedOnPlay = undefined
  cleanup()
})

function renderHarness(marks: readonly { sentenceIndex: number; startSec: number }[] = MARKS) {
  const Stub = createRoutesStub([
    {
      path: "/chapter-a",
      Component: () => (
        <PlayingSessionProvider>
          <Harness marks={marks} />
        </PlayingSessionProvider>
      ),
    },
  ])
  const { container } = render(<Stub initialEntries={["/chapter-a"]} />)
  return { el: container, ...within(container) }
}

function audioIn(view: { el: HTMLElement }): HTMLAudioElement {
  const el = view.el.querySelector("audio")
  if (el == null) throw new Error("expected the persistent <audio> element")
  return el
}

describe("useReaderPlayFromSentence — play-from-sentence action wiring (#15788)", () => {
  it("returns a REAL callback (the action the route threads down, not the inert noop)", () => {
    renderHarness()
    expect(typeof capturedOnPlay).toBe("function")
  })

  it("a generated sentence pick starts read-aloud, seeks to its startSec, and plays", () => {
    const view = renderHarness()
    act(() => {
      capturedOnPlay?.(1)
    })
    const audio = audioIn(view)
    expect(audio.currentTime).toBe(12.5)
    expect(audio.paused).toBe(false)
  })

  it("while read-aloud is already active, a pick seeks IN PLACE — no session restart", () => {
    const view = renderHarness()
    act(() => {
      capturedOnPlay?.(0)
    })
    const first = audioIn(view)
    act(() => {
      capturedOnPlay?.(2)
    })
    const after = audioIn(view)
    expect(after).toBe(first)
    expect(after.currentTime).toBe(41)
    expect(after.paused).toBe(false)
  })

  it("an UNGENERATED sentence pick starts the kokoro stream FROM that sentence (from-N, #15790)", () => {
    const view = renderHarness()
    act(() => {
      capturedOnPlay?.(9)
    })
    const audio = audioIn(view)
    expect(audio.getAttribute("src")).toBe("/api/media/page-a/audio/stream?fromSentence=9")
    expect(audio.paused).toBe(false)
  })

  it("a GENERATED pick stays on the stored render (regime split — NOT kokoro from-N, #15790)", () => {
    const view = renderHarness()
    act(() => {
      capturedOnPlay?.(1)
    })
    const audio = audioIn(view)
    expect(audio.getAttribute("src")).toBe("/api/media/page-a/audio?variant=read-aloud")
    expect(audio.currentTime).toBe(12.5)
  })
})
