import { expect, test } from "bun:test"
import type { Drawn, DrawnItem, DrawnRow } from "../panel-reading/panel-reading.module.code.ts"
import {
  carried,
  everyRow,
  featureTimings,
  firstLine,
  glyphCount,
  judgeStatusBar,
  judgeTree,
  readsLogged,
  type TreeExpectation,
  timingReport,
} from "./panel-judging.module.code.ts"

function rowOf(over: Partial<DrawnRow> = {}): DrawnRow {
  return {
    label: "a row",
    id: "one",
    description: null,
    tooltip: null,
    resourceUri: "ops://colour",
    contextValue: null,
    hasCommand: true,
    drewNothing: null,
    children: [],
    ...over,
  }
}

function itemOf(over: Partial<DrawnItem> = {}): DrawnItem {
  return {
    id: "opsStatusBar.usage.session",
    priority: 1,
    text: "9%",
    tooltip: null,
    shown: true,
    ...over,
  }
}

function readingOf(over: Partial<Drawn> = {}): Drawn {
  return {
    activateError: null,
    panels: {},
    statusBar: [],
    channels: {},
    commands: [],
    ...over,
  }
}

function treeOf(rows: readonly DrawnRow[]): Drawn {
  return readingOf({ panels: { opsWorkTree: { registered: true, failure: null, roots: rows } } })
}

const WORK: TreeExpectation = {
  viewId: "opsWorkTree",
  said: "Work",
  carries: "a turn colour",
  atLeast: null,
}

const FLOORED: TreeExpectation = { ...WORK, viewId: "opsWorkTree", atLeast: 3 }

const OPENS: TreeExpectation = { ...WORK, carries: "a document to open" }

function statusOf(items: readonly DrawnItem[]): Drawn {
  return readingOf({ statusBar: items })
}

const WHOLE_BAR: readonly DrawnItem[] = [
  itemOf({ id: "opsStatusBar.usage.session", text: "9%" }),
  itemOf({ id: "opsStatusBar.usage.weekly", text: "41%" }),
  itemOf({ id: "opsStatusBar.upkeepStoplights", text: "🟢🟢🟢🟢🟢🟢" }),
  itemOf({ id: "opsStatusBar.inboxStoplights", text: "🟢🟢🟢" }),
]

test("every row of a tree is walked down its whole depth", () => {
  const rows = [rowOf({ id: "a", children: [rowOf({ id: "b", children: [rowOf({ id: "c" })] })] })]
  expect(everyRow(rows).map((one) => one.id)).toEqual(["a", "b", "c"])
})

test("a tree registering no view is red", () => {
  const said = judgeTree(readingOf(), WORK)
  expect(said.green).toBe(false)
  expect(said.said).toContain("registered no view")
})

test("a tree that could not be read is red with its first line", () => {
  const reading = readingOf({
    panels: { opsWorkTree: { registered: true, failure: "\n  it broke\nand more", roots: [] } },
  })
  expect(judgeTree(reading, WORK).said).toContain("it broke")
})

test("a tree drawing no row at all is red", () => {
  expect(judgeTree(treeOf([]), WORK).said).toContain("drew no row at all")
})

test("a row with no label is a blank line and turns the tree red", () => {
  expect(judgeTree(treeOf([rowOf(), rowOf({ label: "  " })]), WORK).said).toContain("no label")
})

test("a row with no id turns the tree red", () => {
  expect(judgeTree(treeOf([rowOf(), rowOf({ id: "" })]), WORK).said).toContain("no id")
})

test("a row that threw is named before any other fault", () => {
  const rows = [rowOf({ label: null, id: null, drewNothing: "it threw\nlater" })]
  expect(judgeTree(treeOf(rows), WORK).said).toContain("threw drawing")
})

test("a tree where no row carries what the tree is for is red", () => {
  const rows = [rowOf({ resourceUri: null }), rowOf({ resourceUri: "" })]
  expect(judgeTree(treeOf(rows), WORK).said).toContain("not one carries a turn colour")
})

test("a tree drawn from live state is held to no floor", () => {
  expect(judgeTree(treeOf([rowOf()]), WORK).green).toBe(true)
})

test("a tree read from the corpus is red under its floor and green on it", () => {
  expect(judgeTree(treeOf([rowOf(), rowOf()]), FLOORED).green).toBe(false)
  expect(judgeTree(treeOf([rowOf(), rowOf()]), FLOORED).said).toContain("under the 3")
  expect(judgeTree(treeOf([rowOf(), rowOf(), rowOf()]), FLOORED).green).toBe(true)
})

