import { expect, test } from "bun:test"
import {
  type Absorbed,
  type Ran,
  runMechanic,
} from "akasha/story/game/game-mechanic/pages/essence-absorption/essence-absorption.game-mechanic.code.ts"

const AT = {
  element: "ember",
  held: { intellect: 18, will: 16 },
  intent: 3,
  roll: { total: 4, crit: false, fumble: false },
  tier: null,
  trained: false,
}

function answeredOf(ran: Ran): Absorbed {
  if ("refused" in ran) throw new Error(ran.refused)
  return ran.answered
}

test("the first absorption on the first floor comes off rough, as the tower recorded it", () => {
  const ran = answeredOf(runMechanic(AT))
  expect(ran.score).toBeCloseTo(44.6)
  expect(ran.margin).toBeCloseTo(-5.4)
  expect(ran).toMatchObject({
    band: "rough",
    training: 0,
    focus: 30,
    pool: "hp",
    backlash: 12,
    opens: true,
  })
})

test("holding the element already makes the next absorption cleaner", () => {
  const ran = answeredOf(
    runMechanic({
      ...AT,
      tier: "affinity",
      trained: true,
      intent: 5,
      roll: { total: 9, crit: false, fumble: false },
    })
  )
  expect(ran.margin).toBeCloseTo(7.6)
  expect(ran).toMatchObject({ band: "adequate", training: 6, focus: 18, backlash: 5, opens: false })
})

test("a relevant skill or any affinity at all trains the absorber by three", () => {
  expect(answeredOf(runMechanic({ ...AT, trained: true })).training).toBe(3)
})

test("each tier above the first trains the absorber one more", () => {
  expect(answeredOf(runMechanic({ ...AT, tier: "spirit" })).training).toBe(8)
})

test("a clean absorption costs less focus and carries no backlash", () => {
  const ran = answeredOf(runMechanic({ ...AT, tier: "soul", intent: 10 }))
  expect(ran).toMatchObject({ band: "clean", focus: 9, backlash: 0, lingers: null })
})

test("a rough absorption of sound rings the ears", () => {
  const ran = answeredOf(runMechanic({ ...AT, element: "sound" }))
  expect(ran).toMatchObject({ pool: "focus", backlash: 25 })
  expect(ran.lingers).toContain("ringing ears")
})

test("an absorption takes whatever the dice say", () => {
  expect(
    answeredOf(runMechanic({ ...AT, roll: { total: 1, crit: false, fumble: true } })).band
  ).toBe("rough")
})

test("an element no affinity is of is refused", () => {
  expect(runMechanic({ ...AT, element: "cold" })).toHaveProperty("refused")
})
