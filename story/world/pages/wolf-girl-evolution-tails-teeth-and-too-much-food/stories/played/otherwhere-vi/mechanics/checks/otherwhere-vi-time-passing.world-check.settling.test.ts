import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/wolf-girl-evolution-tails-teeth-and-too-much-food/stories/played/otherwhere-vi/mechanics/checks/otherwhere-vi-time-passing.world-check.settling.code.ts"

test("minutes passing move the end time on", () => {
  expect(settled({ from: "2026-09-28T19:40:00.000Z", minutes: 30 })).toEqual({
    answered: { endsAt: "2026-09-28T20:10:00.000Z", day: 1, light: "night" },
  })
})

test("seven in the evening of day one is dusk", () => {
  expect(settled({ from: "2026-09-28T18:50:00.000Z", minutes: 10 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("six in the morning is dawn", () => {
  expect(settled({ from: "2026-09-29T05:55:00.000Z", minutes: 5 })).toHaveProperty(
    "answered.light",
    "dawn"
  )
})

test("noon is day", () => {
  expect(settled({ from: "2026-09-29T11:00:00.000Z", minutes: 60 })).toHaveProperty(
    "answered.light",
    "day"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-09-28T22:00:00.000Z", minutes: 500 })).toEqual({
    answered: { endsAt: "2026-09-29T06:20:00.000Z", day: 2, light: "dawn" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-09-28T19:40:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-27T19:40:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-28T19:40:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
