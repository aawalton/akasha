import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const notifying = await import(
  "akasha/alan/harness/surplus/fall-notifying/surplus-fall-notifying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/surplus/fall-notifying/surplus-fall-notifying.module.code.ts",
  () => ({
    ...notifying,
    runSurplusFallNotifying: () => {
      RAN.push("loop")
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/surplus-fall-notifier.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the notifying module's own loop rather than a loop written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["loop"])
})
