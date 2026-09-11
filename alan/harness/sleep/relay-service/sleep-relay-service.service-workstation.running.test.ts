import { expect, mock, test } from "bun:test"
import { sleepRelayService } from "akasha/alan/harness/sleep/relay-service/sleep-relay-service.service-workstation.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"

const SECRET = "a-sleep-relay-secret-held-only-by-this-test"

const TOOK_AT = "2026-09-11T20:00:53.714Z"

const HANDED: string[][] = []

const REACHED: string[] = []

const NAMED: string[] = []

const TURNED_AWAY: string[] = []

let nameless: string | null = null

const relay = await import("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts")

const composing = await import(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
)

const SITES = sleepRelayService.starts.map((one) => one.arguments[0])

const POINT = sleepRelayService.starts[0].pages[0]

const answered = composing.pathOf(checkoutAt(), POINT)

const SLEEP_PAGE = typeof answered === "string" ? answered : answered.refused

mock.module(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts",
  () => ({
    ...composing,
    pathOf: (_root: string, named: string) => {
      NAMED.push(named)
      if (named === nameless) return { refused: `${named} reaches no page of its own` }
      return SLEEP_PAGE
    },
  })
)

mock.module("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts", () => ({
  ...relay,
  carryReadingBeside: (root: string, page: string, to: string, secret: string) => {
    HANDED.push([root, page, to, secret])
    if (TURNED_AWAY.includes(to)) return Promise.reject(new Error(relay.noReadingBeside(page)))
    REACHED.push(to)
    return Promise.resolve(relay.readingCarried(TOOK_AT, to))
  },
}))

const running = await import(
  "akasha/alan/harness/sleep/relay-service/sleep-relay-service.service-workstation.running.code.ts"
)

const startedAfresh = async (): Promise<undefined> => {
  HANDED.length = 0
  REACHED.length = 0
  NAMED.length = 0
  process.env[relay.RELAY_SECRET_NAME] = SECRET
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

test("a run carries the sleep to every site the page names, in the order the page names them", async () => {
  await startedAfresh()
  expect(REACHED).toEqual(SITES)
})

test("the readout is asked for by the name the page states rather than by a path spelled here", async () => {
  await startedAfresh()
  expect(NAMED).toEqual([POINT])
  expect(SLEEP_PAGE).toBe(sleepRelayService.runs[0].split(" ")[2] ?? "")
  expect(HANDED.map((one) => one[1])).toEqual(SITES.map(() => SLEEP_PAGE))
})

test("a carry is handed the checkout the run reads under and the secret the environment states", async () => {
  await startedAfresh()
  expect(HANDED[0]?.[0]).toBe(checkoutAt())
  expect(HANDED[0]?.[3]).toBe(SECRET)
})

test("a carry failing to one site leaves the other site carried to, as each start is lenient", async () => {
  TURNED_AWAY.push(SITES[0] ?? "")
  await startedAfresh()
  TURNED_AWAY.length = 0
  expect(HANDED.map((one) => one[2])).toEqual(SITES)
  expect(REACHED).toEqual(SITES.slice(1))
})

test("a readout the index names no page for stops the run rather than carrying nothing quietly", async () => {
  nameless = POINT
  REACHED.length = 0
  process.env[relay.RELAY_SECRET_NAME] = SECRET
  await expect(running.runService()).rejects.toThrow(POINT)
  nameless = null
  expect(REACHED).toEqual([])
})

test("a run with no relay secret stated refuses rather than carrying nothing quietly", async () => {
  REACHED.length = 0
  delete process.env[relay.RELAY_SECRET_NAME]
  await expect(running.runService()).rejects.toThrow(relay.RELAY_SECRET_NAME)
  expect(REACHED).toEqual([])
})
