import { expect, mock, test } from "bun:test"

const HANDED: (readonly unknown[])[] = []

const syncing = await import("akasha/alan/harness/monarch/syncing/monarch-syncing.module.code.ts")

mock.module("akasha/alan/harness/monarch/syncing/monarch-syncing.module.code.ts", () => ({
  ...syncing,
  runMonarchSyncing: (...given: readonly unknown[]) => {
    HANDED.push(given)
    return Promise.resolve()
  },
}))

const running = await import(
  "akasha/infrastructure/services/workstations/pages/monarch-sync.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the syncing module's own sync rather than a sync written again here", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED.length).toBe(1)
})

test("the sync is handed the empty argv the unit's command line hands it, so it copies the whole of Monarch rather than a window", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED[0]).toEqual([[]])
})

test("a sync that could not run is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  HANDED.length = 0
  const why = new Error("Monarch could not be read")
  mock.module("akasha/alan/harness/monarch/syncing/monarch-syncing.module.code.ts", () => ({
    ...syncing,
    runMonarchSyncing: () => Promise.reject(why),
  }))
  await expect(running.runService()).rejects.toThrow("Monarch could not be read")
})
