import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/god-of-trash/stories/played/otherwhere-vii/mechanics/checks/otherwhere-vii-time-passing.world-check.settling.code.ts"

test("minutes passing move the end time on", () => {
  expect(settled({ from: "2026-09-28T06:10:00.000Z", minutes: 30 })).toEqual({
    answered: { endsAt: "2026-09-28T06:40:00.000Z", day: 1, light: "day" },
  })
})

test("ten past six on the first morning is dawn of day one", () => {
  expect(settled({ from: "2026-09-28T06:00:00.000Z", minutes: 10 })).toEqual({
    answered: { endsAt: "2026-09-28T06:10:00.000Z", day: 1, light: "dawn" },
  })
})

test("a quarter to seven in the evening is dusk", () => {
  expect(settled({ from: "2026-09-28T18:00:00.000Z", minutes: 45 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-09-28T21:00:00.000Z", minutes: 560 })).toEqual({
    answered: { endsAt: "2026-09-29T06:20:00.000Z", day: 2, light: "dawn" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2026-09-28T06:10:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-27T06:10:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-28T06:10:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
