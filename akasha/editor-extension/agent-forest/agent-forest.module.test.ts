import { describe, expect, test } from "bun:test"
import type { SeatMode } from "../seat-mode/seat-mode.module.code.ts"
import {
  agentPagesIn,
  assembleForest,
  countRows,
  countRunning,
  subagentKey,
} from "./agent-forest.module.code.ts"
import { NO_PLACES, NO_SUBAGENTS, row, subagent } from "./agent-forest.module.test-fixtures.ts"

const LIVE = (...ids: string[]): ReadonlySet<string> => new Set(ids)

describe("the seats a forest hangs together", () => {
  test("a seat hangs under the seat it names as its parent", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p")],
      LIVE("p", "c"),
      NO_SUBAGENTS,
      NO_PLACES
    )
    expect(roots.map((r) => r.name)).toEqual(["parent"])
    expect(roots[0]?.children.map((c) => c.name)).toEqual(["child"])
  })

  test("a seat answering to Alan is a root however it names its parent", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p", "alan")],
      LIVE("p", "c"),
      NO_SUBAGENTS,
      NO_PLACES
    )
    expect(roots.map((r) => r.name)).toEqual(["child", "parent"])
  })

  test("a seat naming a parent no row answers to is a root", () => {
    const roots = assembleForest([row("c", "child", "gone")], LIVE("c"), NO_SUBAGENTS, NO_PLACES)
    expect(roots.map((r) => r.name)).toEqual(["child"])
  })

  test("a seat naming itself as its parent is a root rather than its own child", () => {
    const roots = assembleForest([row("c", "child", "c")], LIVE("c"), NO_SUBAGENTS, NO_PLACES)
    expect(roots.map((r) => r.name)).toEqual(["child"])
    expect(roots[0]?.children).toEqual([])
  })

  test("a branch holding nothing running is dropped whole", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p")],
      LIVE(),
      NO_SUBAGENTS,
      NO_PLACES
    )
    expect(roots).toEqual([])
  })

  test("a stopped seat stands where something under it still runs", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p")],
      LIVE("c"),
      NO_SUBAGENTS,
      NO_PLACES
    )
    expect(roots.map((r) => r.name)).toEqual(["parent"])
    expect(roots[0]?.live).toBe(false)
    expect(roots[0]?.children.map((c) => c.live)).toEqual([true])
  })

  test("a seat naming no name is drawn under its id", () => {
    const roots = assembleForest([row("s1", null, null)], LIVE("s1"), NO_SUBAGENTS, NO_PLACES)
    expect(roots[0]?.name).toBe("s1")
  })

  test("a seat whose place no row states is headless", () => {
    const places: ReadonlyMap<string, SeatMode> = new Map([["a", "interactive"]])
    const roots = assembleForest(
      [row("a", "a", null), row("b", "b", null)],
      LIVE("a", "b"),
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
      LIVE("s1"),
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
    expect(drawn?.name).toBe("writing")
    expect(drawn?.live).toBe(true)
    expect(drawn?.state).toBe("working")
    expect(drawn?.color).toBe("ops.color.blue")
    expect(drawn?.at).toBe("/repo/at.ts")
  })

  test("a subagent naming no id it runs under names no page", () => {
    const roots = withSubagent(null, new Map([[subagentKey("ember", "ag1"), "/repo/at.ts"]]))
    expect(roots[0]?.children[0]?.at).toBeUndefined()
  })

  test("a subagent akasha holds no page for names none", () => {
    const roots = withSubagent("ag2", new Map([[subagentKey("ember", "ag1"), "/repo/at.ts"]]))
    expect(roots[0]?.children[0]?.at).toBeUndefined()
  })

  test("the subagents come after the seats under one parent", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "zeta", "p")],
      LIVE("p", "c"),
      new Map([["p", [subagent("t1", "aaa", [], null)]]]),
      NO_PLACES
    )
    expect(roots[0]?.children.map((c) => c.name)).toEqual(["zeta", "aaa"])
  })
})

describe("what a joined answer and a drawn forest are counted as", () => {
  test("a seat's own page is joined against the repository the answer named", () => {
    const roots = assembleForest(
      [{ ...row("s1", "ember", null), at: "pages/seat/ember.ts" }],
      LIVE("s1"),
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
      LIVE("s1"),
      NO_SUBAGENTS,
      NO_PLACES,
      undefined,
      null
    )
    expect(roots[0]?.at).toBeUndefined()
  })

  test("no subagent page is carried out of an answer naming no repository", () => {
    expect(
      agentPagesIn({ repo: null, rows: [], subagentPages: [{ seat: "a", own: "b", at: "c" }] })
        .bySubagent.size
    ).toBe(0)
  })

  test("a subagent page is joined against the repository the answer named", () => {
    const pages = agentPagesIn({
      repo: "/repo",
      rows: [],
      subagentPages: [{ seat: "ember", own: "ag1", at: "pages/x.ts" }],
    })
    expect(pages.bySubagent.get(subagentKey("ember", "ag1"))).toBe("/repo/pages/x.ts")
  })

  test("the rows and the running ones are counted apart", () => {
    const roots = assembleForest(
      [row("p", "parent", null), row("c", "child", "p")],
      LIVE("c"),
      new Map([["c", [subagent("t1", "writing", [subagent("t2", "deeper")])]]]),
      NO_PLACES
    )
    expect(countRows(roots)).toBe(4)
    expect(countRunning(roots)).toBe(3)
  })
})