test("a turn colour is carried by a resource uri and a document by a command", () => {
  const rows = [rowOf({ resourceUri: "x", hasCommand: false }), rowOf({ resourceUri: null })]
  expect(carried(rows, "a turn colour")).toBe(1)
  expect(carried(rows, "a document to open")).toBe(1)
})

test("a tree asked for a document to open is judged on its commands", () => {
  const rows = [rowOf({ hasCommand: false })]
  expect(judgeTree(treeOf(rows), OPENS).said).toContain("not one carries a document to open")
})

test("a green tree notes its roots, its rows and what they carry", () => {
  const said = judgeTree(treeOf([rowOf({ children: [rowOf({ id: "b" })] })]), WORK)
  expect(said.notes).toEqual(["1 roots, 2 rows, 2 carrying a turn colour"])
})

test("a variation selector rides on a glyph without being one", () => {
  expect(glyphCount("🟢🟢🟢")).toBe(3)
  expect(glyphCount("\u{1F7E2}︎\u{1F7E2}")).toBe(2)
  expect(glyphCount("")).toBe(0)
})

test("a status bar creating no item at all is red", () => {
  expect(judgeStatusBar(statusOf([])).green).toBe(false)
})

test("a whole status bar is green", () => {
  const said = judgeStatusBar(statusOf(WHOLE_BAR))
  expect(said.green).toBe(true)
  expect(said.said).toContain("6/3 stoplights")
})

test("a usage slot reading anything but a number is red", () => {
  const bent = WHOLE_BAR.map((one) =>
    one.id === "opsStatusBar.usage.weekly" ? itemOf({ ...one, text: "—" }) : one
  )
  expect(judgeStatusBar(statusOf(bent)).said).toContain("weekly usage reads")
})

test("a missing usage slot is named rather than passed over", () => {
  const short = WHOLE_BAR.filter((one) => one.id !== "opsStatusBar.usage.session")
  expect(judgeStatusBar(statusOf(short)).said).toContain("no session usage slot")
})

test("a group showing fewer stoplights than the invariant pins is red", () => {
  const bent = WHOLE_BAR.map((one) =>
    one.id === "opsStatusBar.upkeepStoplights" ? itemOf({ ...one, text: "🟢🟢🟢🟢" }) : one
  )
  expect(judgeStatusBar(statusOf(bent)).said).toContain(
    "shows 4 stoplights and the invariant pins 6"
  )
})

test("an item created and never shown is red", () => {
  const bent = [...WHOLE_BAR, itemOf({ id: "opsStatusBar.spare", shown: false })]
  expect(judgeStatusBar(statusOf(bent)).said).toContain("1 items were created and never shown")
})

test("a feature's timing is read off the activation channel in each of its three states", () => {
  const lines = [
    "[agent-tree] activated in 812ms",
    "[work-tree] FAILED after 40ms",
    "[page-tree] has not finished after 19000ms",
    "[status-bar] said something else",
  ]
  expect(featureTimings(lines)).toEqual([
    { feature: "agent-tree", ms: 812, state: "activated" },
    { feature: "work-tree", ms: 40, state: "failed" },
    { feature: "page-tree", ms: 19000, state: "abandoned" },
  ])
})

test("what the agent tree logged reading is the row count rather than the running count", () => {
  expect(readsLogged(["[x] 3 running, 27 rows, 5 roots", "[x] nothing here"])).toEqual([27])
})

test("a timing report names every surface, timed or not", () => {
  const said = timingReport(
    readingOf({ activateMs: 900, reportMs: 40, channels: { "Ops: Activation": [] } })
  )
  expect(said[0]).toContain("activation 900ms wall")
  expect(said[0]).toContain("the panel walk 40ms")
  expect(said.filter((one) => one.includes("timed no start")).length).toBe(5)
})

test("a reading with no timings still says the wall it does not know", () => {
  expect(timingReport(readingOf())[0]).toContain("activation ?ms wall")
})

test("a seat going unread is carried into the report rather than judged", () => {
  const said = timingReport(
    readingOf({
      channels: { "Ops: Agent Tree": ["[x] 1 running, 2 rows, 1 roots UNREAD seat-nine"] },
    })
  )
  expect(said.some((one) => one.includes("UNREAD seat-nine"))).toBe(true)
})

test("a first line skips the blank lines above it", () => {
  expect(firstLine("\n\n  it broke  \nand more")).toBe("it broke")
  expect(firstLine("")).toBe("")
})
