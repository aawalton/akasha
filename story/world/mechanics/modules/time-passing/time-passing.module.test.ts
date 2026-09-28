import { expect, test } from "bun:test"
import { timePassingSettled } from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const CLOCK = {
  opensAt: "2030-06-01T00:00:00.000Z",
  lights: [
    { until: 6 * 60, light: "night" },
    { until: 7 * 60, light: "dawn" },
    { until: 19 * 60, light: "day" },
    { until: 20 * 60, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
} as const

test("minutes passing move the end time on", () => {
  expect(timePassingSettled(CLOCK, { from: "2030-06-01T10:00:00.000Z", minutes: 30 })).toEqual({
    answered: { endsAt: "2030-06-01T10:30:00.000Z", day: 1, light: "day" },
  })
})

test("passing midnight is the next day", () => {
  expect(
    timePassingSettled(CLOCK, { from: "2030-06-01T23:00:00.000Z", minutes: 120 })
  ).toHaveProperty("answered.day", 2)
})

test("the light is the story's own", () => {
  expect(
    timePassingSettled(CLOCK, { from: "2030-06-01T06:00:00.000Z", minutes: 10 })
  ).toHaveProperty("answered.light", "dawn")
})

test("time never runs backward", () => {
  expect(
    timePassingSettled(CLOCK, { from: "2030-06-01T10:00:00.000Z", minutes: -1 })
  ).toHaveProperty("refused")
})

test("no turn ends before the story opens", () => {
  expect(
    timePassingSettled(CLOCK, { from: "2030-05-31T10:00:00.000Z", minutes: 1 })
  ).toHaveProperty("refused")
})

test("more than a week in one turn is refused", () => {
  expect(
    timePassingSettled(CLOCK, { from: "2030-06-01T10:00:00.000Z", minutes: 20_000 })
  ).toHaveProperty("refused")
})
