import { expect, test } from "bun:test"
import {
  fetchLuckPoints,
  luckIn,
  POINTS_FOR_A_NO,
  POINTS_FOR_A_RISK,
  rejectionsBetween,
} from "akasha/alan/attribute/pages/luck/luck.attribute.code.ts"
import type { Row } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"
import {
  answering,
  refusing,
} from "akasha/alan/harness/readout/modules/asking/readout-asking.module.test-fixtures.ts"

const FROM = "2026-09-01T13:00:00.000Z"

const TO = "2026-09-02T13:00:00.000Z"

function risked(rejected: unknown): Row {
  return { values: { id: "one", rejected } }
}

test("one rejection Alan risked is one point", () => {
  expect(POINTS_FOR_A_RISK).toBe(1)
  expect(luckIn([risked(false)])).toBe(1)
})

test("a rejection that came back as a no counts twice", () => {
  expect(POINTS_FOR_A_NO).toBe(2)
  expect(luckIn([risked(true)])).toBe(2)
})

test("the points are every rejection over the window turned into points", async () => {
  const rows = [risked(false), risked(true), risked(false)]
  expect(await fetchLuckPoints(answering(rows), FROM, TO)).toBe(4)
})

test("a rejection whose answer is still to come counts as a risk rather than a no", async () => {
  expect(await fetchLuckPoints(answering([risked(null), risked(undefined)]), FROM, TO)).toBe(2)
})

test("a window holding no rejection earns zero rather than nothing", async () => {
  expect(await fetchLuckPoints(answering([]), FROM, TO)).toBe(0)
})

test("the rejections asked for are the ones the window holds", () => {
  expect(rejectionsBetween(FROM, TO)).toEqual({
    pageTypeSlug: "rejection",
    where: { happenedAt: { "at-or-after": FROM, before: TO } },
    keys: ["id", "rejected"],
  })
})

test("a store that refuses is a fault rather than points of nothing", async () => {
  await expect(
    fetchLuckPoints(refusing("the index holds no such page type"), FROM, TO)
  ).rejects.toThrow("unknown rather than nothing")
})
