import { afterAll, expect, test } from "bun:test"
import {
  DATA,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  dropping,
  listingKept,
  noPageSaid,
  staleIn,
  stalling,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import {
  DROPS,
  droppedPathIn,
  droppingPiped,
  KEPT_LANDS,
  KEPT_ONE,
  KEPT_TWO,
  keeping,
  keptIn,
  NOTHING_HELD,
  PAGE,
  presenceIn,
  repo,
  rowsKept,
  STALE_AT,
  staleKept,
  thrownBy,
} from "akasha/commands/modules/change-acting/change-acting.module.test-fixtures.ts"
import { scratch } from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

test("an edit kept that no longer fits its body is named by that edit rather than by the page", () => {
  const root = staleKept(repo())
  const rows = rowsKept(root)

  const said = stalling(root, rows, thrownBy(root, rows))

  const why = said.refusals.join("\n")
  expect(said.code).toBe(DATA)
  expect(why).toContain("edit 2 of the 3 edits kept")
  expect(why).toContain(`that edit changes ${STALE_AT}`)
  expect(why).toContain("holds no such passage")
  expect(why).toContain("the 2 edits kept beside it are held back rather than at fault")
})

test("the drop that refusal names leaves the edits kept beside the stale one replaying", () => {
  const root = staleKept(repo())
  const rows = rowsKept(root)
  const said = stalling(root, rows, thrownBy(root, rows))

  expect(dropping(root, PAGE, [droppedPathIn(said)]).code).toBe(OK)

  const left = rowsKept(root)
  expect(left.length).toBe(2)
  expect(staleIn(root, left)).toBe(null)
  expect(thrownBy(root, left)).toBe(null)
})

test("a throw that no edit kept accounts for is said as it was thrown", () => {
  const said = stalling(repo(), [], new Error("the body would not open"))

  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals).toEqual(["the body would not open"])
})

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

test("a listing of the edits kept names each edit and the call landing those edits", () => {
  const said = listingKept(keeping(repo()), PAGE)

  expect(said.report).toEqual([`takes ${KEPT_ONE} away`, `takes ${KEPT_TWO} away`, KEPT_LANDS])
})

test("a listing over no edit kept says so rather than refusing", () => {
  expect(listingKept(repo(), PAGE).report).toEqual([NOTHING_HELD])
})

test("the refusal opens with the retry and names where to look before it explains", () => {
  const root = repo()

  const said = noPageSaid(root, presenceIn(root))

  expect(said).toContain("Run this same call again")
  expect(said).toContain("nothing was kept and nothing was lost")
  expect(said.indexOf("subagent-presence.log")).toBeLessThan(said.indexOf("still be queued"))
})

test("the refusal promises no outcome from waiting and names no call an agent is refused", () => {
  const root = repo()

  const said = noPageSaid(root, presenceIn(root))

  expect(said).toContain("nothing may have started it")
  expect(said).not.toContain("bun ")
})

test("the refusal says what it read and what is retried by nothing", () => {
  const root = repo()

  const said = noPageSaid(root, presenceIn(root))

  expect(said).toContain("read the index and no file on disk")
  expect(said).toContain("this repository's own history over the page's path")
  expect(said).toContain("says those landings went rather than that none ran")
  expect(said).toContain("ended before it could say why is retried by nothing")
  expect(said).toContain("minutes rather than to seconds")
})

test("the refusal asserts no reason the index names no page", () => {
  const root = repo()

  const said = noPageSaid(root, presenceIn(root))

  expect(said).toContain("why none is named is not something the index says")
  expect(said).not.toContain("next dispatched or resumed")
})

test("a call naming no agent at all is refused without the retry", () => {
  const root = repo()
  presenceIn(root)

  expect(noPageSaid(root, null)).not.toContain("Run this same call again")
})
