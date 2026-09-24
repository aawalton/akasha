import { expect, test } from "bun:test"
import {
  type Node,
  treeOf,
} from "akasha/alan/harness/code-editor/data-interface/modules/work-tree-composing/work-tree-composing.module.code.ts"
import type {
  InitiativeIntent,
  InitiativeRow,
} from "akasha/domain/modules/work-initiatives/work-initiatives.module.code.ts"

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

function keysIn(nodes: readonly Node[]): readonly string[] {
  return nodes.flatMap((one) => [one.key, ...keysIn(one.children)])
}

test("an initiative is keyed by the slug it declares", () => {
  const tree = treeOf([rowIn("one", null)])

  expect(tree.map((one) => one.key)).toEqual(["one"])
  expect(tree[0]?.relPath).toBe("one.initiative.ts")
})

test("an initiative is drawn under the initiative it names", () => {
  const tree = treeOf([rowIn("over", null), rowIn("under", "over")])

  expect(keysIn(tree)).toEqual(["over", "under"])
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
    rowIn("one", null, [{ statement: "make it so", workingMemory: "held at 74bda7f0" }]),
  ])

  expect(tree[0]?.children[0]?.note).toBe("held at 74bda7f0")
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
