import { beforeEach, expect, mock, test } from "bun:test"
import type { Carry } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const CAPACITY = "readout/upkeep-capacity"

const ALAN = "https://alanwalton.com"

const JENNY = "https://smilingjenny.me"

const SPOKEN: string[] = []

let rounds = 0

const carrying = await import(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      rounds += 1
      SPOKEN.push(...carries.map((one) => `${one.point} to ${one.to}`))
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/capacity/relay-service/capacity-relay-service.service-workstation.running.code.ts"
)

beforeEach(() => {
  SPOKEN.length = 0
  rounds = 0
})

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run names the capacity against both sites that show it", async () => {
  await running.runService()
  expect(SPOKEN).toEqual([`${CAPACITY} to ${ALAN}`, `${CAPACITY} to ${JENNY}`])
})

test("a run hands both pairs over in one reach of the shared carrying", async () => {
  await running.runService()
  expect(rounds).toBe(1)
})
