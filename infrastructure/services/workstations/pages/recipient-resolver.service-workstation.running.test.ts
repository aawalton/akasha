import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const resolving = await import(
  "akasha/seat-system/recipient-resolving/recipient-resolver-running/recipient-resolver-running.module.code.ts"
)

mock.module(
  "akasha/seat-system/recipient-resolving/recipient-resolver-running/recipient-resolver-running.module.code.ts",
  () => ({
    ...resolving,
    runRecipientResolverRunning: () => {
      RAN.push("loop")
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/recipient-resolver.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the resolver module's own loop rather than a loop written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["loop"])
})

test("a loop that ended badly is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  RAN.length = 0
  const why = new Error("the tick loop could not assemble its specs")
  mock.module(
    "akasha/seat-system/recipient-resolving/recipient-resolver-running/recipient-resolver-running.module.code.ts",
    () => ({
      ...resolving,
      runRecipientResolverRunning: () => Promise.reject(why),
    })
  )
  await expect(running.runService()).rejects.toThrow("the tick loop could not assemble its specs")
})
