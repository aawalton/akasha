import { expect, mock, test } from "bun:test"

const HANDED: unknown[][] = []
let CODE = 0

const sending = await import(
  "akasha/alan/harness/reminder-system/due-reminder-sending/due-reminder-sending.module.code.ts"
)

mock.module(
  "akasha/alan/harness/reminder-system/due-reminder-sending/due-reminder-sending.module.code.ts",
  () => ({
    ...sending,
    sendDueReminders: (...args: unknown[]) => {
      HANDED.push(args)
      return Promise.resolve(CODE)
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/send-due-reminders.service-workstation.running.code.ts"
)

test("the run is a function the service runner can call with nothing handed", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the sending module's own send rather than a send written again here", async () => {
  HANDED.length = 0
  CODE = 0
  await running.runService()
  expect(HANDED.length).toBe(1)
})

test("the send is handed the list the run was handed, so what it did reaches the caller", async () => {
  HANDED.length = 0
  CODE = 0
  const done: string[] = []
  await running.runService(done)
  expect(HANDED).toEqual([[done]])
})

test("a run handed no list hands the send a list of its own rather than nothing", async () => {
  HANDED.length = 0
  CODE = 0
  await running.runService()
  expect(HANDED).toEqual([[[]]])
})

test("a send holding a reminder back throws rather than ending the process where nothing reads it", async () => {
  HANDED.length = 0
  CODE = 1
  await expect(running.runService()).rejects.toThrow("held back")
})
