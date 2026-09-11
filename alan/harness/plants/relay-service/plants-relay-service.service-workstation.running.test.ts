import { expect, mock, test } from "bun:test"
import type { Carry } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const POINT = "readout/upkeep-plants"

const SHOWN_AT = ["https://alanwalton.com", "https://smilingjenny.me"]

const BY_POINT = new Map<string, string[]>()

const carrying = await import(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      for (const one of carries) {
        const sites = BY_POINT.get(one.point) ?? []
        sites.push(one.to)
        BY_POINT.set(one.point, sites)
      }
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/plants/relay-service/plants-relay-service.service-workstation.running.code.ts"
)

const groupedByOneRun = async (): Promise<Map<string, string[]>> => {
  BY_POINT.clear()
  await running.runService()
  return BY_POINT
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run names the plant grams against both sites that show them", async () => {
  const grouped = await groupedByOneRun()
  expect(grouped.get(POINT)).toEqual(SHOWN_AT)
})

test("the grams are the single point this service names, however many sites show them", async () => {
  const grouped = await groupedByOneRun()
  expect([...grouped.keys()]).toEqual([POINT])
})
