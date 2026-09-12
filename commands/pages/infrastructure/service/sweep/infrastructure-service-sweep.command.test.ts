import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Sweeping } from "akasha/commands/pages/infrastructure/service/sweep/infrastructure-service-sweep.command.code.ts"
import {
  infrastructureServiceSweep,
  sweptBy,
  sweptEach,
} from "akasha/commands/pages/infrastructure/service/sweep/infrastructure-service-sweep.command.code.ts"

const HOME = "/nowhere"

const REMOVE = ["one.service", "two.service"]

const PLANNED = ["remove\tone.service", "remove\ttwo.service"]

function sweeping(upTo: number): Sweeping {
  return (_home, plan, did) => {
    for (const name of plan.remove) {
      if (did.length >= upTo) throw new OperationalError(`systemd would not stop ${name}`)
      did.push(`removed ${name}`)
    }
    return { did, refused: [] }
  }
}

const HERE: Given = {
  root: process.cwd(),
  calledAs: "akasha infrastructure service sweep",
  from: process.cwd(),
  writer: null,
  agentId: null,
}

test("naming a service is refused as the caller's fault", async () => {
  const answer = await infrastructureServiceSweep(["pages-service"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("every unit akasha owns")
})

test("a flag this does not take is refused by name", async () => {
  const answer = await infrastructureServiceSweep(["--apply"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--apply`")
})

test("a dry run asks systemd nothing and plans no unit written or enabled", async () => {
  const answer = await infrastructureServiceSweep(["--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  for (const line of answer.report) expect(line).not.toContain("write\t")
  for (const line of answer.report) expect(line).not.toContain("enable\t")
})

test("of each unit it says only that it is to be removed or that it is stranded", async () => {
  const answer = await infrastructureServiceSweep(["--dry-run"], HERE)
  expect(answer.code).toBe(0)
  const said = ["nothing\t", "remove\t", "stranded\t", "dry-run\t"]
  for (const line of answer.report) expect(said.some((one) => line.startsWith(one))).toBe(true)
})

test("each unit is named as soon as systemd has taken that unit away", () => {
  const done: string[] = []

  const answer = sweptEach(HOME, PLANNED, REMOVE, [], sweeping(2), done)
  expect(done).toEqual(["removed one.service", "removed two.service"])
  expect(answer.report).toEqual([
    ...PLANNED,
    "did\tremoved one.service",
    "did\tremoved two.service",
  ])
})

test("a sweep that threw part way names in its refusal each unit it had taken away", async () => {
  const held = await sweptBy(HOME, PLANNED, REMOVE, [], sweeping(1))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual(["removed one.service"])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("one.service")
  expect(last).not.toContain("removed two.service")
})

test("a sweep that threw before a unit was taken away names none", async () => {
  const held = await sweptBy(HOME, PLANNED, REMOVE, [], sweeping(0))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

const halfRefusing: Sweeping = (_home, plan, did) => {
  const first = plan.remove[0]
  if (first !== undefined) did.push(`removed ${first}`)
  return { did, refused: ["stopped two.service: systemd would not"] }
}

test("a sweep that refused part way names in its refusal each unit it had taken away", async () => {
  const held = await sweptBy(HOME, PLANNED, REMOVE, [], halfRefusing)

  expect(held.code).toBe(OPERATIONAL)
  expect(held.refusals[0]).toContain("systemd would not")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("removed one.service")
})

test("what the report already says is not said a second time by naming it", async () => {
  const held = await sweptBy(HOME, PLANNED, REMOVE, [], halfRefusing)

  expect(held.report).toEqual([...PLANNED, "did\tremoved one.service"])
})

test("a sweep that refused before a unit was taken away names none", async () => {
  const held = await sweptBy(HOME, PLANNED, REMOVE, [], (_home, _plan, did) => ({
    did,
    refused: ["stopped one.service: systemd would not"],
  }))

  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
