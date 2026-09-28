import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/checks/otherwhere-xi-time-passing.world-check.settling.code.ts"

test("the first turn ends at six, at dawn on day one", () => {
  expect(settled({ from: "2026-09-28T05:50:00.000Z", minutes: 10 })).toEqual({
    answered: { endsAt: "2026-09-28T06:00:00.000Z", day: 1, light: "dawn" },
  })
})

test("half past six in the morning is day", () => {
  expect(settled({ from: "2026-09-28T06:00:00.000Z", minutes: 30 })).toHaveProperty(
    "answered.light",
    "day"
  )
})

test("a quarter past six in the evening is dusk", () => {
  expect(settled({ from: "2026-09-28T17:00:00.000Z", minutes: 75 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-09-28T21:00:00.000Z", minutes: 570 })).toEqual({
    answered: { endsAt: "2026-09-29T06:30:00.000Z", day: 2, light: "day" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-09-28T06:00:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-27T15:30:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-28T06:00:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
