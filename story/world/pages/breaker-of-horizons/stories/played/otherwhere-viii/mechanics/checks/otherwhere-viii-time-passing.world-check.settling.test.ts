import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/checks/otherwhere-viii-time-passing.world-check.settling.code.ts"

test("the opening turn ends at twenty to six in the dark before dawn", () => {
  expect(settled({ from: "2026-09-28T05:35:00.000Z", minutes: 5 })).toEqual({
    answered: { endsAt: "2026-09-28T05:40:00.000Z", day: 1, light: "night" },
  })
})

test("six in the morning of day one is dawn", () => {
  expect(settled({ from: "2026-09-28T05:40:00.000Z", minutes: 20 })).toEqual({
    answered: { endsAt: "2026-09-28T06:00:00.000Z", day: 1, light: "dawn" },
  })
})

test("half past six in the evening is dusk", () => {
  expect(settled({ from: "2026-09-28T18:00:00.000Z", minutes: 30 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-09-28T21:00:00.000Z", minutes: 560 })).toEqual({
    answered: { endsAt: "2026-09-29T06:20:00.000Z", day: 2, light: "day" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-09-28T05:40:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-27T05:40:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-28T05:40:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
