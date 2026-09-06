import { expect, test } from "bun:test"
import { wisdomIn } from "@akasha/readout-system/attribute-wisdom"
import { charismaOf, type Day, totalOver } from "./attributes-totalling.module.code.ts"

const AT_EASE_WITH_SOMEONE = {
  safetyLevel: "3",
  difficultyLevel: "1",
  startTime: "2026-09-05T14:00:00.000Z",
  endTime: "2026-09-05T16:00:00.000Z",
  relationships: ["01a06841-a1cb-7072-8aa0-eb11c0a4258b"],
}

const ALONE = { ...AT_EASE_WITH_SOMEONE, relationships: [] }

test("a total is the sum of an attribute's points over every day", () => {
  const days: readonly Day[] = [{ "wisdom-words": 10000 }, { "wisdom-words": 5000 }]
  expect(totalOver(days, wisdomIn)).toBe(1.5)
})

test("a day carrying nothing for an attribute adds nothing to that attribute", () => {
  const days: readonly Day[] = [{ "wisdom-words": 10000 }, { date: "2026-03-05" }]
  expect(totalOver(days, wisdomIn)).toBe(1)
})

test("an attribute no day carries a figure for is an absent total", () => {
  expect(totalOver([{ date: "2026-03-05" }], wisdomIn)).toBeNull()
})

test("a total over no day at all is absent", () => {
  expect(totalOver([], wisdomIn)).toBeNull()
})

test("a day's charisma is the hours of its stretches at ease with someone", () => {
  expect(charismaOf({ sessions: [AT_EASE_WITH_SOMEONE] })).toBe(2)
})

test("a stretch naming nobody earns no hours", () => {
  expect(charismaOf({ sessions: [ALONE] })).toBe(0)
})

test("a day whose stretches are no list is an absent charisma", () => {
  expect(charismaOf({ date: "2026-03-05" })).toBeNull()
})
