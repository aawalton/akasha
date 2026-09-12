import { afterAll, expect, test } from "bun:test"
import {
  listingKept,
  noPageSaid,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import {
  DROPS,
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
} from "akasha/commands/modules/change-acting/change-acting.module.test-fixtures.ts"
import { scratch } from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

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

  expect(said).toContain("waiting will not mend it")
  expect(said).toContain("nothing may have started it")
  expect(said).not.toContain("bun ")
})

test("a call naming no agent at all is refused without the retry", () => {
  const root = repo()
  presenceIn(root)

  expect(noPageSaid(root, null)).not.toContain("Run this same call again")
})
