import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/checks/otherwhere-ix-time-passing.world-check.settling.code.ts"

test("minutes passing move the end time on", () => {
  expect(settled({ from: "2026-09-28T15:30:00.000Z", minutes: 30 })).toEqual({
    answered: { endsAt: "2026-09-28T16:00:00.000Z", day: 1, light: "day" },
  })
})

test("the story's first date is day one", () => {
  expect(settled({ from: "2026-09-28T00:00:00.000Z", minutes: 0 })).toHaveProperty(
    "answered.day",
    1
  )
})

test("a quarter to six in the morning is dawn", () => {
  expect(settled({ from: "2026-09-29T05:00:00.000Z", minutes: 45 })).toHaveProperty(
    "answered.light",
    "dawn"
  )
})

test("a quarter to seven in the evening is dusk", () => {
  expect(settled({ from: "2026-09-28T15:30:00.000Z", minutes: 195 })).toHaveProperty(
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
  expect(settled({ from: "2026-09-28T15:30:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2026-09-27T15:30:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2026-09-28T15:30:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
