import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/checks/overwhere-i-time-passing.world-check.settling.code.ts"

test("the first turn ends at five past ten in the day of day one", () => {
  expect(settled({ from: "2026-09-29T10:00:00.000Z", minutes: 5 })).toEqual({
    answered: { endsAt: "2026-09-29T10:05:00.000Z", day: 1, light: "day" },
  })
})

test("six in the morning is dawn", () => {
  expect(settled({ from: "2026-09-30T05:30:00.000Z", minutes: 30 })).toHaveProperty(
    "answered.light",
    "dawn"
  )
})

test("seven in the evening is dusk", () => {
  expect(settled({ from: "2026-09-29T18:00:00.000Z", minutes: 60 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-09-29T21:00:00.000Z", minutes: 570 })).toEqual({
    answered: { endsAt: "2026-09-30T06:30:00.000Z", day: 2, light: "day" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-09-29T10:00:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-28T23:30:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-29T10:00:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
