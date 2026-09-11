import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const reaping = await import(
  "akasha/infrastructure/memory/reaping/memory-reaper-running/memory-reaper-running.module.code.ts"
)

mock.module(
  "akasha/infrastructure/memory/reaping/memory-reaper-running/memory-reaper-running.module.code.ts",
  () => ({
    ...reaping,
    runMemoryReaper: () => {
      RAN.push("loop")
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/memory-reaper.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the reaper module's own loop rather than a loop written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["loop"])
})

test("a loop that ended badly is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  const why = new Error("the reaper could not read the process table")
  mock.module(
    "akasha/infrastructure/memory/reaping/memory-reaper-running/memory-reaper-running.module.code.ts",
    () => ({
      ...reaping,
      runMemoryReaper: () => Promise.reject(why),
    })
  )
  await expect(running.runService()).rejects.toThrow("the reaper could not read the process table")
})
