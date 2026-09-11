import { beforeEach, expect, mock, test } from "bun:test"

const SECRET = "a-relay-secret-existing-only-in-this-test"

const CAPACITY = "readout/upkeep-capacity"

const ALAN = "https://alanwalton.com"

const JENNY = "https://smilingjenny.me"

const ANSWERED = "a-page-only-this-test-names"

const ASKED: string[] = []

const CARRIED: string[] = []

let unnamed: string | null = null

let refused: string | null = null

const relay = await import("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts")

const composing = await import(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
)

mock.module(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts",
  () => ({
    ...composing,
    pathOf: (_root: string, named: string) => {
      ASKED.push(named)
      if (named === unnamed) return { refused: `${named} names no page` }
      return ANSWERED
    },
  })
)

mock.module("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts", () => ({
  ...relay,
  carryReadingBeside: (_root: string, _page: string, to: string) => {
    if (to === refused) return Promise.reject(new Error(`${to} answered 500`))
    CARRIED.push(to)
    return Promise.resolve(`a reading taken now carried to ${to}`)
  },
}))

const running = await import(
  "akasha/alan/harness/capacity/relay-service/capacity-relay-service.service-workstation.running.code.ts"
)

beforeEach(() => {
  ASKED.length = 0
  CARRIED.length = 0
  unnamed = null
  refused = null
  process.env[relay.RELAY_SECRET_NAME] = SECRET
})

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run carries the capacity reading to both sites that show it", async () => {
  await running.runService()
  expect(CARRIED).toEqual([ALAN, JENNY])
})

test("the readout is reached by its own name rather than by a path", async () => {
  await running.runService()
  expect(ASKED).toEqual([CAPACITY])
})

test("a carry that fails to one site does not stop the carry to another site", async () => {
  refused = ALAN
  await running.runService()
  expect(CARRIED).toEqual([JENNY])
})

test("a readout the index names no page for refuses rather than carrying nothing quietly", async () => {
  unnamed = CAPACITY
  await expect(running.runService()).rejects.toThrow("names no page")
  expect(CARRIED).toEqual([])
})

test("a run with no relay secret stated refuses before any site is reached", async () => {
  delete process.env[relay.RELAY_SECRET_NAME]
  await expect(running.runService()).rejects.toThrow(relay.RELAY_SECRET_NAME)
  expect(ASKED).toEqual([])
  expect(CARRIED).toEqual([])
})
