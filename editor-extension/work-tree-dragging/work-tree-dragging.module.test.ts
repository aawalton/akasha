import { expect, test } from "bun:test"
import {
  DRAG_MIME,
  draggedIn,
  failureSaid,
  keyedAs,
  orderingOf,
} from "./work-tree-dragging.module.code.ts"

function rowOf(kind: WorkTreeRow["kind"], key: string): WorkTreeRow {
  return { kind, key, label: key, at: null, color: null, detail: null, note: null, children: [] }
}

const FIRST = rowOf("intent", "held#1")

const SECOND = rowOf("intent", "held#2")

const ELSEWHERE = rowOf("intent", "other#1")

const INITIATIVE = rowOf("initiative", "held")

test("the drag is carried under the name the editor gives this view's tree", () => {
  expect(DRAG_MIME).toBe("application/vnd.code.tree.opsworktree")
})

test("an intent row answers its initiative and its place", () => {
  expect(keyedAs(SECOND)).toEqual({ slug: "held", place: 2 })
})

test("an initiative row answers no place", () => {
  expect(keyedAs(INITIATIVE)).toBe(null)
})

test("no row answers no place", () => {
  expect(keyedAs(undefined)).toBe(null)
})

test("a key carrying no place answers none", () => {
  expect(keyedAs(rowOf("intent", "held#first"))).toBe(null)
  expect(keyedAs(rowOf("intent", "held#0"))).toBe(null)
  expect(keyedAs(rowOf("intent", "#1"))).toBe(null)
})

test("an intent dropped onto another intent of its initiative is a move", () => {
  expect(orderingOf([FIRST], SECOND)).toEqual({ slug: "held", from: 1, to: 2 })
})

test("an intent dropped onto an intent of another initiative is no move", () => {
  expect(orderingOf([FIRST], ELSEWHERE)).toBe(null)
})

test("an intent dropped onto the place it sits at already is no move", () => {
  expect(orderingOf([FIRST], FIRST)).toBe(null)
})

test("an intent dropped onto an initiative is no move", () => {
  expect(orderingOf([FIRST], INITIATIVE)).toBe(null)
})

test("an intent dropped over no row is no move", () => {
  expect(orderingOf([FIRST], undefined)).toBe(null)
})

test("an initiative dragged onto an intent is no move", () => {
  expect(orderingOf([INITIATIVE], SECOND)).toBe(null)
})

test("more than one row dragged is no move", () => {
  expect(orderingOf([FIRST, SECOND], SECOND)).toBe(null)
})

test("nothing dragged is no move", () => {
  expect(orderingOf([], SECOND)).toBe(null)
})

test("what the drag carried is read as rows only where it is a list", () => {
  expect(draggedIn([FIRST])).toEqual([FIRST])
  expect(draggedIn(undefined)).toEqual([])
  expect(draggedIn("held#1")).toEqual([])
})

test("a move that failed is said with the initiative, both places and the reason", () => {
  expect(failureSaid({ slug: "held", from: 1, to: 2 }, "it broke")).toBe(
    "held: the intent at place 1 did not move to place 2. it broke"
  )
})
