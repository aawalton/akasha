import { expect, mock, test } from "bun:test"
import { sleepRelayService } from "akasha/alan/harness/sleep/relay-service/sleep-relay-service.service-workstation.ts"
import { serviceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const SERVED: string[] = []

const carrying = await import(
  "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryReadingsServedBy: (servedBy: string) => {
      SERVED.push(servedBy)
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/sleep/relay-service/sleep-relay-service.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run carries, once, the readouts whose pages name this service", async () => {
  SERVED.length = 0
  await running.runService()
  expect(SERVED).toEqual([namedAs(serviceWorkstation.slug, sleepRelayService.slug, null)])
})
