import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/checks/overwhere-iii-time-passing.world-check.settling.code.ts"

test("minutes passing move the end time on", () => {
  expect(settled({ from: "2026-09-29T16:30:00.000Z", minutes: 20 })).toEqual({
    answered: { endsAt: "2026-09-29T16:50:00.000Z", day: 1, light: "day" },
  })
})

test("the hour after five in the evening is dusk", () => {
  expect(settled({ from: "2026-09-29T16:30:00.000Z", minutes: 45 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("six in the evening is night", () => {
  expect(settled({ from: "2026-09-29T17:30:00.000Z", minutes: 30 })).toHaveProperty(
    "answered.light",
    "night"
  )
})

test("a night's sleep crosses into the next day at dawn", () => {
  expect(settled({ from: "2026-09-29T21:00:00.000Z", minutes: 600 })).toEqual({
    answered: { endsAt: "2026-09-30T07:00:00.000Z", day: 2, light: "dawn" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-09-29T16:30:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-28T16:30:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-29T16:30:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
