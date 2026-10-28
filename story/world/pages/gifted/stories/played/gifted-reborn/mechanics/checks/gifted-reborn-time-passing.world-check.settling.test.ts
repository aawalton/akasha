import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/checks/gifted-reborn-time-passing.world-check.settling.code.ts"

test("the first turn ends at twenty-two minutes to nine at night on day one", () => {
  expect(settled({ from: "2026-10-27T20:30:00.000Z", minutes: 8 })).toEqual({
    answered: { endsAt: "2026-10-27T20:38:00.000Z", day: 1, light: "night" },
  })
})

test("a quarter past six in the morning is dawn", () => {
  expect(settled({ from: "2026-10-28T06:00:00.000Z", minutes: 15 })).toHaveProperty(
    "answered.light",
    "dawn"
  )
})

test("noon is day", () => {
  expect(settled({ from: "2026-10-28T11:00:00.000Z", minutes: 60 })).toHaveProperty(
    "answered.light",
    "day"
  )
})

test("twenty past six in the evening is dusk", () => {
  expect(settled({ from: "2026-10-28T18:00:00.000Z", minutes: 20 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-10-27T21:00:00.000Z", minutes: 600 })).toEqual({
    answered: { endsAt: "2026-10-28T07:00:00.000Z", day: 2, light: "day" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-10-27T21:00:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn starts before day one", () => {
  expect(settled({ from: "2026-10-26T20:00:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-10-27T21:00:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
