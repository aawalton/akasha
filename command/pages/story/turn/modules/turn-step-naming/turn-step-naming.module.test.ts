import { expect, test } from "bun:test"
import {
  BEATS_STEP,
  LORE_STEP,
  PROSE_STEP,
  partStep,
  recordStep,
  reviewStep,
  stepDoing,
} from "akasha/command/pages/story/turn/modules/turn-step-naming/turn-step-naming.module.code.ts"

test("each step of a one-seat turn has one name", () => {
  expect([LORE_STEP, BEATS_STEP, PROSE_STEP]).toEqual(["lore", "beats", "prose"])
  const parts = (["event", "changes", "prose", "memory", "pictured"] as const).map(partStep)
  expect(parts).toEqual(["restate", "numbers", "prose", "memory", "pictures"])
  expect(reviewStep("style")).toBe("review style")
  expect(recordStep("memory")).toBe("record memory")
})

test("what a seat on a step is doing is said from that step's one name, and its beat where it has one", () => {
  expect(stepDoing(LORE_STEP, null)).toBe("gathering the lore")
  expect(stepDoing(BEATS_STEP, null)).toBe("planning the beats")
  expect(stepDoing(partStep("event"), 2)).toBe("restating the event for beat 2")
  expect(stepDoing(partStep("changes"), 3)).toBe("checking the numbers for beat 3")
  expect(stepDoing(PROSE_STEP, null)).toBe("writing the prose")
  expect(stepDoing(PROSE_STEP, 1)).toBe("writing the prose for beat 1")
  expect(stepDoing(partStep("memory"), null)).toBe("recording the memory")
  expect(stepDoing(reviewStep("story-arc"), null)).toBe("reviewing story arc")
  expect(stepDoing(recordStep("mechanics"), null)).toBe("recording mechanics")
  expect(stepDoing("tidy", null)).toBe("working on tidy")
})
