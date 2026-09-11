import { expect, mock, test } from "bun:test"
import { inboxRelayService } from "akasha/alan/harness/inboxes/relay-service/inbox-relay-service.service-workstation.ts"
import { pathOf } from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"

const SECRET = "a-relay-secret-existing-only-in-this-test"
const TAKEN = "2026-09-11T12:00:00.000Z"
const LENIENT = "-"
const GAP = " "
const PAST_RUNNER_AND_FILE = 2
const RELAY = "module/readout-relay"

const HANDED: (readonly string[])[] = []
let STATED: string | null = SECRET
let FAILING: Error | null = null

const relay = await import("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts")

mock.module("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts", () => ({
  ...relay,
  statedIn: () => STATED,
  carryReadingBeside: (under: string, page: string, to: string, secret: string) => {
    HANDED.push([under, page, to, secret])
    return FAILING === null
      ? Promise.resolve(relay.readingCarried(TAKEN, to))
      : Promise.reject(FAILING)
  },
}))

const running = await import(
  "akasha/alan/harness/inboxes/relay-service/inbox-relay-service.service-workstation.running.code.ts"
)

const root = checkoutAt()

function askedFor(named: string): string {
  const at = pathOf(root, named)
  if (typeof at !== "string") throw new Error(at.refused)
  return at
}

function carriedIn(line: string): readonly string[] {
  const said = line.startsWith(LENIENT) ? line.slice(LENIENT.length) : line
  const words = said.split(GAP).slice(PAST_RUNNER_AND_FILE)
  return [root, words[0] ?? "", words[1] ?? "", SECRET]
}

function ready(): undefined {
  HANDED.length = 0
  STATED = SECRET
  FAILING = null
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the relay module's own carry rather than a carry written again here", async () => {
  ready()
  await running.runService()
  expect(HANDED).toEqual(inboxRelayService.runs.map(carriedIn))
})

test("the page each carry names is the path the index answers for, rather than one spelled here", async () => {
  ready()
  await running.runService()
  const asked: string[] = inboxRelayService.starts.map((one) => askedFor(one.pages[0]))
  expect(HANDED.map((one) => one[1])).toEqual(asked)
})

test("every start the page states names the relay module this file runs, so the two cannot part", () => {
  expect([...new Set(inboxRelayService.starts.map((one) => one.code))]).toEqual([RELAY])
})

test("a carry that is refused leaves the carries after it to go on, which is what a lenient start says", async () => {
  ready()
  FAILING = new Error("the site answered 401 for the reading of 'inboxes-email'")
  await running.runService()
  expect(HANDED.length).toBe(inboxRelayService.runs.length)
})

test("a run with no relay secret refuses rather than carrying nothing quietly", async () => {
  ready()
  STATED = null
  await expect(running.runService()).rejects.toThrow(relay.NO_SECRET_TO_CARRY_ON)
  expect(HANDED).toEqual([])
})
