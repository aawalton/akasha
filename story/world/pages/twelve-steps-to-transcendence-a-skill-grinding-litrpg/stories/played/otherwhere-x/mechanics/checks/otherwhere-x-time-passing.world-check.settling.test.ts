import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/checks/otherwhere-x-time-passing.world-check.settling.code.ts"

test("minutes passing move the end time on", () => {
  expect(settled({ from: "2026-09-28T17:00:00.000Z", minutes: 30 })).toEqual({
    answered: { endsAt: "2026-09-28T17:30:00.000Z", day: 1, light: "day" },
  })
})

test("the story's first date is day one", () => {
  expect(settled({ from: "2026-09-28T00:00:00.000Z", minutes: 0 })).toHaveProperty(
    "answered.day",
    1
  )
})

test("a walk to Harrow barefoot from five o'clock ends in daylight", () => {
  expect(settled({ from: "2026-09-28T17:00:00.000Z", minutes: 60 })).toHaveProperty(
    "answered.light",
    "day"
  )
})

test("twenty to seven in the evening is dusk", () => {
  expect(settled({ from: "2026-09-28T17:00:00.000Z", minutes: 100 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("six in the morning is dawn", () => {
  expect(settled({ from: "2026-09-29T05:00:00.000Z", minutes: 60 })).toHaveProperty(
    "answered.light",
    "dawn"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-09-28T21:00:00.000Z", minutes: 570 })).toEqual({
    answered: { endsAt: "2026-09-29T06:30:00.000Z", day: 2, light: "day" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-09-28T17:00:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-27T17:00:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-28T17:00:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
