import { expect, test } from "bun:test"
import { rootFrom } from "akasha/pages/indexes/modules/building/index-building.module.code.ts"
import { checkoutHere } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"

const ELSEWHERE = "/var/home/scratch/akasha"

test("the first word names the checkout the index is built for", () => {
  expect(rootFrom([ELSEWHERE])).toBe(ELSEWHERE)
})

test("a call naming no checkout builds the index for the checkout this file sits in", () => {
  expect(rootFrom([])).toBe(checkoutHere())
})
