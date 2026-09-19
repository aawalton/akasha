import { expect, test } from "bun:test"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { finding } from "akasha/command/argument/pages/finding.argument.ts"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/command/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  droppedBy,
  findingDelete,
  messageFor,
  noFinding,
  saidFor,
  wrongIn,
} from "akasha/command/pages/finding/delete/finding-delete.command.code.ts"
import { findingDelete as page } from "akasha/command/pages/finding/delete/finding-delete.command.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha finding delete",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const HELD = "a-thing-goes-stale"

test("a call naming two words is refused", async () => {
  const said = await findingDelete(["one", "two"], GIVEN)

  expect(said.refusals).toEqual([
    "`akasha finding delete` takes 1 word and this call says 2 words — nothing takes `two`",
  ])
})

test("a name of no text is refused", () => {
  expect(wrongIn("   ")).toEqual([
    "the finding said is empty, and a finding is named by the slug it is filed under",
  ])
})

test("a name that is no finding is refused in words naming it", () => {
  expect(noFinding("nowhere")).toBe("`nowhere` names no finding, so there is no page to take away")
})

test("the commit says which finding went", () => {
  expect(messageFor(HELD)).toBe(`take the finding ${HELD} away`)
})

test("a run says what went and the commit that run landed", () => {
  expect(saidFor(HELD, "abc123")).toEqual([`${HELD} is gone`, "abc123"])
})

test("a run landing no commit says what went alone", () => {
  expect(saidFor(HELD, null)).toEqual([`${HELD} is gone`])
})

test("the one word lands on the argument sitting at its place", () => {
  const read = takenFor([HELD], GIVEN.calledAs, page, [finding])

  expect(read).toEqual({ taken: { finding: HELD } })
})

const GAVE_WAY = new Error("the page would not come away")

test("a run that landed the page going and then threw says that commit", async () => {
  const said = await droppedBy(HELD, GIVEN, throwingAfter(["abc123"], GAVE_WAY))

  expect(said.report).toEqual(["abc123"])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run throwing before the page went says why and nothing more", async () => {
  const said = await droppedBy(HELD, GIVEN, throwingAfter([], GAVE_WAY))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the page would not come away")
})
