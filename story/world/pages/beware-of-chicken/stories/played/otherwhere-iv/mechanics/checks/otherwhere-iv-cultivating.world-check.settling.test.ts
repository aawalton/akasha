import { expect, test } from "bun:test"
import {
  cultivatingSettled,
  settled,
} from "akasha/story/world/pages/beware-of-chicken/stories/played/otherwhere-iv/mechanics/checks/otherwhere-iv-cultivating.world-check.settling.code.ts"

test("a dantian opened cleanly rises with no deviation", () => {
  const roll = { total: 17, crit: false, fumble: false }
  expect(cultivatingSettled(roll, { kind: "opening", newRealm: false, bonus: 0 })).toEqual({
    answered: { outcome: "success", rises: true, deviation: false, lasting: false },
  })
})

test("a breakthrough within a realm landed at a cost rises and deviates", () => {
  const roll = { total: 13, crit: false, fumble: false }
  expect(cultivatingSettled(roll, { kind: "breakthrough", newRealm: false, bonus: 0 })).toEqual({
    answered: { outcome: "cost", rises: true, deviation: true, lasting: false },
  })
})

test("a failed breakthrough into a new realm deviates without rising", () => {
  const roll = { total: 12, crit: false, fumble: false }
  expect(cultivatingSettled(roll, { kind: "breakthrough", newRealm: true, bonus: 0 })).toEqual({
    answered: { outcome: "failure", rises: false, deviation: true, lasting: false },
  })
})

test("a breakthrough missing by more than eight leaves a lasting condition", () => {
  const roll = { total: 11, crit: false, fumble: false }
  expect(cultivatingSettled(roll, { kind: "breakthrough", newRealm: true, bonus: 0 })).toEqual({
    answered: { outcome: "failure", rises: false, deviation: true, lasting: true },
  })
})

test("a bonus of six carries a breakthrough into a new realm", () => {
  const roll = { total: 14, crit: false, fumble: false }
  expect(cultivatingSettled(roll, { kind: "breakthrough", newRealm: true, bonus: 6 })).toEqual({
    answered: { outcome: "success", rises: true, deviation: false, lasting: false },
  })
})

test("Qi sensed neither rises nor deviates", () => {
  const roll = { total: 16, crit: false, fumble: false }
  expect(cultivatingSettled(roll, { kind: "sensing", newRealm: false, bonus: 0 })).toEqual({
    answered: { outcome: "success", rises: false, deviation: false, lasting: false },
  })
})

test("an act the check does not know is refused", () => {
  const roll = { total: 16, crit: false, fumble: false }
  expect(settled({ kind: "meditating" }, roll)).toHaveProperty("refused")
})
