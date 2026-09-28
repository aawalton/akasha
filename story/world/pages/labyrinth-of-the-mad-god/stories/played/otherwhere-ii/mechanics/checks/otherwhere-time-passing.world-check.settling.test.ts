import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/checks/otherwhere-time-passing.world-check.settling.code.ts"

test("minutes passing move the end time on", () => {
  expect(settled({ from: "2026-09-28T10:00:00.000Z", minutes: 45 })).toEqual({
    answered: { endsAt: "2026-09-28T10:45:00.000Z", day: 1, light: "day" },
  })
})

test("the story's first date is day one", () => {
  expect(settled({ from: "2026-09-28T00:00:00.000Z", minutes: 0 })).toHaveProperty(
    "answered.day",
    1
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-09-28T21:00:00.000Z", minutes: 540 })).toEqual({
    answered: { endsAt: "2026-09-29T06:00:00.000Z", day: 2, light: "dawn" },
  })
})

test("the half hour after half past six in the evening is dusk", () => {
  expect(settled({ from: "2026-09-28T18:00:00.000Z", minutes: 45 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("late evening is night", () => {
  expect(settled({ from: "2026-09-28T19:00:00.000Z", minutes: 60 })).toHaveProperty(
    "answered.light",
    "night"
  )
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-09-28T10:00:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-27T10:00:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-28T10:00:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
