import { describe, expect, it } from "bun:test"
import type { Beat, ChapterEntry } from "@alanwalton/tower-core/state-schema"
import { renderChapter } from "./render-chapter"

const chapter: ChapterEntry = {
  number: 1,
  title: "The Cistern",
  floor: 1,
  startBeat: "b0",
  endBeat: "b2",
  status: "closed",
}

describe("renderChapter", () => {
  it("renders the chapter title as an H1 heading", () => {
    const out = renderChapter(chapter, [])
    expect(out.text.startsWith("# The Cistern")).toBe(true)
  })

  it("renders a narrative beat as its prose verbatim", () => {
    const beats: Beat[] = [
      { id: "b0", turn: 0, type: "narrative", text: "Cold stone against your face." },
    ]
    const out = renderChapter(chapter, beats)
    expect(out.text).toContain("Cold stone against your face.")
  })

  it("renders a system beat as a clean card with its title and lines", () => {
    const beats: Beat[] = [
      {
        id: "b1",
        turn: 0,
        type: "system",
        title: "The Tower · Soul Appraisal",
        lines: ["DESIGNATION   Alan", "TIER          1  (Threshold)"],
      },
    ]
    const out = renderChapter(chapter, beats)
    expect(out.text).toContain("**The Tower · Soul Appraisal**")
    expect(out.text).toContain("DESIGNATION   Alan")
    expect(out.text).toContain("TIER          1  (Threshold)")
  })

  it("computes a whitespace word count over the rendered text", () => {
    const beats: Beat[] = [{ id: "b0", turn: 0, type: "narrative", text: "one two three four" }]
    const out = renderChapter(chapter, beats)
    expect(out.wordCount).toBe(7)
  })

  it("SAFETY RAIL: never leaks a coordinator-only field present on a beat", () => {
    const leaky = {
      id: "b0",
      turn: 0,
      type: "narrative" as const,
      text: "Visible prose.",
      designerNotes: "SECRET-LOOP-MATERIAL-DO-NOT-LEAK",
      coordinatorHint: "ALSO-SECRET",
    }
    const out = renderChapter(chapter, [leaky])
    expect(out.text).toContain("Visible prose.")
    expect(out.text).not.toContain("SECRET-LOOP-MATERIAL-DO-NOT-LEAK")
    expect(out.text).not.toContain("ALSO-SECRET")
    expect(out.text).not.toContain("designerNotes")
  })
})
