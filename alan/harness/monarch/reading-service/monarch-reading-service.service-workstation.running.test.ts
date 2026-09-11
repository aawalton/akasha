import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const reading = await import("akasha/alan/harness/monarch/reading/monarch-reading.module.code.ts")

mock.module("akasha/alan/harness/monarch/reading/monarch-reading.module.code.ts", () => ({
  ...reading,
  runMonarchReading: () => {
    RAN.push("read")
    return Promise.resolve()
  },
}))

const running = await import(
  "akasha/alan/harness/monarch/reading-service/monarch-reading-service.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the reading module's own taking rather than a taking written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["read"])
})

test("a cookie that is not set is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  RAN.length = 0
  mock.module("akasha/alan/harness/monarch/reading/monarch-reading.module.code.ts", () => ({
    ...reading,
    runMonarchReading: () => Promise.reject(new Error(reading.COOKIE_ABSENT)),
  }))
  await expect(running.runService()).rejects.toThrow(reading.COOKIE_ABSENT)
  expect(RAN).toEqual([])
})
