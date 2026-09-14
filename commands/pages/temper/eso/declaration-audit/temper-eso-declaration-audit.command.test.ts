import { expect, test } from "bun:test"
import { OK, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Answering, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  auditAnswer,
  auditing,
  temperEsoDeclarationAudit,
} from "akasha/commands/pages/temper/eso/declaration-audit/temper-eso-declaration-audit.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper eso declaration-audit",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const UNRUN = new Error("the audit ran, and this call is refused before anything is read")

test("the world reaches this where the dispatcher hands it, rather than the test seam", () => {
  const answers: Answering = temperEsoDeclarationAudit

  expect(answers.length).toBe(2)
})

test("an argument this command does not take is refused rather than passed over", async () => {
  const said = await auditing(["--nope"], GIVEN, throwingAfter([], UNRUN))

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--nope` is no argument")
})

test("the checkout said twice is refused rather than read as the first saying", async () => {
  const twice = ["--code-root", "/one", "--code-root", "/two"]
  const said = await auditing(twice, GIVEN, throwingAfter([], UNRUN))

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--code-root` is said twice")
})

test("a value written after the flag that carries none is refused", async () => {
  const said = await auditing(["--json=yes"], GIVEN, throwingAfter([], UNRUN))

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--json` carries no value")
})

test("what the call said reaches the work under the keys the argument pages name", async () => {
  const seen: string[] = []
  const said = await auditing(["--eso-doc", "/doc.txt", "--json"], GIVEN, (_done, taken) => {
    seen.push(taken.esoDoc ?? "none", String(taken.json), taken.codeRoot ?? "none")
    return told([])
  })

  expect(seen).toEqual(["/doc.txt", "true", "none"])
  expect(said.code).toBe(0)
})

const READING = { findings: [{ label: "one" }] }

const BEHIND = ["1 of 4 artifact(s) compared are stamped behind clone API version 101"]

test("an artifact found behind the clone answers a code other than zero, in either shape", () => {
  const lines = auditAnswer(READING, ["  BEHIND THE CLONE: 1 of 4"], BEHIND, false)
  const oneLine = auditAnswer(READING, ["  BEHIND THE CLONE: 1 of 4"], BEHIND, true)

  expect(lines.code).not.toBe(OK)
  expect(oneLine.code).toBe(lines.code)
  expect(oneLine.refusals).toEqual(lines.refusals)
})

test("the shape asked for changes the report and leaves the reading whole", () => {
  const oneLine = auditAnswer(READING, ["  BEHIND THE CLONE: 1 of 4"], BEHIND, true)

  expect(oneLine.report).toHaveLength(1)
  expect(JSON.parse(oneLine.report[0] ?? "")).toEqual(READING)
})

test("an audit finding nothing answers the code of work done, in either shape", () => {
  expect(auditAnswer(READING, ["  clean"], [], false).code).toBe(OK)
  expect(auditAnswer(READING, ["  clean"], [], true).code).toBe(OK)
  expect(auditAnswer(READING, ["  clean"], [], false).refusals).toEqual([])
})
