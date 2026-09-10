import { afterAll, expect, test } from "bun:test"
import { CLASH_MARK } from "../body-merging/body-merging.module.code.ts"
import {
  type Bodies,
  headOf,
  owedOf,
  type Rebased,
  rebasedHeld,
  runningOf,
} from "./drafting.module.code.ts"
import {
  ALSO_NOT_TEXT,
  BIN,
  BOTH_RUN,
  bodied,
  bodiedBytes,
  CHECKS_RUN,
  FAR,
  kindOf,
  landed,
  landedBytes,
  MOVED,
  NOT_TEXT,
  NOTHING_RUNS,
  ONE,
  renamed,
  repoAt,
  scratch,
  swapped,
  TEN,
  TWO,
  taken,
  textOr,
} from "./drafting.module.test-fixtures.ts"

afterAll(scratch.sweep)

function heldBy(root: string, carried: Bodies): Rebased {
  const said = rebasedHeld(root, headOf(root), carried)
  if ("why" in said) throw new Error(said.why)
  return said
}

function whyOf(root: string, carried: Bodies): string {
  const said = rebasedHeld(root, headOf(root), carried)
  return "why" in said ? said.why : ""
}

test("a body that moved under the change is merged rather than written over", () => {
  const root = repoAt()
  landed(root, { [ONE]: swapped(TEN, "j", "J") })

  const said = heldBy(root, new Map([bodied(ONE, TEN, swapped(TEN, "b", "B"))]))

  expect(textOr(said.held.get(ONE)?.body)).toBe(swapped(swapped(TEN, "b", "B"), "j", "J"))
})

test("the body the commit at HEAD holds becomes the base the bodies carry", () => {
  const root = repoAt()
  landed(root, { [ONE]: swapped(TEN, "j", "J") })

  const said = heldBy(root, new Map([bodied(ONE, TEN, swapped(TEN, "b", "B"))]))

  expect(textOr(said.held.get(ONE)?.was)).toBe(swapped(TEN, "j", "J"))
})

test("a rebase names the paths HEAD holds a body other than the base at", () => {
  const root = repoAt()
  landed(root, { [ONE]: swapped(TEN, "j", "J") })

  const said = heldBy(
    root,
    new Map([bodied(ONE, TEN, swapped(TEN, "b", "B")), bodied(TWO, null, "fresh\n")])
  )

  expect(said.moved).toEqual([ONE])
})

test("a path the commit at HEAD holds nothing at is followed to where a rename left it", () => {
  const root = repoAt()
  renamed(root, ONE, MOVED, TEN)

  const said = heldBy(root, new Map([bodied(ONE, TEN, swapped(TEN, "b", "B"))]))

  expect([...said.held.keys()]).toEqual([MOVED])
})

test("a path followed through a rename is followed again through the next rename", () => {
  const root = repoAt()
  renamed(root, ONE, MOVED, TEN)
  renamed(root, MOVED, FAR, TEN)

  const said = heldBy(root, new Map([bodied(ONE, TEN, swapped(TEN, "b", "B"))]))

  expect([...said.held.keys()]).toEqual([FAR])
})

test("a body at a path renamed away is merged onto the body the rename left", () => {
  const root = repoAt()
  renamed(root, ONE, MOVED, swapped(TEN, "j", "J"))

  const said = heldBy(root, new Map([bodied(ONE, TEN, swapped(TEN, "b", "B"))]))

  expect(textOr(said.held.get(MOVED)?.body)).toBe(swapped(swapped(TEN, "b", "B"), "j", "J"))
})

test("a rename reaching a path these bodies already carry refuses the rebase", () => {
  const root = repoAt()
  renamed(root, ONE, MOVED, TEN)

  const why = whyOf(
    root,
    new Map([bodied(ONE, TEN, swapped(TEN, "b", "B")), bodied(MOVED, TEN, swapped(TEN, "c", "C"))])
  )

  expect(why).toContain(MOVED)
})

test("a path taken away by no rename is carried as a conflict marking the body held", () => {
  const root = repoAt()
  taken(root, ONE)

  const said = heldBy(root, new Map([bodied(ONE, TEN, swapped(TEN, "b", "B"))]))

  expect(said.clashed).toEqual([ONE])
  expect(textOr(said.held.get(ONE)?.body)).toContain(CLASH_MARK)
})

test("a body spelling no text at a path taken away refuses the rebase", () => {
  const root = repoAt()
  landedBytes(root, BIN, NOT_TEXT)
  taken(root, BIN)

  expect(whyOf(root, new Map([bodiedBytes(BIN, NOT_TEXT, ALSO_NOT_TEXT)]))).toContain("taken away")
})

test("a change kind says what a run does, its checks apart from each reading owed", () => {
  expect(runningOf(kindOf(true, false, false))).toEqual(CHECKS_RUN)
  expect(runningOf(kindOf(false, false, false))).toEqual(NOTHING_RUNS)
})

test("a call carrying no change kind runs every check and owes every reading", () => {
  expect(runningOf(undefined)).toEqual(BOTH_RUN)
})

test("what a path's readers owe is read off the paths saying so and no others", () => {
  const said = owedOf(
    new Map([
      [ONE, { was: null, body: null, readersOweReading: false }],
      [TWO, { was: null, body: null }],
    ])
  )

  expect(said.get(ONE)).toBe(false)
  expect(said.has(TWO)).toBe(false)
})

test("the commit at HEAD is read as the hash naming it", () => {
  expect(headOf(repoAt())).toMatch(/^[0-9a-f]{40}$/)
})
