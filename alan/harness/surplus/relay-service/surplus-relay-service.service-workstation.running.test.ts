import { expect, mock, test } from "bun:test"
import type { Carry } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const POINT = "readout/upkeep-surplus"

const SITES = ["https://alanwalton.com", "https://smilingjenny.me"]

let handed: readonly Carry[] | null = null

const carrying = await import(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      handed = handed === null ? carries : [...handed, ...carries]
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/surplus/relay-service/surplus-relay-service.service-workstation.running.code.ts"
)

const handedByOneRun = async (): Promise<readonly Carry[]> => {
  handed = null
  await running.runService()
  const after: readonly Carry[] | null = handed
  if (after === null) throw new Error("the run reached the shared carrying no times at all")
  return after
}

test("the run takes no argument, because the service runner hands it none", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is all this file offers, so the service has a single way in", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run names the surplus against both sites that show the surplus", async () => {
  expect(await handedByOneRun()).toEqual(SITES.map((site) => ({ point: POINT, to: site })))
})

test("the surplus is named under its own name rather than under a spelled path", async () => {
  const after = await handedByOneRun()
  expect(after.every((one) => one.point === POINT)).toBe(true)
})
