import { expect, mock, test } from "bun:test"
import type { Carry } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const SHOWN_AT = "https://alanwalton.com"

const POINTS = [
  "readout/attribute-strength",
  "readout/attribute-endurance",
  "readout/attribute-constitution",
  "readout/attribute-wisdom",
  "readout/attribute-intelligence",
  "readout/attribute-charisma",
]

const HANDED: Carry[] = []

const REACHED: number[] = []

const carrying = await import(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      REACHED.push(carries.length)
      HANDED.push(...carries)
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/attributes/relay-service/attributes-relay-service.service-workstation.running.code.ts"
)

const ranAfresh = async (): Promise<undefined> => {
  HANDED.length = 0
  REACHED.length = 0
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

test("a run names all six attribute points, each against the site that shows them", async () => {
  await ranAfresh()
  expect(HANDED).toEqual(POINTS.map((point) => ({ point, to: SHOWN_AT })))
})

test("a run hands every pair to the shared carrying at once rather than one at a time", async () => {
  await ranAfresh()
  expect(REACHED).toEqual([POINTS.length])
})
