import { expect, mock, test } from "bun:test"

const HANDED: (readonly string[])[] = []
let CODE = 0

const reading = await import(
  "akasha/agents/claude-accounts/modules/account-upkeep-stall-reading/account-upkeep-stall-reading.module.code.ts"
)

mock.module(
  "akasha/agents/claude-accounts/modules/account-upkeep-stall-reading/account-upkeep-stall-reading.module.code.ts",
  () => ({
    ...reading,
    readAccountUpkeepStall: (argv: readonly string[]) => {
      HANDED.push(argv)
      return Promise.resolve(CODE)
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/claude-account-upkeep-stall.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the reading module's own ruling rather than a ruling written again here", async () => {
  HANDED.length = 0
  CODE = 0
  await running.runService()
  expect(HANDED).toEqual([["--notify"]])
})

test("the ruling is asked to notify, which is what the unit's command line asks", async () => {
  HANDED.length = 0
  CODE = 0
  await running.runService()
  expect(HANDED[0]).toContain("--notify")
})
