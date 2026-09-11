import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const syncing = await import(
  "akasha/alan/collections/great-courses/catalogue-syncing/catalogue-syncing.module.code.ts"
)

mock.module(
  "akasha/alan/collections/great-courses/catalogue-syncing/catalogue-syncing.module.code.ts",
  () => ({
    ...syncing,
    runCatalogueSyncing: () => {
      RAN.push("sync")
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/great-courses-sync.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the syncing module's own sync rather than a sync written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["sync"])
})

test("a sync that could not run is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  RAN.length = 0
  const why = new Error("the catalogue could not be read")
  mock.module(
    "akasha/alan/collections/great-courses/catalogue-syncing/catalogue-syncing.module.code.ts",
    () => ({
      ...syncing,
      runCatalogueSyncing: () => Promise.reject(why),
    })
  )
  await expect(running.runService()).rejects.toThrow("the catalogue could not be read")
})
