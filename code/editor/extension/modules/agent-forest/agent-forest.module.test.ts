import { describe, expect, test } from "bun:test"
import {
  assembleForest,
  countRows,
  countRunning,
  sectionContextValue,
  sectionForest,
  sectionStopTargets,
  subagentKey,
} from "akasha/code/editor/extension/modules/agent-forest/agent-forest.module.code.ts"
import {
  NO_PLACES,
  NO_SUBAGENTS,
  row,
  subagent,
} from "akasha/code/editor/extension/modules/agent-forest/agent-forest.module.test-fixtures.ts"
import type { SeatMode } from "akasha/code/editor/extension/modules/seat-mode/seat-mode.module.code.ts"

const live = (...ids: string[]): ReadonlySet<string> => new Set(ids)

describe("the seats a forest hangs together", () => {
  test("a seat hangs under the seat it names as its parent", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p")],
      live("p", "c"),
      NO_SUBAGENTS,
      NO_PLACES
    )
    expect(roots.map((r) => r.label)).toEqual(["parent"])
    expect(roots[0]?.children.map((c) => c.label)).toEqual(["child"])
  })

  test("a seat answering to Alan is a root however it names its parent", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p", "alan")],
      live("p", "c"),
      NO_SUBAGENTS,
      NO_PLACES
    )
    expect(roots.map((r) => r.label)).toEqual(["child", "parent"])
  })

  test("a seat naming a parent no row answers to is a root", () => {
    const roots = assembleForest([row("c", "child", "gone")], live("c"), NO_SUBAGENTS, NO_PLACES)
    expect(roots.map((r) => r.label)).toEqual(["child"])
  })

  test("a seat naming itself as its parent is a root rather than its own child", () => {
    const roots = assembleForest([row("c", "child", "c")], live("c"), NO_SUBAGENTS, NO_PLACES)
    expect(roots.map((r) => r.label)).toEqual(["child"])
    expect(roots[0]?.children).toEqual([])
  })

  test("a branch holding nothing running is dropped whole", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p")],
      live(),
      NO_SUBAGENTS,
      NO_PLACES
    )
    expect(roots).toEqual([])
  })

  test("a stopped seat remains where something under it still runs", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p")],
      live("c"),
      NO_SUBAGENTS,
      NO_PLACES
    )
    expect(roots.map((r) => r.label)).toEqual(["parent"])
    expect(roots[0]?.live).toBe(false)
    expect(roots[0]?.children.map((c) => c.live)).toEqual([true])
  })

  test("a seat naming no name is drawn under its id", () => {
    const roots = assembleForest([row("s1", null, null)], live("s1"), NO_SUBAGENTS, NO_PLACES)
    expect(roots[0]?.label).toBe("s1")
  })

  test("a seat whose place no row states is headless", () => {
    const places: ReadonlyMap<string, SeatMode> = new Map([["a", "interactive"]])
    const roots = assembleForest(
      [row("a", "a", null), row("b", "b", null)],
      live("a", "b"),
      NO_SUBAGENTS,
      places
    )
    expect(roots.map((r) => r.place)).toEqual(["interactive", "headless"])
  })
})

describe("the subagents a seat carries", () => {
  const withSubagent = (agentId: string | null, pages: ReadonlyMap<string, string>) =>
    assembleForest(
      [row("s1", "ember", null)],
      live("s1"),
      new Map([["s1", [subagent("t1", "writing", [], agentId)]]]),
      NO_PLACES,
      "ops.color.blue",
      "/repo",
      { bySubagent: pages }
    )

  test("a subagent is keyed to its page by the seat that ran it and the id it runs under", () => {
    const roots = withSubagent("ag1", new Map([[subagentKey("ember", "ag1"), "/repo/at.ts"]]))
    const drawn = roots[0]?.children[0]
    expect(drawn?.kind).toBe("subagent")
    expect(drawn?.label).toBe("writing")
    expect(drawn?.live).toBe(true)
    expect(drawn?.state).toBe("working")
    expect(drawn?.color).toBe("ops.color.blue")
    expect(drawn?.at).toBe("/repo/at.ts")
  })

  test("a subagent naming no id it runs under names no page", () => {
    const roots = withSubagent(null, new Map([[subagentKey("ember", "ag1"), "/repo/at.ts"]]))
    expect(roots[0]?.children[0]?.at).toBeNull()
  })

  test("a subagent akasha holds no page for names none", () => {
    const roots = withSubagent("ag2", new Map([[subagentKey("ember", "ag1"), "/repo/at.ts"]]))
    expect(roots[0]?.children[0]?.at).toBeNull()
  })

  test("the subagents come after the seats under one parent", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "zeta", "p")],
      live("p", "c"),
      new Map([["p", [subagent("t1", "aaa", [], null)]]]),
      NO_PLACES
    )
    expect(roots[0]?.children.map((c) => c.label)).toEqual(["zeta", "aaa"])
  })
})

