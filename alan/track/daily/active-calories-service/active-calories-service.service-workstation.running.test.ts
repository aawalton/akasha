import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const calories = await import(
  "akasha/alan/track/daily/modules/day-active-calories/day-active-calories.module.code.ts"
)

mock.module(
  "akasha/alan/track/daily/modules/day-active-calories/day-active-calories.module.code.ts",
  () => ({
    ...calories,
    watchActiveCalories: () => {
      RAN.push("watch")
      return { stop: () => undefined, unfollowed: [] }
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

test("a run starts the calories module's own watch and never ends, so the unit stays up", async () => {
  RAN.length = 0
  const ended = await Promise.race([
    running.runService().then(() => "ended"),
    Bun.sleep(50).then(() => "running"),
  ])
  expect(RAN).toEqual(["watch"])
  expect(ended).toBe("running")
})
