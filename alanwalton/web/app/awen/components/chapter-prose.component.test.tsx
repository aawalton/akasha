import { afterEach, describe, expect, test } from "bun:test"
import { READER_PROSE_TYPOGRAPHY } from "@shared/pages-ui/components/reader-typography"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ClientProseSegment } from "../lib/client-story-session"
import { ChapterProse } from "./chapter-prose"

afterEach(() => {
  cleanup()
})

describe("ChapterProse — inline system windows", () => {
  test("segments: prose runs and a System card render inline, in authored order", () => {
    const segments: readonly ClientProseSegment[] = [
      { kind: "prose", text: "She crossed the threshold." },
      { kind: "system", title: "Threshold", lines: ["Floor 4 reached."] },
      { kind: "prose", text: "The air changed." },
    ]
    render(
      <ChapterProse
        title="A Turn"
        text="ignored flat text"
        segments={segments}
        showTitle
        muted={false}
      />
    )
    expect(screen.getByText("She crossed the threshold.")).toBeDefined()
    expect(screen.getByText("Floor 4 reached.")).toBeDefined()
    expect(screen.getByText("The air changed.")).toBeDefined()
    expect(screen.getByText("Threshold")).toBeDefined()
    expect(screen.queryByText("ignored flat text")).toBeNull()
  })

  test("unavailable segment: neutral placeholder, no counts or beat internals", () => {
    const segments: readonly ClientProseSegment[] = [
      { kind: "prose", text: "Before." },
      { kind: "unavailable" },
      { kind: "prose", text: "After." },
    ]
    render(<ChapterProse title="A Turn" text="flat" segments={segments} showTitle muted={false} />)
    expect(screen.getByText(/system window unavailable/i)).toBeDefined()
    expect(screen.queryByText(/marker/i)).toBeNull()
    expect(screen.queryByText(/beat/i)).toBeNull()
  })

  test("no segments: renders the flat text path unchanged (non-adopting turn)", () => {
    render(
      <ChapterProse
        title="A Turn"
        text={"Just prose.\n\nSecond paragraph."}
        showTitle
        muted={false}
      />
    )
    expect(screen.getByText("Just prose.")).toBeDefined()
    expect(screen.getByText("Second paragraph.")).toBeDefined()
  })

  test("no segments: an ATX heading line becomes a subhead", () => {
    render(<ChapterProse title="A Turn" text={"# The Deep\n\nBody."} showTitle muted={false} />)
    expect(screen.getByText("The Deep")).toBeDefined()
    expect(screen.getByText("Body.")).toBeDefined()
  })

  test("prose container adopts the shared canonical reading typography", () => {
    render(<ChapterProse title="A Turn" text={"Just prose."} showTitle muted={false} />)
    const proseContainer = screen.getByText("Just prose.").parentElement
    expect(proseContainer).not.toBeNull()
    for (const token of READER_PROSE_TYPOGRAPHY.split(" ")) {
      expect(proseContainer?.className.split(" ")).toContain(token)
    }
  })
})

describe("ChapterProse — titles + pastTurns render dials (#14521)", () => {
  test("showTitle=false: the per-turn heading does not render; prose still does", () => {
    render(
      <ChapterProse title="Hidden Heading" text="the prose body" showTitle={false} muted={false} />
    )
    expect(screen.queryByText("Hidden Heading")).toBeNull()
    expect(screen.getByText("the prose body")).toBeDefined()
  })

  test("muted=true: the title and prose recede to text-tertiary", () => {
    render(<ChapterProse title="A Turn" text="muted body" showTitle muted={true} />)
    expect(screen.getByText("A Turn").className).toContain("text-tertiary")
    const body = screen.getByText("muted body")
    expect(body.className).toContain("text-tertiary")
    expect(body.className).not.toContain("text-primary")
  })

  test("muted=true with a system segment: the inline card fades via the dim idiom", () => {
    const segments: readonly ClientProseSegment[] = [
      { kind: "prose", text: "past prose" },
      { kind: "system", title: "Ledger", lines: ["a past beat"] },
    ]
    render(<ChapterProse title="A Turn" text="flat" segments={segments} showTitle muted={true} />)
    expect(screen.getByText("past prose").className).toContain("text-tertiary")
    const cardFrame = screen.getByText("Ledger").parentElement
    expect(cardFrame?.className).toContain("opacity-60")
  })

  test("muted=false: full-contrast prose (text-primary), no dim", () => {
    render(<ChapterProse title="A Turn" text="live body" showTitle muted={false} />)
    expect(screen.getByText("live body").className).toContain("text-primary")
    expect(screen.getByText("live body").className).not.toContain("text-tertiary")
  })
})
