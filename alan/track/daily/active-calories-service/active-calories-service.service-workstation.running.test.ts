import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const calories = await import(
  "akasha/alan/track/daily/day-active-calories/day-active-calories.module.code.ts"
)

mock.module(
  "akasha/alan/track/daily/day-active-calories/day-active-calories.module.code.ts",
  () => ({
    ...calories,
    runDayActiveCalories: () => {
      RAN.push("roll")
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/alan/track/daily/active-calories-service/active-calories-service.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the calories module's own roll rather than a roll written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["roll"])
})

test("a roll that landed nothing is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  RAN.length = 0
  const why = new Error(calories.NOTHING_LANDED)
  mock.module(
    "akasha/alan/track/daily/day-active-calories/day-active-calories.module.code.ts",
    () => ({
      ...calories,
      runDayActiveCalories: () => Promise.reject(why),
    })
  )
  await expect(running.runService()).rejects.toThrow(calories.NOTHING_LANDED)
})
