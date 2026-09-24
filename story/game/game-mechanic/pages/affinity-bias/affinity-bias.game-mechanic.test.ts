import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/game-mechanic/pages/affinity-bias/affinity-bias.game-mechanic.code.ts"

test("a tier adds its own number to intent", () => {
  expect(runMechanic({ tier: "affinity", matched: true })).toEqual({ answered: { intent: 1 } })
  expect(runMechanic({ tier: "manipulation", matched: true })).toEqual({ answered: { intent: 2 } })
  expect(runMechanic({ tier: "spirit", matched: true })).toEqual({ answered: { intent: 3 } })
  expect(runMechanic({ tier: "soul", matched: true })).toEqual({ answered: { intent: 4 } })
})

test("an action the element does not match is added nothing", () => {
  expect(runMechanic({ tier: "soul", matched: false })).toEqual({ answered: { intent: 0 } })
})

test("a tier no affinity climbs is refused", () => {
  expect(runMechanic({ tier: "kindled", matched: true })).toHaveProperty("refused")
})
