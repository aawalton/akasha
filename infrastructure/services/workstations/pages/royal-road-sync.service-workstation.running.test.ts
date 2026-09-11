import { expect, mock, test } from "bun:test"

const COMMIT = "--commit"
const HANDED: (readonly string[])[] = []
let CODE = 0

const syncing = await import(
  "akasha/alan/collections/royal-road/syncing/royal-road-syncing.module.code.ts"
)

mock.module("akasha/alan/collections/royal-road/syncing/royal-road-syncing.module.code.ts", () => ({
  ...syncing,
  main: (argv: readonly string[]) => {
    HANDED.push(argv)
    return Promise.resolve(CODE)
  },
}))

const running = await import(
  "akasha/infrastructure/services/workstations/pages/royal-road-sync.service-workstation.running.code.ts"
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
  CODE = 0
  await running.runService()
  expect(HANDED.length).toBe(1)
})

test("the sync is asked to commit, which is what the unit's command line asks", async () => {
  HANDED.length = 0
  CODE = 0
  await running.runService()
  expect(HANDED[0]).toEqual([COMMIT])
})
