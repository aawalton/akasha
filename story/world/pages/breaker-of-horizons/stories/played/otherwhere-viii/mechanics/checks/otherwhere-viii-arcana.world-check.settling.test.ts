import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/checks/otherwhere-viii-arcana.world-check.settling.code.ts"

test("a light orb from a full pool leaves her clear", () => {
  expect(settled({ have: 6, max: 6, spend: 1 })).toEqual({ answered: { left: 5, stage: "clear" } })
})

test("spending to nought is still clear", () => {
  expect(settled({ have: 3, max: 6, spend: 3 })).toEqual({ answered: { left: 0, stage: "clear" } })
})

test("one below nought is strained", () => {
  expect(settled({ have: 1, max: 6, spend: 2 })).toEqual({
    answered: { left: -1, stage: "strained" },
  })
})

test("two below nought is still strained", () => {
  expect(settled({ have: 0, max: 6, spend: 2 })).toHaveProperty("answered.stage", "strained")
})

test("three below nought is overdrawn", () => {
  expect(settled({ have: 0, max: 6, spend: 3 })).toHaveProperty("answered.stage", "overdrawn")
})

test("five below nought is still overdrawn", () => {
  expect(settled({ have: -2, max: 6, spend: 3 })).toHaveProperty("answered.stage", "overdrawn")
})

test("six below nought is collapsed", () => {
  expect(settled({ have: -2, max: 6, spend: 4 })).toHaveProperty("answered.stage", "collapsed")
})

test("eight below nought is still collapsed", () => {
  expect(settled({ have: -4, max: 6, spend: 4 })).toHaveProperty("answered.stage", "collapsed")
})

test("nine below nought is dying", () => {
  expect(settled({ have: -5, max: 6, spend: 4 })).toEqual({
    answered: { left: -9, stage: "dying" },
  })
})

test("an hour of rest adds one before spending", () => {
  expect(settled({ have: 4, max: 6, spend: 0, rest: "hour" })).toHaveProperty("answered.left", 5)
})

test("an hour of rest adds nothing past the most she holds", () => {
  expect(settled({ have: 6, max: 6, spend: 0, rest: "hour" })).toHaveProperty("answered.left", 6)
})

test("a night of rest fills the pool before spending", () => {
  expect(settled({ have: -4, max: 6, spend: 2, rest: "night" })).toEqual({
    answered: { left: 4, stage: "clear" },
  })
})

test("arcana held past the most she holds is refused", () => {
  expect(settled({ have: 7, max: 6, spend: 0 })).toHaveProperty("refused")
})

test("arcana held below twenty under nought is refused", () => {
  expect(settled({ have: -21, max: 6, spend: 0 })).toHaveProperty("refused")
})

test("a spending below nought is refused", () => {
  expect(settled({ have: 6, max: 6, spend: -1 })).toHaveProperty("refused")
})

test("a rest the game does not have is refused", () => {
  expect(settled({ have: 6, max: 6, spend: 1, rest: "week" })).toHaveProperty("refused")
})

test("a reading with no most is refused", () => {
  expect(settled({ have: 6, spend: 1 })).toHaveProperty("refused")
})
