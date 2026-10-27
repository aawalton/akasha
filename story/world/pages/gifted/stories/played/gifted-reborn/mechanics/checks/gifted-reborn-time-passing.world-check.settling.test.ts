import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/checks/gifted-reborn-time-passing.world-check.settling.code.ts"

test("the first turn ends at a quarter to nine at night on day one", () => {
  expect(settled({ from: "2026-10-27T20:30:00.000Z", minutes: 15 })).toEqual({
    answered: { endsAt: "2026-10-27T20:45:00.000Z", day: 1, light: "night" },
  })
})

test("half past seven in the morning is dawn", () => {
  expect(settled({ from: "2026-10-28T07:00:00.000Z", minutes: 30 })).toHaveProperty(
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

test("a quarter to five in the afternoon is dusk", () => {
  expect(settled({ from: "2026-10-28T16:00:00.000Z", minutes: 45 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-10-27T21:00:00.000Z", minutes: 600 })).toEqual({
    answered: { endsAt: "2026-10-28T07:00:00.000Z", day: 2, light: "night" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-10-27T21:00:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-10-26T20:00:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-10-27T21:00:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
