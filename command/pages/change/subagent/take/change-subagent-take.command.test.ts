import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { seatEditsAt } from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import {
  AGENT,
  applied,
  givenIn,
  repoWith,
  scratch,
} from "akasha/check/test/fixture/repo-seeding/repo-seeding.test-fixture.code.ts"
import { OK } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { baseOf as headOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { piping } from "akasha/command/modules/piping/piping.module.test-fixtures.ts"
import { changeSubagentTake } from "akasha/command/pages/change/subagent/take/change-subagent-take.command.code.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"

afterAll(scratch.sweep)

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change subagent take",
  from: "test",
  writer: null,
  agentId: null,
}

const ONE_AT = "akasha/one.ts"

const HAD = "committed\n"

const LEAVES = "landed\n"

const RECORD = {
  leftBy: "tester-abc",
  carriedAt: "2026-09-13T00:00:00.000Z",
  kind: "replace",
  path: ONE_AT,
  contentFrom: HAD,
  contentTo: LEAVES,
}

function seatKeeping(root: string, rows: readonly unknown[]): undefined {
  const page = agentPathOf(root, AGENT) ?? ""
  put(root, seatEditsAt(page) ?? "", rows.map((one) => `${JSON.stringify(one)}\n`).join(""))
  return undefined
}

test("a word on the command line is refused and the piping is named", () => {
  const said = changeSubagentTake(["one"], OUTSIDE, piping(""))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`one` is no argument")
  expect(said.refusals[said.refusals.length - 1]).toContain("piped in")
})

test("a take by an agent with no page is refused rather than answered with nothing", () => {
  const said = changeSubagentTake([], OUTSIDE, piping(""))
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page")
})

test("a take piping nothing in is refused rather than reaching every record", () => {
  const root = repoWith()
  seatKeeping(root, [RECORD])

  const said = changeSubagentTake([], givenIn(root), piping(""))
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("piped nothing in")
})

test("`unlanded` said with another value is refused", () => {
  const root = repoWith()
  seatKeeping(root, [RECORD])

  const said = changeSubagentTake([], givenIn(root), piping(`at: ${ONE_AT}\nunlanded: maybe\n`))
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("`unlanded` takes `true`")
})

test("a record a seat keeps is taken into this agent's edits and lands", async () => {
  const root = repoWith()
  seatKeeping(root, [RECORD])
  const was = headOf(root)

  const said = changeSubagentTake([], givenIn(root), piping(`at: ${ONE_AT}\n`))
  expect(said.code).toBe(OK)
  expect(said.report[0]).toContain("tester-abc")

  const then = await applied(root, said, ["--message", "held"])
  expect(then.refusals).toEqual([])
  expect(then.code).toBe(OK)
  expect(readFileSync(join(root, ONE_AT), "utf8")).toBe(LEAVES)
  expect(headOf(root)).not.toBe(was)
})

test("a record the body already holds the new text of is held back rather than landed again", () => {
  const root = repoWith({ [ONE_AT]: LEAVES })
  seatKeeping(root, [RECORD])

  const said = changeSubagentTake([], givenIn(root), piping(`at: ${ONE_AT}\n`))
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("landed already")
})
