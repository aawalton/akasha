import { afterAll, expect, test } from "bun:test"
import { appendEdits } from "@akasha/changes/edits-keeping"
import { scratch } from "@akasha/indexes/indexing/testing"
import {
  forgetting,
  listing,
  listingHanded,
  listingKept,
  taking,
} from "./change-acting.module.code.ts"
import {
  ALL,
  ANOTHER,
  DROPPED,
  DROPS,
  droppingPiped,
  HANDED_AT,
  HANDED_LANDS,
  HANDED_ONE,
  HANDED_OTHER,
  HANDED_TWO,
  HANDS,
  handedIn,
  handing,
  handingBoth,
  KEPT_LANDS,
  KEPT_ONE,
  KEPT_TWO,
  keeping,
  keptIn,
  NONE_HANDED,
  NOTHING_HELD,
  OTHER,
  PAGE,
  repo,
  SUB,
  TOOK,
} from "./change-acting.module.test-fixtures.ts"

afterAll(scratch.sweep)

for (const one of DROPS) {
  test(one.name, () => {
    const root = one.bare === true ? repo() : keeping(repo())
    one.sets?.(root)

    const said = droppingPiped(root, one.said)

    if (one.code !== undefined) expect(said.code).toBe(one.code)
    if (one.refusals !== undefined) expect(said.refusals).toEqual(one.refusals)
    if (one.refusalHolds !== undefined) expect(said.refusals[0] ?? "").toContain(one.refusalHolds)
    if (one.report !== undefined) expect(said.report).toEqual(one.report)
    if (one.holds !== undefined) expect(said.report).toContain(one.holds)
    if (one.first !== undefined) expect(said.report[0]).toBe(one.first)
    if (one.kept !== undefined) expect(keptIn(root)).toEqual(one.kept)
  })
}

for (const one of HANDS) {
  test(one.name, () => {
    const root = handingBoth(repo())

    const said = one.act(root, PAGE, SUB, one.said)

    if (one.code !== undefined) expect(said.code).toBe(one.code)
    if (one.refusals !== undefined) expect(said.refusals).toEqual(one.refusals)
    if (one.refusalHolds !== undefined) expect(said.refusals[0] ?? "").toContain(one.refusalHolds)
    if (one.report !== undefined) expect(said.report).toEqual(one.report)
    if (one.own !== undefined) expect(keptIn(root)).toEqual(one.own)
    if (one.left !== undefined) expect(handedIn(root)).toEqual(one.left)
  })
}

test("a listing over no handed edits says no subagent has handed edits over", () => {
  expect(listing(repo(), PAGE).report).toEqual([NONE_HANDED])
})

test("a listing names each subagent that handed edits over and how many each handed", () => {
  const root = repo()
  handing(root, SUB, [HANDED_ONE])
  handing(root, OTHER, [HANDED_ONE, HANDED_TWO])

  expect(listing(root, PAGE).report).toEqual([
    "tester-one handed 1 edit(s) over",
    "tester-two handed 2 edit(s) over",
    HANDED_LANDS,
  ])
})

test("a listing of the edits kept names each edit and the call landing those edits", () => {
  const said = listingKept(keeping(repo()), PAGE)

  expect(said.report).toEqual([`takes ${KEPT_ONE} away`, `takes ${KEPT_TWO} away`, KEPT_LANDS])
})

test("a listing over no edit kept says so rather than refusing", () => {
  expect(listingKept(repo(), PAGE).report).toEqual([NOTHING_HELD])
})

test("a listing of one subagent's handed edits names each of those edits", () => {
  const said = listingHanded(handingBoth(repo()), PAGE, SUB)

  expect(said.report).toEqual([`adds ${HANDED_AT}`, `adds ${HANDED_OTHER}`, HANDED_LANDS])
})

test("a listing of a subagent that handed nothing over says so", () => {
  const said = listingHanded(repo(), PAGE, SUB)

  expect(said.report).toEqual(["tester-one has handed no edits to this agent"])
})

test("a take folds one subagent's handed edits in and takes the handed edits away", () => {
  const root = repo()
  handing(root, SUB, [HANDED_ONE])

  const said = taking(root, PAGE, SUB, ALL)

  expect(said.refusals).toEqual([])
  expect(said.report).toEqual([`adds ${HANDED_AT}`, TOOK])
  expect(keptIn(root)).toEqual([HANDED_AT])
  expect(listing(root, PAGE).report).toEqual([NONE_HANDED])
})

test("a take that would not fold refuses and leaves both sets as those sets were", () => {
  const root = repo()
  appendEdits(root, PAGE, [{ kind: "add", path: HANDED_AT, content: "own" }])
  handing(root, SUB, [HANDED_ONE])

  const said = taking(root, PAGE, SUB, ALL)

  expect(said.code).toBe(3)
  expect(said.refusals[1]).toBe(
    "the handed edits are kept as they were, and this agent's own are unchanged"
  )
  expect(keptIn(root)).toEqual([HANDED_AT])
  expect(listing(root, PAGE).report[0]).toBe("tester-one handed 1 edit(s) over")
})

test("a forget takes one subagent's handed edits away and names each edit that went", () => {
  const root = repo()
  handing(root, SUB, [HANDED_ONE])

  const said = forgetting(root, PAGE, SUB, ALL)

  expect(said.report).toEqual([`adds ${HANDED_AT}`, DROPPED])
  expect(keptIn(root)).toEqual([])
})

test("an act naming no subagent is refused rather than reaching every subagent", () => {
  const root = repo()
  handing(root, SUB, [HANDED_ONE])

  const said = taking(root, PAGE, undefined, ALL)

  expect(said.refusals).toEqual(["this call names no subagent whose handed edits would be reached"])
  expect(keptIn(root)).toEqual([])
})

test("a take and a forget refuse in their own words rather than in the drop's", () => {
  const root = handingBoth(repo())

  const took = taking(root, PAGE, SUB, ANOTHER)
  const forgot = forgetting(root, PAGE, SUB, ANOTHER)
  const dropped = droppingPiped(root, ANOTHER)

  expect(took.refusals).toEqual([
    "`all` takes `true` to take every edit that subagent handed over, and no other value",
  ])
  expect(forgot.refusals).toEqual([
    "`all` takes `true` to take away every edit that subagent handed over, and no other value",
  ])
  expect(dropped.refusals).toEqual([
    "`all` takes `true` to take away every edit kept, and no other value",
  ])
})
