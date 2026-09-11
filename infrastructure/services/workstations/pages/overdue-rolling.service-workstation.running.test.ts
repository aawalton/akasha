import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const rolling = await import("akasha/alan/harness/overdue-rolling/overdue-rolling.module.code.ts")

mock.module("akasha/alan/harness/overdue-rolling/overdue-rolling.module.code.ts", () => ({
  ...rolling,
  runOverdueRolling: () => {
    RAN.push("roll")
    return Promise.resolve()
  },
}))

const running = await import(
  "akasha/infrastructure/services/workstations/pages/overdue-rolling.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the rolling module's own roll rather than a roll written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["roll"])
})

test("a roll that could not run is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  RAN.length = 0
  const why = new Error("the overdue to-dos could not be written")
  mock.module("akasha/alan/harness/overdue-rolling/overdue-rolling.module.code.ts", () => ({
    ...rolling,
    runOverdueRolling: () => Promise.reject(why),
  }))
  await expect(running.runService()).rejects.toThrow("the overdue to-dos could not be written")
})
