import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/beware-of-chicken/stories/played/otherwhere-iv/mechanics/checks/otherwhere-iv-time-passing.world-check.settling.code.ts"

test("minutes passing move the end time on", () => {
  expect(settled({ from: "2026-09-28T05:40:00.000Z", minutes: 50 })).toEqual({
    answered: { endsAt: "2026-09-28T06:30:00.000Z", day: 1, light: "day" },
  })
})

test("the story's first date is day one", () => {
  expect(settled({ from: "2026-09-28T00:00:00.000Z", minutes: 0 })).toHaveProperty(
    "answered.day",
    1
  )
})

test("the half hour after five in the morning is dawn", () => {
  expect(settled({ from: "2026-09-28T04:50:00.000Z", minutes: 20 })).toHaveProperty(
    "answered.light",
    "dawn"
  )
})

test("seven in the evening is dusk", () => {
  expect(settled({ from: "2026-09-28T18:45:00.000Z", minutes: 30 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2026-09-28T21:00:00.000Z", minutes: 510 })).toEqual({
    answered: { endsAt: "2026-09-29T05:30:00.000Z", day: 2, light: "day" },
  })
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
