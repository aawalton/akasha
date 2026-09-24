import { expect, test } from "bun:test"
import {
  ingestResponseSchema,
  locationBatchSchema,
  sortPoints,
} from "akasha/alan/atlas-web/modules/location-batch/location-batch.module.code.ts"
import { pointOf } from "akasha/alan/atlas-web/modules/location-batch/location-batch.module.test-fixtures.ts"

test("a batch holding a malformed point is still a batch", () => {
  const batch = { points: [pointOf(1), { ...pointOf(2), longitude: "west" }] }
  expect(locationBatchSchema.safeParse(batch).success).toBe(true)
})

test("every valid point is kept and every other point is refused by its place in the batch", () => {
  const sorted = sortPoints([pointOf(1), { ...pointOf(2), longitude: "west" }, pointOf(3), 7])
  expect(sorted.points).toEqual([pointOf(1), pointOf(3)])
  expect(sorted.refused.map((one) => one.index)).toEqual([1, 3])
  expect(sorted.refused[0]?.why).toStartWith("longitude: ")
})

test("a batch of valid points refuses none", () => {
  expect(sortPoints([pointOf(1), pointOf(2)]).refused).toEqual([])
})

test("an answer naming no refused point is still read", () => {
  expect(ingestResponseSchema.safeParse({ received: 2, inserted: 2 }).success).toBe(true)
})
