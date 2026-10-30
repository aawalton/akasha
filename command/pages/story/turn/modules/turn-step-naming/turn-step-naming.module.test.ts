import { expect, test } from "bun:test"
import {
  BEATS_STEP,
  LORE_STEP,
  PROSE_STEP,
  partStep,
  recordStep,
  reviewStep,
} from "akasha/command/pages/story/turn/modules/turn-step-naming/turn-step-naming.module.code.ts"

test("each step of a one-seat turn has one name", () => {
  expect([LORE_STEP, BEATS_STEP, PROSE_STEP]).toEqual(["lore", "beats", "prose"])
  const parts = (["event", "changes", "prose", "memory", "pictured"] as const).map(partStep)
  expect(parts).toEqual(["restate", "numbers", "prose", "memory", "pictures"])
  expect(reviewStep("style")).toBe("review style")
  expect(recordStep("memory")).toBe("record memory")
})
