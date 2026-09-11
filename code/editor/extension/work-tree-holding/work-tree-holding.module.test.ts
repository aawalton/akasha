import { expect, test } from "bun:test"
import {
  agreementOf,
  drawnAs,
  type Holding,
  heldAnswered,
  heldGone,
  heldMoved,
  heldWithout,
  intentLabelsIn,
  movedLabels,
  settledOver,
} from "akasha/code/editor/extension/work-tree-holding/work-tree-holding.module.code.ts"
import { rowOf } from "akasha/code/editor/extension/work-tree-holding/work-tree-holding.module.test-fixtures.ts"

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

function holding(labels: readonly string[], without: readonly string[] = [], waiting = 1): Holding {
  return { kind: "intents", labels, without, waiting }
}

const GONE = heldGone(undefined)

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
  expect(agreementOf([], GONE)).toBe("stale")
  expect(agreementOf(["a"], GONE)).toBe("stale")
})

test("an initiative out of the file while held to be gone agrees", () => {
  expect(agreementOf(null, GONE)).toBe("agrees")
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
  const left = drawnAs(TREE, "held", GONE)
  expect(left.map((row) => row.key)).toEqual(["other"])
})

test("an initiative held to be gone leaves every other initiative drawn", () => {
  const left = drawnAs(TREE, "other", GONE)
  expect(left.map((row) => row.key)).toEqual(["held"])
  expect(intentLabelsIn(left, "held")).toEqual(["first", "second", "third"])
})

test("an initiative nested beneath a row is left out where it is held to be gone", () => {
  const left = drawnAs(TREE, "below", GONE)
  expect(left[0]?.children.map((child) => child.key)).toEqual(["held#1", "held#2", "held#3"])
})

test("taking an intent out of nothing held holds the rest and names that intent going", () => {
  expect(heldWithout(undefined, ["a", "b", "c"], "b")).toEqual({
    kind: "intents",
    labels: ["a", "c"],
    without: ["b"],
    waiting: 1,
  })
})

test("taking a second intent out keeps the first named going", () => {
  expect(heldWithout(holding(["a", "c"], ["b"]), ["a", "c"], "c")).toEqual({
    kind: "intents",
    labels: ["a"],
    without: ["b", "c"],
    waiting: 2,
  })
})

test("an intent no order holds is held to be going by nothing", () => {
  expect(heldWithout(undefined, ["a", "b"], "c")).toBe(null)
  expect(heldWithout(undefined, null, "a")).toBe(null)
  expect(heldWithout(GONE, ["a"], "a")).toBe(null)
})

test("a move made while an intent is held to be going keeps that intent going", () => {
  expect(heldMoved(holding(["a", "c"], ["b"]), ["a", "c"], "c", "a")).toEqual({
    kind: "intents",
    labels: ["c", "a"],
    without: ["b"],
    waiting: 2,
  })
})

test("an intent moved onto one above it sits before that intent", () => {
  expect(heldMoved(undefined, ["a", "b", "c"], "c", "a")).toEqual(holding(["c", "a", "b"]))
})

test("an intent moved onto one below it sits after that intent", () => {
  expect(heldMoved(undefined, ["a", "b", "c"], "a", "c")).toEqual(holding(["b", "c", "a"]))
})

test("a statement no intent states, at either end, holds nothing", () => {
  expect(heldMoved(undefined, ["a", "b"], "z", "a")).toBe(null)
  expect(heldMoved(undefined, ["a", "b"], "a", "z")).toBe(null)
  expect(heldMoved(undefined, ["a", "b"], "a", "a")).toBe(null)
  expect(heldMoved(undefined, null, "a", "b")).toBe(null)
})

function fileOf(labels: readonly string[]): readonly WorkTreeRow[] {
  return [
    {
      ...rowOf("initiative", "held", "held"),
      children: labels.map((label, at) => rowOf("intent", `held#${String(at + 1)}`, label)),
    },
    rowOf("initiative", "other", "other"),
  ]
}

function deleting(
  holds: Map<string, Holding>,
  shown: readonly WorkTreeRow[],
  statement: string
): undefined {
  const left = heldWithout(holds.get("held"), intentLabelsIn(shown, "held"), statement)
  if (left !== null) holds.set("held", left)
  return undefined
}

test("two intents deleted one after the other are both left out at once", () => {
  const holds = new Map<string, Holding>()
  const file = fileOf(["first", "second", "third"])

  let shown = settledOver(file, holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["first", "second", "third"])

  deleting(holds, shown, "first")
  shown = settledOver(file, holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["second", "third"])

  deleting(holds, shown, "third")
  shown = settledOver(file, holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["second"])
})

test("the first of two deletions landing leaves the second still held", () => {
  const holds = new Map<string, Holding>()
  let shown = settledOver(fileOf(["first", "second", "third"]), holds)
  deleting(holds, shown, "first")
  shown = settledOver(fileOf(["first", "second", "third"]), holds)
  deleting(holds, shown, "third")

  shown = settledOver(fileOf(["second", "third"]), holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["second"])
  expect(holds.has("held")).toBe(true)

  shown = settledOver(fileOf(["second"]), holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["second"])
  expect(holds.has("held")).toBe(false)
})

