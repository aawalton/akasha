import { afterAll, expect, test } from "bun:test"
import { scratch } from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { NOTHING_FINISHED } from "akasha/command/modules/landing-finishing/landing-finishing.module.code.ts"
import { linkMoved } from "akasha/command/modules/landing-finishing/landing-finishing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a page that moved has the folder it sits in linked where that page says", async () => {
  expect(await linkMoved()).toEqual([])
})

test("a landing with nothing to finish clears nothing and links nothing", () => {
  expect(NOTHING_FINISHED.cleared).toEqual([])
  expect(NOTHING_FINISHED.linked.said).toEqual([])
  expect(NOTHING_FINISHED.placed.wrong).toEqual([])
})
