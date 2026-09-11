import { expect, mock, test } from "bun:test"
import type { Carry } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const POINT = "readout/upkeep-safety"

const ALANS_SITE = "https://alanwalton.com"

const JENNYS_SITE = "https://smilingjenny.me"

const seen = {
  points: [] as string[],
  sites: [] as string[],
  rounds: 0,
}

const carrying = await import(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      seen.rounds += 1
      for (const one of carries) {
        seen.points.push(one.point)
        seen.sites.push(one.to)
      }
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/safety/relay-service/safety-relay-service.service-workstation.running.code.ts"
)

const seenAfterOneRun = async (): Promise<typeof seen> => {
  seen.points.length = 0
  seen.sites.length = 0
  seen.rounds = 0
  await running.runService()
  return seen
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is all this file hands out, so the service has one way in", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run names the safety level against both sites showing it", async () => {
  const after = await seenAfterOneRun()
  expect(after.sites).toEqual([ALANS_SITE, JENNYS_SITE])
  expect(after.points).toEqual([POINT, POINT])
})

test("both pairs go over together, so the shared carrying is reached once", async () => {
  const after = await seenAfterOneRun()
  expect(after.rounds).toBe(1)
})
