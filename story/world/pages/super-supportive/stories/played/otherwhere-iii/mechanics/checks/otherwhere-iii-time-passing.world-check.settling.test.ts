import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/super-supportive/stories/played/otherwhere-iii/mechanics/checks/otherwhere-iii-time-passing.world-check.settling.code.ts"

test("minutes passing move the end time on", () => {
  expect(settled({ from: "2037-01-31T04:45:00.000Z", minutes: 15 })).toEqual({
    answered: { endsAt: "2037-01-31T05:00:00.000Z", day: 1, light: "night" },
  })
})

test("the story's first date is day one", () => {
  expect(settled({ from: "2037-01-31T00:00:00.000Z", minutes: 0 })).toHaveProperty(
    "answered.day",
    1
  )
})

test("the half hour before seven in the morning is dawn", () => {
  expect(settled({ from: "2037-01-31T06:30:00.000Z", minutes: 15 })).toHaveProperty(
    "answered.light",
    "dawn"
  )
})

test("five in the afternoon is dusk", () => {
  expect(settled({ from: "2037-01-31T16:30:00.000Z", minutes: 30 })).toHaveProperty(
    "answered.light",
    "dusk"
  )
})

test("a night's sleep crosses into the next day", () => {
  expect(settled({ from: "2037-01-31T22:00:00.000Z", minutes: 540 })).toEqual({
    answered: { endsAt: "2037-02-01T07:00:00.000Z", day: 2, light: "dawn" },
  })
})

test("time never runs backward", () => {
  expect(settled({ from: "2037-01-31T10:00:00.000Z", minutes: -5 })).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(settled({ from: "2037-01-30T10:00:00.000Z", minutes: 5 })).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(settled({ from: "2037-01-31T10:00:00.000Z", minutes: 20_000 })).toHaveProperty("refused")
})
