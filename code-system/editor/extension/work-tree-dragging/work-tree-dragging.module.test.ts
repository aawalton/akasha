import { expect, test } from "bun:test"
import {
  DRAG_MIME,
  draggedIn,
  droppedAs,
  failureSaid,
  handFailureSaid,
  handingOf,
  initiativeOf,
  keyedAs,
  MOVED_UNDERFOOT,
  movedUnderfoot,
  orderingOf,
  shownSaid,
} from "akasha/code-system/editor/extension/work-tree-dragging/work-tree-dragging.module.code.ts"
import { PUT_BACK } from "akasha/commands/modules/change-freshness/change-freshness.module.code.ts"

function rowOf(kind: WorkTreeRow["kind"], key: string): WorkTreeRow {
  return { kind, key, label: key, at: null, color: null, detail: null, note: null, children: [] }
}

function labelled(kind: WorkTreeRow["kind"], key: string, label: string): WorkTreeRow {
  return { ...rowOf(kind, key), label }
}

const FIRST = rowOf("intent", "held#1")

const SECOND = rowOf("intent", "held#2")

const ELSEWHERE = rowOf("intent", "other#1")

const INITIATIVE = rowOf("initiative", "held")

const OTHER_INITIATIVE = rowOf("initiative", "other")

const CARRIED = labelled("intent", "held#1", "A thing is so.")

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
  expect(orderingOf([FIRST], SECOND)).toEqual({
    slug: "held",
    statement: "held#1",
    onto: "held#2",
  })
})

test("a move names both intents by the statements their rows are drawn under", () => {
  expect(orderingOf([CARRIED], SECOND)).toEqual({
    slug: "held",
    statement: "A thing is so.",
    onto: "held#2",
  })
})

test("a row drawn under no label is no move, at either end", () => {
  expect(orderingOf([labelled("intent", "held#1", "")], SECOND)).toBe(null)
  expect(orderingOf([CARRIED], labelled("intent", "held#2", ""))).toBe(null)
})

test("an intent dropped onto a row drawn under its own statement is no move", () => {
  expect(orderingOf([CARRIED], labelled("intent", "held#3", "A thing is so."))).toBe(null)
})

test("a drag made while a deletion is settling names the intents those rows are drawn as", () => {
  const shownFirst = labelled("intent", "held#1", "second")
  const shownSecond = labelled("intent", "held#2", "third")

  expect(orderingOf([shownSecond], shownFirst)).toEqual({
    slug: "held",
    statement: "third",
    onto: "second",
  })
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

test("a move that failed is said with the initiative, both statements and the reason", () => {
  expect(
    failureSaid({ slug: "held", statement: "A thing is so.", onto: "So is this." }, "it broke")
  ).toBe("held: the intent `A thing is so.` did not move onto `So is this.`. it broke")
})

test("an initiative's own row answers that initiative", () => {
  expect(initiativeOf(OTHER_INITIATIVE)).toBe("other")
})

test("an intent's row answers the initiative stating it", () => {
  expect(initiativeOf(ELSEWHERE)).toBe("other")
})

test("no row, and a row keyed by nothing, answer no initiative", () => {
  expect(initiativeOf(undefined)).toBe(null)
  expect(initiativeOf(rowOf("initiative", ""))).toBe(null)
})

test("an intent dropped onto another initiative's own row is handed to it", () => {
  expect(handingOf([CARRIED], OTHER_INITIATIVE)).toEqual({
    from: "held",
    statement: "A thing is so.",
    to: "other",
  })
})

test("an intent dropped onto an intent of another initiative is handed to that initiative", () => {
  expect(handingOf([CARRIED], ELSEWHERE)).toEqual({
    from: "held",
    statement: "A thing is so.",
    to: "other",
  })
})

test("an intent dropped onto its own initiative's row is handed nowhere", () => {
  expect(handingOf([CARRIED], INITIATIVE)).toBe(null)
})

test("an intent dropped onto an intent of its own initiative is handed nowhere", () => {
  expect(handingOf([CARRIED], SECOND)).toBe(null)
})

test("a row drawn under no label is handed nowhere", () => {
  expect(handingOf([FIRST], OTHER_INITIATIVE)).toEqual({
    from: "held",
    statement: "held#1",
    to: "other",
  })
  expect(handingOf([labelled("intent", "held#1", "")], OTHER_INITIATIVE)).toBe(null)
})

test("an initiative dragged, and more than one row dragged, are handed nowhere", () => {
  expect(handingOf([INITIATIVE], OTHER_INITIATIVE)).toBe(null)
  expect(handingOf([CARRIED, SECOND], OTHER_INITIATIVE)).toBe(null)
  expect(handingOf([], OTHER_INITIATIVE)).toBe(null)
})

test("a drop over no row hands nothing", () => {
  expect(handingOf([CARRIED], undefined)).toBe(null)
})

test("a drop within one initiative is read as a move rather than a hand", () => {
  expect(droppedAs([CARRIED], SECOND)).toEqual({
    kind: "move",
    order: { slug: "held", statement: "A thing is so.", onto: "held#2" },
  })
})

test("a drop onto another initiative is read as a hand", () => {
  expect(droppedAs([CARRIED], OTHER_INITIATIVE)).toEqual({
    kind: "hand",
    handing: { from: "held", statement: "A thing is so.", to: "other" },
  })
  expect(droppedAs([CARRIED], ELSEWHERE)).toEqual({
    kind: "hand",
    handing: { from: "held", statement: "A thing is so.", to: "other" },
  })
})

test("a drop that is neither a move nor a hand is read as nothing", () => {
  expect(droppedAs([CARRIED], INITIATIVE)).toBe(null)
  expect(droppedAs([CARRIED], CARRIED)).toBe(null)
  expect(droppedAs([CARRIED], undefined)).toBe(null)
  expect(droppedAs([], OTHER_INITIATIVE)).toBe(null)
})

test("a hand that failed is said with both initiatives, the statement and the reason", () => {
  expect(
    handFailureSaid({ from: "held", statement: "A thing is so.", to: "other" }, "it broke")
  ).toBe("held: the intent `A thing is so.` did not reach other. it broke")
})

const ORDER = { slug: "held", statement: "A thing is so.", onto: "So is this." }

const REFUSED = `akasha/a.domain.ts — what is on disk is not the body you read, ${PUT_BACK}
nothing was written — read them again against what is there now`

test("a refusal is read as a body that moved by the words the freshness rules close it with", () => {
  expect(movedUnderfoot(REFUSED)).toBe(true)
  expect(movedUnderfoot("Error: the page would not open")).toBe(false)
})

test("a drop refused because the body moved is said to Alan as one sentence", () => {
  expect(shownSaid(failureSaid(ORDER, REFUSED), REFUSED, MOVED_UNDERFOOT)).toBe(
    "that moved while you were dragging — nothing was changed"
  )
})

test("every other refusal reaches Alan in the words that refusal was made in", () => {
  const why = failureSaid(ORDER, "Error: it broke")
  expect(shownSaid(why, "Error: it broke", MOVED_UNDERFOOT)).toBe(why)
})
