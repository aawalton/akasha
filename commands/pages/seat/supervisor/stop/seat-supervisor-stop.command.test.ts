import { expect, test } from "bun:test"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Halting,
  seatSupervisorStop,
  stoppedBy,
} from "akasha/commands/pages/seat/supervisor/stop/seat-supervisor-stop.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha seat supervisor stop", from: root, writer: null, agentId: null }
}

test("a stop naming no seat is refused", async () => {
  const said = await seatSupervisorStop([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names the seat to stop")
})

test("a stop given a flag where the seat goes is refused rather than reading it as a name", async () => {
  const said = await seatSupervisorStop(["--force"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is a flag")
})

test("a stop carrying a flag it does not take is refused", async () => {
  const said = await seatSupervisorStop(["athena", "--wat"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--wat")
})

test("a name no seat holds a page for is a data refusal, apart from a word it does not take", async () => {
  const said = await seatSupervisorStop(["nobody-here"], given("/nowhere"))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("nobody-here")
})

const ENDED = "ended 4131, 4132"

const TOOK = "took the page the seat held"

function halting(wrote: readonly string[], thrown: Error): Halting {
  return async (_given, _agentId, _name, _force, done) => {
    for (const one of wrote) done.push(one)
    throw thrown
  }
}

test("a stop that threw after it wrote names each write in its refusal", async () => {
  const held = halting([ENDED, TOOK], new Error("the landing taking the page would not run"))

  const said = await stoppedBy(given("/nowhere"), "01a0", "athena", false, held)

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([ENDED, TOOK])
  expect(refused).toContain("stopped part way")
  expect(refused).toContain(ENDED)
  expect(refused).toContain(TOOK)
})

test("a stop that threw before it wrote anything says nothing of what it wrote", async () => {
  const held = halting([], new Error("the seat page would not open"))

  const said = await stoppedBy(given("/nowhere"), "01a0", "athena", false, held)

  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
})

test("a stop that threw names each write in the order that stop finished them", async () => {
  const held = halting([ENDED, TOOK], new Error("the landing taking the page would not run"))

  const said = await stoppedBy(given("/nowhere"), "01a0", "athena", false, held)

  const refused = said.refusals.join(" ")
  expect(refused.indexOf(ENDED)).toBeLessThan(refused.indexOf(TOOK))
  expect(refused).toContain("thrown at")
})

test("a stop that threw carries the kind that throw names rather than one spelled here", async () => {
  const held = halting([ENDED], new InputError("the seat was named twice over"))

  const said = await stoppedBy(given("/nowhere"), "01a0", "athena", false, held)

  expect(said.code).toBe(1)
  expect(said.code).not.toBe(OPERATIONAL)
})

test("a stop refused rather than thrown still names each write it finished", async () => {
  const said = await stoppedBy(
    given("/nowhere"),
    "01a0",
    "athena",
    false,
    async (_given, _agentId, _name, _force, done) => {
      done.push(ENDED)
      return { refused: "the seat is up yet", code: OPERATIONAL }
    }
  )

  expect(said.report).toEqual([ENDED])
  expect(said.refusals[0]).toBe("the seat is up yet")
  expect(said.refusals.join(" ")).toContain("stopped part way")
})
