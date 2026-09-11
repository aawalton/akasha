import { expect, mock, test } from "bun:test"
import { costRelayService } from "akasha/alan/harness/cost/relay-service/cost-relay-service.service-workstation.ts"
import { pathOf } from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"

const SECRET = "a-relay-secret-existing-only-in-this-test"

const TAKEN = "2026-08-31T12:00:00.000Z"

const CARRIED: string[][] = []

const REFUSING: string[] = []

const relay = await import("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts")

mock.module("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts", () => ({
  ...relay,
  carryReadingBeside: (root: string, page: string, to: string, secret: string) => {
    CARRIED.push([root, page, to, secret])
    if (REFUSING.includes(to)) return Promise.reject(new Error(relay.noReadingBeside(page)))
    return Promise.resolve(relay.readingCarried(TAKEN, to))
  },
}))

process.env[relay.RELAY_SECRET_NAME] = SECRET

const running = await import(
  "akasha/alan/harness/cost/relay-service/cost-relay-service.service-workstation.running.code.ts"
)

const SHOWN_ON = costRelayService.starts.map((one) => one.arguments[0])

const asked = pathOf(checkoutAt(), costRelayService.starts[0].pages[0])

const PAGE = typeof asked === "string" ? asked : asked.refused

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run carries to every site the page names, in the order the page names them", async () => {
  CARRIED.length = 0
  await running.runService()
  expect(CARRIED.map((one) => one[2])).toEqual(SHOWN_ON)
})

test("the readout carried is the page the index answers for rather than a path spelled here", async () => {
  CARRIED.length = 0
  await running.runService()
  expect(PAGE).toBe(costRelayService.runs[0].split(" ")[2] ?? "")
  expect(CARRIED.map((one) => one[1])).toEqual(SHOWN_ON.map(() => PAGE))
})

test("a carry is handed the checkout it reads and the secret the environment names", async () => {
  CARRIED.length = 0
  await running.runService()
  expect(CARRIED[0]?.[0]).toBe(checkoutAt())
  expect(CARRIED[0]?.[3]).toBe(SECRET)
})

test("a site refusing its carry leaves the other site carried to, as each start is lenient", async () => {
  CARRIED.length = 0
  REFUSING.length = 0
  REFUSING.push(SHOWN_ON[0] ?? "")
  await running.runService()
  REFUSING.length = 0
  expect(CARRIED.map((one) => one[2])).toEqual(SHOWN_ON)
})
