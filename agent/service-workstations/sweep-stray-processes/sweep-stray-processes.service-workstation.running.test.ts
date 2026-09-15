import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const sweeping = await import("akasha/agent/modules/stray-sweeping/stray-sweeping.module.code.ts")

mock.module("akasha/agent/modules/stray-sweeping/stray-sweeping.module.code.ts", () => ({
  ...sweeping,
  sweepStrayProcesses: () => {
    RAN.push("tick")
    return Promise.resolve()
  },
}))

const running = await import(
  "akasha/agent/service-workstations/sweep-stray-processes/sweep-stray-processes.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the sweeping module's own tick rather than a tick written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["tick"])
})

test("a tick that ended badly is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  const why = new Error("the process table could not be read")
  mock.module("akasha/agent/modules/stray-sweeping/stray-sweeping.module.code.ts", () => ({
    ...sweeping,
    sweepStrayProcesses: () => Promise.reject(why),
  }))
  await expect(running.runService()).rejects.toThrow("the process table could not be read")
})
