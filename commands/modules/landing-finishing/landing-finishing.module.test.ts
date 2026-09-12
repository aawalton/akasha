import { afterAll, expect, test } from "bun:test"
import { scratch } from "akasha/commands/modules/landing/landing.module.test-fixtures.ts"
import { NOTHING_FINISHED } from "akasha/commands/modules/landing-finishing/landing-finishing.module.code.ts"
import { linkMoved } from "akasha/commands/modules/landing-finishing/landing-finishing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a page that moved has the folder it sits in linked where that page says", async () => {
  expect(await linkMoved()).toEqual([])
})

test("a landing with nothing to finish clears nothing, links nothing and keeps nothing", () => {
  expect(NOTHING_FINISHED.cleared).toEqual([])
  expect(NOTHING_FINISHED.linked.said).toEqual([])
  expect(NOTHING_FINISHED.placed.wrong).toEqual([])
  expect(NOTHING_FINISHED.units.wrong).toEqual([])
})
