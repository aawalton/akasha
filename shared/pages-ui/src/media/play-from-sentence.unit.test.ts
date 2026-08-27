import { describe, expect, it } from "bun:test"
import type { SentenceMark } from "@alanwalton/voice-core/voice/mark-schema"
import { planPlayFromSentence, shouldSeekInPlace } from "./play-from-sentence"
import type { ActiveSessionInit, PlayingSessionState } from "./playing-session"

const MARKS: readonly SentenceMark[] = [
  { sentenceIndex: 0, startSec: 0 },
  { sentenceIndex: 1, startSec: 12.5 },
  { sentenceIndex: 2, startSec: 41 },
]

const READ_ALOUD_INIT: ActiveSessionInit = {
  pageId: "page-a",
  pageTypeSlug: "story-chapter",
  pageHref: "/chapter-a",
  title: "Chapter A",
  medium: "audio",
  variant: "read-aloud",
  speed: 1,
  nextHref: null,
}

const active = (over: Partial<ActiveSessionInit>): PlayingSessionState => ({
  status: "active",
  ...READ_ALOUD_INIT,
  ...over,
})

describe("planPlayFromSentence — which action a sentence pick maps to", () => {
  it("a sentence WITH a mark → seek to its absolute startSec", () => {
    expect(planPlayFromSentence(MARKS, 1)).toEqual({ kind: "play", seconds: 12.5 })
  })

  it("the first sentence (startSec 0) is a play, not treated as absent", () => {
    expect(planPlayFromSentence(MARKS, 0)).toEqual({ kind: "play", seconds: 0 })
  })

  it("a sentence PAST the mark list → the ungenerated seam carrying its index", () => {
    expect(planPlayFromSentence(MARKS, 5)).toEqual({ kind: "ungenerated", startSentenceIndex: 5 })
  })

  it("no marks at all → every index is ungenerated (the dark path)", () => {
    expect(planPlayFromSentence([], 0)).toEqual({ kind: "ungenerated", startSentenceIndex: 0 })
  })
})

describe("shouldSeekInPlace — seek the loaded element vs (re)start the session", () => {
  it("active for the SAME page AND read-aloud variant → seek in place (no restart)", () => {
    expect(shouldSeekInPlace(active({}), { pageId: "page-a", variant: "read-aloud" })).toBe(true)
  })

  it("active for the same page but a DIFFERENT variant → must (re)start read-aloud", () => {
    expect(
      shouldSeekInPlace(active({ variant: "narrator-mara" }), {
        pageId: "page-a",
        variant: "read-aloud",
      })
    ).toBe(false)
  })

  it("active for a DIFFERENT page → must start the session here", () => {
    expect(
      shouldSeekInPlace(active({ pageId: "page-z" }), { pageId: "page-a", variant: "read-aloud" })
    ).toBe(false)
  })

  it("idle → must start the session", () => {
    expect(shouldSeekInPlace({ status: "idle" }, { pageId: "page-a", variant: "read-aloud" })).toBe(
      false
    )
  })
})