test("an intent deleted while a drop is settling leaves both held", () => {
  const holds = new Map<string, Holding>()
  const file = fileOf(["first", "second", "third"])

  const moved = heldMoved(holds.get("held"), intentLabelsIn(file, "held"), "third", "first")
  if (moved !== null) holds.set("held", moved)
  let shown = settledOver(file, holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["third", "first", "second"])

  deleting(holds, shown, "first")
  shown = settledOver(file, holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["third", "second"])

  shown = settledOver(fileOf(["third", "first", "second"]), holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["third", "second"])

  shown = settledOver(fileOf(["third", "second"]), holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["third", "second"])
  expect(holds.has("held")).toBe(false)
})

test("a deletion held for one initiative leaves every other initiative alone", () => {
  const holds = new Map<string, Holding>([["held", GONE]])
  const shown = settledOver(fileOf(["first"]), holds)
  expect(shown.map((row) => row.key)).toEqual(["other"])
  expect(holds.has("held")).toBe(true)
})

test("an initiative held to be gone is let go once the file has it gone", () => {
  const holds = new Map<string, Holding>([["held", GONE]])
  const shown = settledOver([rowOf("initiative", "other", "other")], holds)
  expect(shown.map((row) => row.key)).toEqual(["other"])
  expect(holds.has("held")).toBe(false)
})

test("a file gaining an intent while one is held to be going lets the hold go", () => {
  const holds = new Map<string, Holding>()
  const shown = settledOver(fileOf(["first", "second"]), holds)
  deleting(holds, shown, "first")

  const later = settledOver(fileOf(["first", "second", "fourth"]), holds)
  expect(intentLabelsIn(later, "held")).toEqual(["first", "second", "fourth"])
  expect(holds.has("held")).toBe(false)
})

test("a move made with nothing held names no intent going", () => {
  expect(heldMoved(undefined, ["a", "b"], "a", "b")).toEqual({
    kind: "intents",
    labels: ["b", "a"],
    without: [],
    waiting: 1,
  })
})

test("a move made over an initiative held to be gone holds nothing", () => {
  expect(heldMoved(GONE, ["a", "b"], "a", "b")).toBe(null)
})

test("a drag made while a deletion is settling moves the intent dragged", () => {
  const holds = new Map<string, Holding>()
  const file = fileOf(["first", "second", "third"])

  const shown = settledOver(file, holds)
  deleting(holds, shown, "first")
  const left = settledOver(file, holds)
  expect(intentLabelsIn(left, "held")).toEqual(["second", "third"])

  const moved = heldMoved(holds.get("held"), intentLabelsIn(left, "held"), "third", "second")
  expect(moved).toEqual({
    kind: "intents",
    labels: ["third", "second"],
    without: ["first"],
    waiting: 2,
  })
})

test("a landing answering counts one less, and never below none", () => {
  expect(heldAnswered(holding(["a"], [], 2))).toEqual(holding(["a"], [], 1))
  expect(heldAnswered(holding(["a"], [], 1))).toEqual(holding(["a"], [], 0))
  expect(heldAnswered(holding(["a"], [], 0))).toEqual(holding(["a"], [], 0))
  expect(heldAnswered(GONE)).toEqual({ kind: "nothing", waiting: 0 })
  expect(heldAnswered(undefined)).toBe(null)
})

test("a second hold made over one already there counts one landing more", () => {
  expect(heldGone(holding(["a"], [], 1)).waiting).toBe(2)
})

test("a move that landed in another order than the one held lets the hold go", () => {
  const holds = new Map<string, Holding>()
  const file = fileOf(["a", "b", "c", "d"])

  const asked = heldMoved(undefined, intentLabelsIn(file, "held"), "b", "d")
  if (asked !== null) holds.set("held", asked)
  let shown = settledOver(file, holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["a", "c", "d", "b"])

  const answered = heldAnswered(holds.get("held"))
  if (answered !== null) holds.set("held", answered)

  shown = settledOver(fileOf(["a", "c", "b", "d"]), holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["a", "c", "b", "d"])
  expect(holds.has("held")).toBe(false)
})

test("a hold whose landing has not answered survives the same disagreement", () => {
  const holds = new Map<string, Holding>()
  const file = fileOf(["a", "b", "c", "d"])

  const asked = heldMoved(undefined, intentLabelsIn(file, "held"), "b", "d")
  if (asked !== null) holds.set("held", asked)

  const shown = settledOver(fileOf(["a", "c", "b", "d"]), holds)
  expect(intentLabelsIn(shown, "held")).toEqual(["a", "c", "d", "b"])
  expect(holds.has("held")).toBe(true)
})

test("a hold outlives no landing it was made for", () => {
  const holds = new Map<string, Holding>()
  const file = fileOf(["a", "b", "c"])

  const shown = settledOver(file, holds)
  deleting(holds, shown, "a")
  deleting(holds, settledOver(file, holds), "c")
  expect(holds.get("held")?.waiting).toBe(2)

  const once = heldAnswered(holds.get("held"))
  if (once !== null) holds.set("held", once)
  const twice = heldAnswered(holds.get("held"))
  if (twice !== null) holds.set("held", twice)
  expect(holds.get("held")?.waiting).toBe(0)

  const later = settledOver(file, holds)
  expect(intentLabelsIn(later, "held")).toEqual(["a", "b", "c"])
  expect(holds.has("held")).toBe(false)
})
