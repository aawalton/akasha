import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const watching = await import(
  "akasha/infrastructure/services/workstations/service-watching/service-watching.module.code.ts"
)

mock.module(
  "akasha/infrastructure/services/workstations/service-watching/service-watching.module.code.ts",
  () => ({
    ...watching,
    runServiceWatching: () => {
      RAN.push("watch")
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/service-watching.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the watching module's own round rather than a round written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["watch"])
})

test("a round that could not read the services is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  RAN.length = 0
  const why = new Error("service-watching: the services could not be read, so nothing is judged")
  mock.module(
    "akasha/infrastructure/services/workstations/service-watching/service-watching.module.code.ts",
    () => ({ ...watching, runServiceWatching: () => Promise.reject(why) })
  )
  await expect(running.runService()).rejects.toThrow("could not be read")
})