describe("what a joined answer and a drawn forest are counted as", () => {
  test("a seat's own page is joined against the repository the answer named", () => {
    const roots = assembleForest(
      [{ ...row("s1", "ember", null), at: "pages/seat/ember.ts" }],
      live("s1"),
      NO_SUBAGENTS,
      NO_PLACES,
      undefined,
      "/repo"
    )
    expect(roots[0]?.at).toBe("/repo/pages/seat/ember.ts")
  })

  test("an answer naming no repository leaves a row naming no page", () => {
    const roots = assembleForest(
      [{ ...row("s1", "ember", null), at: "pages/seat/ember.ts" }],
      live("s1"),
      NO_SUBAGENTS,
      NO_PLACES,
      undefined,
      null
    )
    expect(roots[0]?.at).toBeNull()
  })

  test("the rows and the running ones are counted apart", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p")],
      live("c"),
      new Map([["c", [subagent("t1", "writing", [subagent("t2", "deeper")])]]]),
      NO_PLACES
    )
    expect(countRows(roots)).toBe(4)
    expect(countRunning(roots)).toBe(3)
  })
})

describe("the sections the seats fall in", () => {
  const seated = (
    id: string,
    name: string,
    role: string | null,
    assignment: string | null,
    parent: string | null = null
  ) => ({ ...row(id, name, parent, "alan"), role, assignment })

  const sectioned = (rows: ReturnType<typeof seated>[]) =>
    sectionForest(
      assembleForest(rows, live(...rows.map((one) => one.id)), NO_SUBAGENTS, NO_PLACES),
      rows
    )

  test("personas come first, then handlers, then each game by name", () => {
    const drawn = sectioned([
      seated("z", "zeli", "game-master", "story-played/game-zeta"),
      seated("h", "alan", "handler", "domain/work-handled"),
      seated("g", "mari-gm", "game-master", "story-played/game-alpha"),
      seated("a", "amy", "definer", "initiative/work-defined"),
    ])
    expect(drawn.map((one) => one.label)).toEqual([
      "personas",
      "handlers",
      "game-alpha",
      "game-zeta",
    ])
    expect(drawn.map((one) => one.children.map((seat) => seat.label))).toEqual([
      ["amy"],
      ["alan"],
      ["mari-gm"],
      ["zeli"],
    ])
  })

  test("a handler assigned a game is under handlers", () => {
    const drawn = sectioned([seated("h", "alan", "handler", "story-played/game-alpha")])
    expect(drawn.map((one) => one.label)).toEqual(["handlers"])
  })

  test("an assignment that is no game leaves a seat under personas", () => {
    const drawn = sectioned([
      seated("b", "mari", "definer", "domain/work-defined"),
      seated("a", "amy", null, null),
    ])
    expect(drawn.map((one) => one.label)).toEqual(["personas"])
    expect(drawn[0]?.children.map((seat) => seat.label)).toEqual(["amy", "mari"])
  })

  test("a section with no seat is not drawn", () => {
    expect(sectioned([])).toEqual([])
  })

  test("a section is a top row keyed apart from every seat", () => {
    const drawn = sectioned([seated("a", "amy", "definer", null)])
    expect(drawn[0]?.kind).toBe("root")
    expect(drawn[0]?.key).toBe("section/personas")
    expect(drawn[0]?.at).toBeNull()
  })
})

describe("the seats a section's stop reaches", () => {
  const seated = (
    id: string,
    name: string,
    role: string | null,
    assignment: string | null,
    parent: string | null = null
  ) => ({ ...row(id, name, parent, parent === null ? "alan" : null), role, assignment })

  const rows = [
    seated("g", "mari-gm", "game-master", "story-played/game-alpha"),
    seated("s", "scribe", "worker", null, "g"),
    seated("o", "old-gm", "game-master", "story-played/game-alpha"),
    seated("k", "kid", "worker", null, "o"),
    seated("a", "amy", "definer", "initiative/work-defined"),
  ]

  const drawn = sectionForest(
    assembleForest(
      rows,
      live("g", "s", "k", "a"),
      new Map([["g", [subagent("t1", "writing", [], "ag1")]]]),
      NO_PLACES
    ),
    rows
  )

  test("every running seat under the section is reached, at whatever depth it hangs", () => {
    expect(sectionStopTargets(drawn, "section/game-alpha").map((one) => one.label)).toEqual([
      "mari-gm",
      "scribe",
      "kid",
    ])
  })

  test("a stopped seat, a subagent and a seat in another section are not reached", () => {
    const reached = sectionStopTargets(drawn, "section/game-alpha").map((one) => one.label)
    expect(reached).not.toContain("old-gm")
    expect(reached).not.toContain("writing")
    expect(reached).not.toContain("amy")
  })

  test("a section the forest holds no row for reaches nothing", () => {
    expect(sectionStopTargets(drawn, "section/game-gone")).toEqual([])
  })

  test("a section is drawn as stoppable only while a seat under it runs", () => {
    const stoppedOnly = sectionForest(
      assembleForest(
        [seated("q", "quiet", "game-master", "story-played/game-beta")],
        live(),
        new Map([["q", [subagent("t2", "lingering")]]]),
        NO_PLACES
      ),
      [seated("q", "quiet", "game-master", "story-played/game-beta")]
    )
    expect(drawn.map(sectionContextValue)).toEqual(["section.running", "section.running"])
    expect(stoppedOnly.map(sectionContextValue)).toEqual(["section"])
  })
})
