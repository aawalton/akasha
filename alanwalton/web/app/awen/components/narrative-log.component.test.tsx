import { afterEach, describe, expect, test } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ClientBeat } from "../lib/client-session"
import { NarrativeLog } from "./narrative-log"

afterEach(() => {
  cleanup()
})

describe("NarrativeLog — newest-divider frontier guard", () => {
  test("draws exactly one 'newest' divider at the max-turn beat", () => {
    const beats: readonly ClientBeat[] = [
      { type: "narrative", text: "Turn one prose.", turn: 1 },
      { type: "narrative", text: "Turn two prose.", turn: 2 },
    ]
    render(<NarrativeLog beats={beats} />)
    expect(screen.getAllByText("newest")).toHaveLength(1)
    expect(screen.getByText("Turn two prose.")).toBeDefined()
  })

  test("draws NO divider when no beat carries a turn (phantom-divider fix)", () => {
    const beats: readonly ClientBeat[] = [
      { type: "narrative", text: "Turnless prose one." },
      { type: "system", title: "A System Note" },
      { type: "narrative", text: "Turnless prose two." },
    ]
    render(<NarrativeLog beats={beats} />)
    expect(screen.queryByText("newest")).toBeNull()
    expect(screen.getByText("Turnless prose one.")).toBeDefined()
    expect(screen.getByText("A System Note")).toBeDefined()
    expect(screen.getByText("Turnless prose two.")).toBeDefined()
  })

  test("renders a title-only system beat's title (no empty card)", () => {
    const beats: readonly ClientBeat[] = [{ type: "system", title: "Floor Cleared", turn: 5 }]
    render(<NarrativeLog beats={beats} />)
    expect(screen.getByText("Floor Cleared")).toBeDefined()
  })

  test("renders the empty-session state when beats is null", () => {
    render(<NarrativeLog beats={null} />)
    expect(screen.getByText(/no session is live yet/i)).toBeDefined()
  })
})
