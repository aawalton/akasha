import { expect, mock, test } from "bun:test"
import { costRelayService } from "akasha/alan/harness/cost/relay-service/cost-relay-service.service-workstation.ts"
import type { Carry } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const SHOWN_ON = costRelayService.starts.map((one) => one.arguments[0])

const MULTIPLIER = costRelayService.starts[0].pages[0]

const TRAIL: string[] = []

const POINTS_SEEN = new Set<string>()

const carrying = await import(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      for (const one of carries) {
        TRAIL.push(one.to)
        POINTS_SEEN.add(one.point)
      }
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/cost/relay-service/cost-relay-service.service-workstation.running.code.ts"
)

const afterOneRun = async (): Promise<undefined> => {
  TRAIL.length = 0
  POINTS_SEEN.clear()
  await running.runService()
  return undefined
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run names every site the page names, in the order the page names them", async () => {
  await afterOneRun()
  expect(TRAIL).toEqual(SHOWN_ON)
})

test("the point named is the multiplier the page states rather than a path spelled here", async () => {
  await afterOneRun()
  expect([...POINTS_SEEN]).toEqual([MULTIPLIER])
})
