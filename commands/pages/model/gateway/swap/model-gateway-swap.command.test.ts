import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type {
  Asking,
  Outcome,
} from "akasha/commands/pages/model/gateway/swap/model-gateway-swap.command.code.ts"
import {
  askedEach,
  askedSaid,
  FLEET,
  JSON_OUT,
  readIn,
} from "akasha/commands/pages/model/gateway/swap/model-gateway-swap.command.code.ts"

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

test("a swap that threw part way names in its refusal each seat holding the ask", async () => {
  const held = await answering(async (done) => {
    for (const agentId of SEATS) done.push(askedSaid(agentId))
    throw new OperationalError("the roster would not read")
  })

  expect(held.code).toBe(OPERATIONAL)
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("awen")
  expect(last).toContain("athena")
})

test("a swap that threw before a seat held the ask names none", async () => {
  const held = await answering(async (done) => {
    await askedEach(SEATS, asking(0), [], done)
    return told(done)
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
