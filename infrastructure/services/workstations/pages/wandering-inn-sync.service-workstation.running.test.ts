import { expect, mock, test } from "bun:test"

const HANDED: (readonly string[])[] = []
let CODE = 0

const syncing = await import("akasha/story/wandering-inn/syncing/syncing.module.code.ts")

mock.module("akasha/story/wandering-inn/syncing/syncing.module.code.ts", () => ({
  ...syncing,
  main: (argv: readonly string[]) => {
    HANDED.push(argv)
    return Promise.resolve(CODE)
  },
}))

const running = await import(
  "akasha/infrastructure/services/workstations/pages/wandering-inn-sync.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the syncing module's own run rather than a sync written again here", async () => {
  HANDED.length = 0
  CODE = 0
  await running.runService()
  expect(HANDED.length).toBe(1)
})

test("the run is handed no arguments, as the unit's command line hands none", async () => {
  HANDED.length = 0
  CODE = 0
  await running.runService()
  expect(HANDED[0]).toEqual([])
})

test("a sync that could not run is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  const why = new Error("the site could not be read")
  mock.module("akasha/story/wandering-inn/syncing/syncing.module.code.ts", () => ({
    ...syncing,
    main: () => Promise.reject(why),
  }))
  await expect(running.runService()).rejects.toThrow("the site could not be read")
})
