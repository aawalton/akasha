import { expect, mock, test } from "bun:test"

const HANDED: unknown[][] = []
let FAILING: Error | null = null

const watching = await import(
  "akasha/alan/harness/email-watch/inbox-watching/inbox-watching.module.code.ts"
)

mock.module("akasha/alan/harness/email-watch/inbox-watching/inbox-watching.module.code.ts", () => ({
  ...watching,
  runInboxWatching: (...argv: unknown[]) => {
    HANDED.push(argv)
    return FAILING === null ? Promise.resolve() : Promise.reject(FAILING)
  },
}))

const running = await import(
  "akasha/infrastructure/services/workstations/pages/alan-email-worker.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the watching module's own watch rather than a watch written again here", async () => {
  HANDED.length = 0
  FAILING = null
  await running.runService()
  expect(HANDED).toEqual([[]])
})

test("the watch is handed no arguments, which is what the unit's command line hands it", async () => {
  HANDED.length = 0
  FAILING = null
  await running.runService()
  expect(HANDED[0]).toEqual([])
})

test("a watch that fell over is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  HANDED.length = 0
  FAILING = new Error("the mailbox could not be opened")
  await expect(running.runService()).rejects.toThrow("the mailbox could not be opened")
})
