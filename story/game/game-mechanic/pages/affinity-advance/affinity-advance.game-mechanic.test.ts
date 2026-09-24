import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/game-mechanic/pages/affinity-advance/affinity-advance.game-mechanic.code.ts"

const AT = { tier: "manipulation", count: 3, pool: 0, deposited: 0, absorbed: false }

test("a matched event deposits one, and a count in the first band costs one", () => {
  expect(runMechanic(AT)).toEqual({
    answered: { tier: "manipulation", count: 4, pool: 0, deposited: 1, gained: 1, promoted: false },
  })
})

test("absorbing a seed of the element deposits two", () => {
  expect(runMechanic({ ...AT, absorbed: true })).toEqual({
    answered: { tier: "manipulation", count: 5, pool: 0, deposited: 2, gained: 2, promoted: false },
  })
})

test("an encounter deposits at most three events", () => {
  expect(runMechanic({ ...AT, deposited: 3, absorbed: true })).toEqual({
    answered: { tier: "manipulation", count: 3, pool: 0, deposited: 3, gained: 0, promoted: false },
  })
})

test("a count past ten costs two events", () => {
  expect(
    runMechanic({ tier: "manipulation", count: 12, pool: 1, deposited: 0, absorbed: false })
  ).toEqual({
    answered: {
      tier: "manipulation",
      count: 13,
      pool: 0,
      deposited: 1,
      gained: 1,
      promoted: false,
    },
  })
})

test("a count past forty costs four events, and no more", () => {
  expect(
    runMechanic({ tier: "spirit", count: 60, pool: 3, deposited: 0, absorbed: false })
  ).toEqual({
    answered: { tier: "spirit", count: 61, pool: 0, deposited: 1, gained: 1, promoted: false },
  })
})

test("reaching the cap promotes the tier and opens the count at one", () => {
  expect(
    runMechanic({ tier: "affinity", count: 9, pool: 0, deposited: 0, absorbed: false })
  ).toEqual({
    answered: { tier: "manipulation", count: 1, pool: 0, deposited: 1, gained: 1, promoted: true },
  })
})

test("the soul tier climbs no further at its cap", () => {
  expect(runMechanic({ tier: "soul", count: 1000, pool: 0, deposited: 0, absorbed: true })).toEqual(
    {
      answered: { tier: "soul", count: 1000, pool: 2, deposited: 2, gained: 0, promoted: false },
    }
  )
})

test("a tier no affinity climbs is refused", () => {
  expect(runMechanic({ ...AT, tier: "kindled" })).toHaveProperty("refused")
})
