import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/checks/test-story-action-check.world-check.settling.code.ts"

test("a standard act meeting twelve comes off", () => {
  expect(settled({ band: "standard" }, { total: 12, crit: false, fumble: false })).toHaveProperty(
    "answered.outcome",
    "success"
  )
})

test("a band the story does not have is refused", () => {
  expect(settled({ band: "trivial" }, { total: 12, crit: false, fumble: false })).toHaveProperty(
    "refused"
  )
})
