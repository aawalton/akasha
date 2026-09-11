import { expect, mock, test } from "bun:test"

const HANDED: (readonly string[])[] = []
let CODE = 0

const sweeping = await import(
  "akasha/seat-system/supervising/supervisor-log-sweeping/supervisor-log-sweeping.module.code.ts"
)

mock.module(
  "akasha/seat-system/supervising/supervisor-log-sweeping/supervisor-log-sweeping.module.code.ts",
  () => ({
    ...sweeping,
    sweepSupervisorLogs: (argv: readonly string[]) => {
      HANDED.push(argv)
      return CODE
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/sweep-supervisor-logs.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the sweeping module's own sweep rather than a sweep written again here", () => {
  HANDED.length = 0
  CODE = 0
  running.runService()
  expect(HANDED).toEqual([["--remove"]])
})

test("the sweep is asked to remove, which is what the unit's command line asks", () => {
  HANDED.length = 0
  CODE = 0
  running.runService()
  expect(HANDED[0]).toContain("--remove")
})
