import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/god-of-trash/stories/played/otherwhere-vii/mechanics/checks/otherwhere-vii-cultivating.world-check.settling.code.ts"

test("sensing that meets its hard target wakes mana and climbs no step", () => {
  expect(settled({ act: "sensing" }, { total: 16, crit: false, fumble: false })).toEqual({
    answered: {
      outcome: "success",
      woke: true,
      rises: false,
      backlash: "none",
      coreCracked: false,
    },
  })
})

test("a step landed at a cost rises with a light backlash", () => {
  expect(
    settled(
      { act: "step", bonuses: [{ from: "thick mana", by: 2 }] },
      { total: 12, crit: false, fumble: false }
    )
  ).toEqual({
    answered: { outcome: "cost", woke: false, rises: true, backlash: "light", coreCracked: false },
  })
})

test("a new Tier is extreme, and a near miss still fails it", () => {
  expect(settled({ act: "new-tier" }, { total: 15, crit: false, fumble: false })).toHaveProperty(
    "answered.rises",
    false
  )
})

test("failing a new Tier by more than eight cracks the core", () => {
  expect(settled({ act: "new-tier" }, { total: 2, crit: false, fumble: false })).toHaveProperty(
    "answered.coreCracked",
    true
  )
})

test("each failed try before costs one more", () => {
  expect(
    settled({ act: "step", failedBefore: 2 }, { total: 17, crit: false, fumble: false })
  ).toHaveProperty("answered.outcome", "cost")
})

test("an act the world has no name for is refused", () => {
  expect(settled({ act: "ascending" }, { total: 20, crit: true, fumble: false })).toHaveProperty(
    "refused"
  )
})
