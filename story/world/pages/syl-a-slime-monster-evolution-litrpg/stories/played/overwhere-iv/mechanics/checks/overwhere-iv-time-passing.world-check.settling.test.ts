import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/checks/overwhere-iv-time-passing.world-check.settling.code.ts"

test("minutes passing move the end time on", () => {
  expect(settled({ from: "2026-09-29T12:00:00.000Z", minutes: 45 })).toEqual({
    answered: { endsAt: "2026-09-29T12:45:00.000Z", day: 1, light: "day" },
  })
})

test("noon on day one is day", () => {
  expect(settled({ from: "2026-09-29T12:00:00.000Z", minutes: 0 })).toEqual({
    answered: { endsAt: "2026-09-29T12:00:00.000Z", day: 1, light: "day" },
  })
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-09-29T21:00:00.000Z", minutes: 570 })).toEqual({
    answered: { endsAt: "2026-09-30T06:30:00.000Z", day: 2, light: "dawn" },
  })
})

test("the hour after six in the evening is dusk", () => {
  expect(settled({ from: "2026-09-29T17:30:00.000Z", minutes: 45 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("late evening is night", () => {
  expect(settled({ from: "2026-09-29T19:00:00.000Z", minutes: 60 })).toHaveProperty(
    "answered.light",
    "night"
  )
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-09-29T12:00:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-28T10:00:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-29T12:00:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
