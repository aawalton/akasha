import { expect, mock, test } from "bun:test"
import type { Carry } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
import { sleepRelayService } from "akasha/alan/harness/sleep/relay-service/sleep-relay-service.service-workstation.ts"

const TUPLES: [string, string][] = []

const SITES = sleepRelayService.starts.map((one) => one.arguments[0])

const POINT = sleepRelayService.starts[0].pages[0]

const carrying = await import(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      TUPLES.push(...carries.map((one): [string, string] => [one.point, one.to]))
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/sleep/relay-service/sleep-relay-service.service-workstation.running.code.ts"
)

const tuplesOfOneRun = async (): Promise<[string, string][]> => {
  TUPLES.length = 0
  await running.runService()
  return TUPLES
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run names the sleep against every site the page states, in the page's order", async () => {
  const tuples = await tuplesOfOneRun()
  expect(tuples).toEqual(SITES.map((site): [string, string] => [POINT, site]))
})

test("the point named is the one the page states rather than a path spelled here", async () => {
  const tuples = await tuplesOfOneRun()
  expect([...new Set(tuples.map((one) => one[0]))]).toEqual([POINT])
})
