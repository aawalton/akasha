import { expect, test } from "bun:test"
import type { Gathered, Phase } from "akasha/checks/modules/checking/checking.module.code.ts"
import { ROOT } from "akasha/commands/modules/audit-answering/audit-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  audit,
  leftOutOf,
  narrowedTo,
  notAnAuditIn,
  notYetJudgingIn,
  wrongIn,
} from "akasha/commands/pages/audit/audit.command.code.ts"

function gathered(slugs: readonly string[], runsOn: readonly Phase[]): readonly Gathered[] {
  return slugs.map(
    (slug): Gathered => ({
      slug,
      page: `${slug}.code-check.ts`,
      root: ".",
      runsOn,
      isInput: null,
      run: () => [],
    })
  )
}

function given(): Given {
  return { root: ROOT, calledAs: "akasha audit", from: ROOT, writer: null, agentId: null }
}

test("a run over every check that runs at audit says nothing about being narrowed", () => {
  expect(notAnAuditIn(0)).toEqual([])
})

test("a run narrowed to named checks says how many checks it left out", () => {
  expect(notAnAuditIn(23)).toEqual([
    "this is not an audit — the 23 checks it left out judged nothing",
  ])
})

test("a bare run says how many checks it left out for not yet judging", () => {
  const every = [...gathered(["one"], ["audit"]), ...gathered(["two", "three"], [])]
  expect(notYetJudgingIn(every, [])).toEqual(["this answer leaves out 2 checks not yet judging"])
})

test("a run where every check judges says nothing about checks left out that way", () => {
  expect(notYetJudgingIn(gathered(["one"], ["audit"]), [])).toEqual([])
})

test("a run naming a check says nothing about the checks not yet judging", () => {
  expect(notYetJudgingIn(gathered(["one"], []), ["one"])).toEqual([])
})

test("naming no check runs every check that runs at audit", () => {
  const atAudit = gathered(["one"], ["audit"])
  const every = [...atAudit, ...gathered(["two"], ["change"])]
  const said = narrowedTo(every, atAudit, [])
  expect(said.refusals).toEqual([])
  expect(said.checks).toEqual(["one"])
})

test("naming no check leaves a check that runs at no audit out", () => {
  const atAudit = gathered(["one"], ["audit"])
  const every = [...atAudit, ...gathered(["two"], ["change"])]
  expect(narrowedTo(every, atAudit, []).checks).not.toContain("two")
})

test("naming a check that runs at no audit asks the round for that check", () => {
  const atAudit = gathered(["one"], ["audit"])
  const every = [...atAudit, ...gathered(["two"], ["change"])]
  const said = narrowedTo(every, atAudit, ["two"])
  expect(said.refusals).toEqual([])
  expect(said.checks).toEqual(["two"])
})

test("a slug naming no check is refused, and the checks the index names are said", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  const said = narrowedTo(atAudit, atAudit, ["three"])
  expect(said.checks).toEqual([])
  expect(said.refusals[0]).toContain("`three` is no check the index names")
  expect(said.refusals[0]).toContain("`one`, `two`")
})

test("naming a check asks the round for only the check named", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  const said = narrowedTo(atAudit, atAudit, ["two"])
  expect(said.refusals).toEqual([])
  expect(said.checks).toEqual(["two"])
})

test("a run over every check that runs at audit leaves none of them out", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  expect(leftOutOf(atAudit, ["one", "two"])).toBe(0)
})

test("a run of a check that runs at no audit leaves every audit check out", () => {
  const atAudit = gathered(["one", "two"], ["audit"])
  expect(leftOutOf(atAudit, ["three"])).toBe(2)
})

test("a flag naming no check is refused", async () => {
  const said = await audit(["--check"], given())

  expect(said.refusals[0]).toBe("`--check` takes a value, and none follows it")
})

test("a check named twice is refused rather than run twice", () => {
  expect(wrongIn(["one", "one"])).toEqual(["`one` is named more than once"])
})

test("several checks are named in one call, and none of them is refused", () => {
  expect(wrongIn(["one", "two"])).toEqual([])
})

test("an argument that is no flag is refused by name, and the one flag is said", async () => {
  const said = await audit(["--everything"], given())
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--everything` is no argument `akasha audit` takes")
  expect(said.refusals[0]).toContain("--check")
})

test("a root holding no index is refused rather than answered clean", async () => {
  const said = await audit([], given())
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("nothing was judged")
})
