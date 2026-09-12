import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type {
  Asking,
  Outcome,
  Seams,
} from "akasha/commands/pages/model/gateway/swap/model-gateway-swap.command.code.ts"
import {
  askedEach,
  askedSaid,
  FLEET,
  JSON_OUT,
  modelGatewaySwap,
  readIn,
} from "akasha/commands/pages/model/gateway/swap/model-gateway-swap.command.code.ts"
import type { SeatMatch } from "akasha/seat-system/seat-handle/seat-handle.module.code.ts"

const SEATS = ["awen", "athena"]

function asking(upTo: number): Asking {
  let reached = 0
  return async (agentId, done): Promise<Outcome> => {
    reached += 1
    if (reached > upTo) throw new OperationalError(`${agentId} would not take the ask`)
    done.push(askedSaid(agentId))
    return "swapped"
  }
}

function swapRefused(argv: readonly string[]): string {
  const said = readIn(argv)
  if (!("refused" in said)) return ""
  return said.refused.join(" ")
}

test("a swap naming neither a seat nor the fleet is refused", () => {
  expect(swapRefused([])).toContain(FLEET)
})

test("a swap naming a seat and the fleet together is refused", () => {
  expect(swapRefused(["awen", FLEET])).toContain("names one")
})

test("a swap naming two seats is refused", () => {
  expect(swapRefused(["awen", "athena"])).toContain("one swap names one seat")
})

test("a flag a swap does not take is refused by name", () => {
  expect(swapRefused(["awen", "--paths"])).toContain("--paths")
})

test("a seat named alone is read as the seat said", () => {
  const said = readIn(["awen"])
  expect("refused" in said ? null : said.target).toBe("awen")
})

test("the fleet flag and the json flag are read together", () => {
  const said = readIn([FLEET, JSON_OUT])
  expect("refused" in said ? false : said.on.has(JSON_OUT)).toBe(true)
})

test("each seat is named as soon as that seat holds the ask", async () => {
  const done: string[] = []

  await askedEach(SEATS, asking(2), [], done)
  expect(done).toEqual([askedSaid("awen"), askedSaid("athena")])
})

test("a seat that would not answer is reported rather than stopping the fleet", async () => {
  const report: string[] = []
  const done: string[] = []

  const held = await askedEach(SEATS, asking(1), report, done)
  expect(held.map((one) => one.status)).toEqual(["swapped", "timeout"])
  expect(report[0]).toContain("athena would not answer")
})

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha model gateway swap",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

function seamsWith(one: Asking, found: SeatMatch, ids: readonly string[]): Seams {
  return { asking: one, found: () => found, liveIds: () => ids }
}

const timingOut: Asking = async (agentId, done): Promise<Outcome> => {
  done.push(askedSaid(agentId))
  return await Promise.resolve("timeout")
}

const throwing: Asking = async (agentId, done): Promise<Outcome> => {
  done.push(askedSaid(agentId))
  throw new OperationalError(`${agentId} would not answer`)
}

const refusingEvery: Asking = (): Promise<Outcome> =>
  Promise.reject(new OperationalError("the seat would not be reached"))

test("a seat that did not take the ask up is refused with the ask it holds named", async () => {
  const held = await modelGatewaySwap(["awen"], GIVEN, seamsWith(timingOut, { id: "awen" }, []))

  expect(held.code).toBe(OPERATIONAL)
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(askedSaid("awen"))
})

test("a swap that threw after the ask was written names that ask in its refusal", async () => {
  const held = await modelGatewaySwap(["awen"], GIVEN, seamsWith(throwing, { id: "awen" }, []))

  expect(held.code).toBe(OPERATIONAL)
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("stopped part way")
  expect(last).toContain(askedSaid("awen"))
})

test("a swap that threw before a seat held the ask names none", async () => {
  const held = await modelGatewaySwap(["awen"], GIVEN, seamsWith(refusingEvery, { id: "awen" }, []))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a fleet swap said as json keeps that json the whole of what it reports", async () => {
  const held = await modelGatewaySwap(
    [FLEET, JSON_OUT],
    GIVEN,
    seamsWith(timingOut, { error: "no seat" }, ["awen"])
  )

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toHaveLength(1)
  expect(JSON.parse(held.report[0] as string)).toMatchObject({ ok: false })
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(askedSaid("awen"))
})
