import { expect, test } from "bun:test"
import type {
  InitiativeIntent,
  InitiativeRow,
} from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import {
  colorsSaid,
  countOf,
  initiativeWorkTree,
  readIn,
  render,
  treeOf,
  walk,
} from "./initiative-work-tree.command.code.ts"

const ROOT = "/nowhere"

function givenIn(): Given {
  return {
    root: ROOT,
    calledAs: "akasha initiative work-tree",
    from: ROOT,
    writer: null,
    agentId: null,
  }
}

function rowIn(
  slug: string,
  parent: string | null,
  intents: readonly InitiativeIntent[] = []
): InitiativeRow {
  return { slug, path: `${slug}.initiative.ts`, parent, persona: null, intents }
}

function intentIn(statement: string): InitiativeIntent {
  return { statement, workingMemory: null }
}

test("a call naming nothing prints the tree", () => {
  expect(readIn([])).toEqual({ shown: "tree" })
})

test("each word names what to print", () => {
  expect(readIn(["--json"])).toEqual({ shown: "json" })
  expect(readIn(["--counts"])).toEqual({ shown: "counts" })
  expect(readIn(["--colors"])).toEqual({ shown: "colors" })
})

test("one call prints one thing", () => {
  const said = readIn(["--json", "--counts"])

  expect("refused" in said && said.refused[0]).toContain("one call prints one thing")
})

test("a word said twice names one thing rather than two", () => {
  expect(readIn(["--json", "--json"])).toEqual({ shown: "json" })
})

test("the older spelling of the colors is no word this takes", () => {
  const said = readIn(["--colours"])

  expect("refused" in said && said.refused[0]).toContain("`--colours`")
})

test("the colors carry the root beside them and nothing else", () => {
  const said = colorsSaid("/repo", { byInitiative: new Map([["one", "green"]]) })

  expect(JSON.parse(said)).toEqual({ repo: "/repo", byInitiative: { one: "green" } })
})

test("a tree nothing is drawn on answers an empty record rather than none", () => {
  expect(JSON.parse(colorsSaid("/repo", { byInitiative: new Map() }))).toEqual({
    repo: "/repo",
    byInitiative: {},
  })
})

test("a word this does not take refuses as a fault in the call", () => {
  const said = initiativeWorkTree(["--sideways"], givenIn())

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})

test("an initiative is keyed by the slug it declares", () => {
  const tree = treeOf([rowIn("one", null)])

  expect(tree.map((one) => one.key)).toEqual(["one"])
  expect(tree[0]?.relPath).toBe("one.initiative.ts")
})

test("an initiative is drawn under the initiative it names", () => {
  const tree = treeOf([rowIn("over", null), rowIn("under", "over")])

  expect(walk(tree).map((one) => one.key)).toEqual(["over", "under"])
})

test("an initiative naming a parent that is not there is drawn as a root", () => {
  const tree = treeOf([rowIn("orphan", "nowhere")])

  expect(tree.map((one) => one.key)).toEqual(["orphan"])
  expect(tree[0]?.note).toContain("has no document")
})

test("an initiative whose parent chain closes on itself is drawn as a root", () => {
  const tree = treeOf([rowIn("one", "two"), rowIn("two", "one")])

  expect(tree.map((one) => one.key)).toEqual(["one", "two"])
  expect(tree[0]?.note).toContain("closes on itself")
})

test("a color is carried onto the initiative it is drawn for", () => {
  const tree = treeOf([rowIn("one", null)], { byInitiative: new Map([["one", "green"]]) })

  expect(tree[0]?.color).toBe("green")
})

test("an initiative nothing is drawn on carries no color", () => {
  expect(treeOf([rowIn("one", null)])[0]?.color).toBeNull()
})

test("a child is drawn one step in from the initiative above it", () => {
  const tree = treeOf([rowIn("over", null), rowIn("under", "over")])

  expect(render(tree)).toEqual(["over", "  under"])
})

test("an initiative's intents are drawn beneath that initiative", () => {
  const tree = treeOf([rowIn("one", null, [intentIn("make it so"), intentIn("and this")])])

  expect(tree[0]?.children.map((one) => one.label)).toEqual(["make it so", "and this"])
})

test("an intent keeps the place its initiative states rather than being sorted", () => {
  const tree = treeOf([rowIn("one", null, [intentIn("zebra"), intentIn("apple")])])

  expect(tree[0]?.children.map((one) => one.label)).toEqual(["zebra", "apple"])
})

test("the intents come ahead of the initiatives beneath", () => {
  const tree = treeOf([rowIn("over", null, [intentIn("an intent")]), rowIn("aaa-under", "over")])

  expect(tree[0]?.children.map((one) => one.kind)).toEqual(["intent", "initiative"])
})

test("an intent is told apart from an initiative by what it is", () => {
  const tree = treeOf([rowIn("one", null, [intentIn("make it so")])])

  expect(tree[0]?.kind).toBe("initiative")
  expect(tree[0]?.children[0]?.kind).toBe("intent")
})

test("an intent is keyed under the initiative holding it", () => {
  const tree = treeOf([rowIn("one", null, [intentIn("first"), intentIn("second")])])

  expect(tree[0]?.children.map((one) => one.key)).toEqual(["one#1", "one#2"])
})

test("an intent opens the page of the initiative holding it", () => {
  const tree = treeOf([rowIn("one", null, [intentIn("make it so")])])

  expect(tree[0]?.children[0]?.relPath).toBe("one.initiative.ts")
})

test("an intent carries its working memory as the note", () => {
  const tree = treeOf([
    rowIn("one", null, [{ statement: "make it so", workingMemory: "cut at 74bda7f0" }]),
  ])

  expect(tree[0]?.children[0]?.note).toBe("cut at 74bda7f0")
})

test("an intent stating no working memory carries no note", () => {
  const tree = treeOf([rowIn("one", null, [intentIn("make it so")])])

  expect(tree[0]?.children[0]?.note).toBeNull()
})

test("an intent carries no color, a color being a seat's", () => {
  const tree = treeOf([rowIn("one", null, [intentIn("make it so")])], {
    byInitiative: new Map([["one", "green"]]),
  })

  expect(tree[0]?.children[0]?.color).toBeNull()
})

test("an intent leads nowhere", () => {
  const tree = treeOf([rowIn("one", null, [intentIn("make it so")])])

  expect(tree[0]?.children[0]?.children).toEqual([])
})

test("an initiative holding no intent draws none", () => {
  expect(treeOf([rowIn("one", null)])[0]?.children).toEqual([])
})

test("a count of the initiatives counts no intent", () => {
  const tree = treeOf([
    rowIn("over", null, [intentIn("one"), intentIn("two")]),
    rowIn("under", "over", [intentIn("three")]),
  ])

  expect(countOf(tree, "initiative")).toBe(2)
  expect(countOf(tree, "intent")).toBe(3)
})

test("an intent is drawn one step in from the initiative holding it", () => {
  const tree = treeOf([rowIn("one", null, [intentIn("make it so")])])

  expect(render(tree)).toEqual(["one", "  make it so"])
})
