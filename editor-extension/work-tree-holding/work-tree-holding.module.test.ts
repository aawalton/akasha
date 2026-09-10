import { expect, test } from "bun:test"
import {
  agreementOf,
  drawnAs,
  HOLDING_NOTHING,
  type Holding,
  heldMoved,
  heldWithout,
  intentLabelsIn,
  movedLabels,
} from "./work-tree-holding.module.code.ts"

function rowOf(kind: WorkTreeRow["kind"], key: string, label: string): WorkTreeRow {
  return { kind, key, label, at: null, color: null, detail: null, note: null, children: [] }
}

const TREE: readonly WorkTreeRow[] = [
  {
    ...rowOf("initiative", "held", "held"),
    children: [
      rowOf("intent", "held#1", "first"),
      rowOf("intent", "held#2", "second"),
      rowOf("intent", "held#3", "third"),
      rowOf("initiative", "below", "below"),
    ],
  },
  rowOf("initiative", "other", "other"),
]

function holding(labels: readonly string[], without: readonly string[] = []): Holding {
  return { kind: "intents", labels, without }
}

test("the intents an initiative holds answer their statements in order", () => {
  expect(intentLabelsIn(TREE, "held")).toEqual(["first", "second", "third"])
})

test("an initiative the rows do not hold answers no statements", () => {
  expect(intentLabelsIn(TREE, "elsewhere")).toBe(null)
})

test("a move answers the statements in the order the drop asks for", () => {
  expect(movedLabels(["first", "second", "third"], 3, 1)).toEqual(["third", "first", "second"])
})

test("a move naming a place no intent sits at answers nothing", () => {
  expect(movedLabels(["first", "second"], 1, 3)).toBe(null)
  expect(movedLabels(null, 1, 2)).toBe(null)
})

test("the same statements in the same order agree", () => {
  expect(agreementOf(["a", "b"], holding(["a", "b"]))).toBe("agrees")
})

test("the same statements in another order are stale", () => {
  expect(agreementOf(["b", "a"], holding(["a", "b"]))).toBe("stale")
})

test("other statements are gone rather than stale", () => {
  expect(agreementOf(["a", "c"], holding(["a", "b"]))).toBe("gone")
  expect(agreementOf(null, holding(["a"]))).toBe("gone")
})

test("a file still holding an intent held to be going is stale", () => {
  expect(agreementOf(["a", "b"], holding(["a"], ["b"]))).toBe("stale")
  expect(agreementOf(["b", "a"], holding(["a"], ["b"]))).toBe("stale")
})

test("a file with that intent gone agrees", () => {
  expect(agreementOf(["a"], holding(["a"], ["b"]))).toBe("agrees")
})

test("a file gaining an intent while one is held to be going is gone", () => {
  expect(agreementOf(["a", "b", "c"], holding(["a"], ["b"]))).toBe("gone")
})

test("an initiative still in the file while held to be gone is stale", () => {
  expect(agreementOf([], HOLDING_NOTHING)).toBe("stale")
  expect(agreementOf(["a"], HOLDING_NOTHING)).toBe("stale")
})

test("an initiative out of the file while held to be gone agrees", () => {
  expect(agreementOf(null, HOLDING_NOTHING)).toBe("agrees")
})

test("the rows are drawn in the order held and renumbered from one", () => {
  const moved = drawnAs(TREE, "held", holding(["third", "first", "second"]))
  expect(intentLabelsIn(moved, "held")).toEqual(["third", "first", "second"])
  expect(moved[0]?.children.map((child) => child.key)).toEqual([
    "held#1",
    "held#2",
    "held#3",
    "below",
  ])
})

test("an intent held to be going is left out of the rows drawn", () => {
  const left = drawnAs(TREE, "held", holding(["first", "third"], ["second"]))
  expect(intentLabelsIn(left, "held")).toEqual(["first", "third"])
  expect(left[0]?.children.map((child) => child.key)).toEqual(["held#1", "held#2", "below"])
})

test("an initiative held to be gone is left out of the rows drawn", () => {
  const left = drawnAs(TREE, "held", HOLDING_NOTHING)
  expect(left.map((row) => row.key)).toEqual(["other"])
})

test("an initiative held to be gone leaves every other initiative drawn", () => {
  const left = drawnAs(TREE, "other", HOLDING_NOTHING)
  expect(left.map((row) => row.key)).toEqual(["held"])
  expect(intentLabelsIn(left, "held")).toEqual(["first", "second", "third"])
})

test("an initiative nested beneath a row is left out where it is held to be gone", () => {
  const left = drawnAs(TREE, "below", HOLDING_NOTHING)
  expect(left[0]?.children.map((child) => child.key)).toEqual(["held#1", "held#2", "held#3"])
})

test("taking an intent out of nothing held holds the rest and names that intent going", () => {
  expect(heldWithout(undefined, ["a", "b", "c"], "b")).toEqual({
    kind: "intents",
    labels: ["a", "c"],
    without: ["b"],
  })
})

test("taking a second intent out keeps the first named going", () => {
  expect(heldWithout(holding(["a", "c"], ["b"]), ["a", "c"], "c")).toEqual({
    kind: "intents",
    labels: ["a"],
    without: ["b", "c"],
  })
})

test("an intent no order holds is held to be going by nothing", () => {
  expect(heldWithout(undefined, ["a", "b"], "c")).toBe(null)
  expect(heldWithout(undefined, null, "a")).toBe(null)
  expect(heldWithout(HOLDING_NOTHING, ["a"], "a")).toBe(null)
})

test("a move made while an intent is held to be going keeps that intent going", () => {
  expect(heldMoved(holding(["a", "c"], ["b"]), ["a", "c"], 2, 1)).toEqual({
    kind: "intents",
    labels: ["c", "a"],
    without: ["b"],
  })
})

test("a move made with nothing held names no intent going", () => {
  expect(heldMoved(undefined, ["a", "b"], 1, 2)).toEqual({
    kind: "intents",
    labels: ["b", "a"],
    without: [],
  })
})

test("a move naming no place, or made over an initiative held to be gone, holds nothing", () => {
  expect(heldMoved(undefined, ["a", "b"], 1, 3)).toBe(null)
  expect(heldMoved(HOLDING_NOTHING, ["a", "b"], 1, 2)).toBe(null)
})
