import { afterAll, expect, test } from "bun:test"
import { listingKept } from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
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
