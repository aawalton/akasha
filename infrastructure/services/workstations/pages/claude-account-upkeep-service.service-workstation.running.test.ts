import { expect, mock, test } from "bun:test"

const RAN: string[] = []
let FAILING: Error | null = null

const upkeep = await import(
  "akasha/agents/claude-accounts/modules/account-upkeep-running/account-upkeep-running.module.code.ts"
)

mock.module(
  "akasha/agents/claude-accounts/modules/account-upkeep-running/account-upkeep-running.module.code.ts",
  () => ({
    ...upkeep,
    runAccountUpkeepRunning: () => {
      RAN.push("upkeep")
      return FAILING === null ? Promise.resolve() : Promise.reject(FAILING)
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/claude-account-upkeep-service.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the upkeep module's own loop rather than a loop written again here", async () => {
  RAN.length = 0
  FAILING = null
  await running.runService()
  expect(RAN).toEqual(["upkeep"])
})

test("a loop that could not run is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  RAN.length = 0
  FAILING = new Error("the claude-account upkeep loop could not run")
  await expect(running.runService()).rejects.toThrow("the claude-account upkeep loop could not run")
})
