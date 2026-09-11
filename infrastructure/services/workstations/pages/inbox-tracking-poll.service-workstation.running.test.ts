import { expect, mock, test } from "bun:test"

const HANDED: (readonly string[])[] = []
let FAILING: Error | null = null

const polling = await import(
  "akasha/alan/harness/inboxes/tracking-polling/inbox-tracking-polling.module.code.ts"
)

mock.module(
  "akasha/alan/harness/inboxes/tracking-polling/inbox-tracking-polling.module.code.ts",
  () => ({
    ...polling,
    runInboxTrackingPolling: (argv: readonly string[]) => {
      HANDED.push(argv)
      return FAILING === null ? Promise.resolve() : Promise.reject(FAILING)
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/inbox-tracking-poll.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the polling module's own poll rather than a poll written again here", async () => {
  HANDED.length = 0
  FAILING = null
  await running.runService()
  expect(HANDED).toEqual([[]])
})

test("the poll is handed no arguments, which is what the unit's command line hands it", async () => {
  HANDED.length = 0
  FAILING = null
  await running.runService()
  expect(HANDED[0]).toEqual([])
})

test("a tick that could not persist is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  HANDED.length = 0
  FAILING = new Error("the inbox-tracking tick failed to persist")
  await expect(running.runService()).rejects.toThrow("the inbox-tracking tick failed to persist")
})
