import { expect, mock, test } from "bun:test"

const HANDED: (readonly string[])[] = []

const sweeping = await import("akasha/page/modules/record-sweeping/record-sweeping.module.code.ts")

mock.module("akasha/page/modules/record-sweeping/record-sweeping.module.code.ts", () => ({
  ...sweeping,
  sweepRecords: (argv: readonly string[]) => {
    HANDED.push(argv)
    return 0
  },
}))

const running = await import(
  "akasha/page/service-workstations/sweep-cost-records/sweep-cost-records.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the sweeping module's own sweep rather than a sweep written again here", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED).toEqual([["--remove"]])
})

test("the sweep is asked to remove, which is what a sweep needs to take a line away", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED[0]).toContain("--remove")
})
