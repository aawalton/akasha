import { expect, test } from "bun:test"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { page as pageArgument } from "akasha/command/argument/pages/page.argument.ts"
import { statement } from "akasha/command/argument/pages/statement.argument.ts"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/command/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  droppedBy,
  gapDelete,
  gapThere,
  messageFor,
  noAddress,
  noGap,
  noPage,
  saidFor,
  wrongIn,
} from "akasha/command/pages/gap/delete/gap-delete.command.code.ts"
import { gapDelete as commandPage } from "akasha/command/pages/gap/delete/gap-delete.command.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha gap delete",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const HELD = { page: "domain/alpha", statement: "A thing is so." }

test("a call naming three words is refused", async () => {
  const said = await gapDelete(["one", "two", "three"], GIVEN)

  expect(said.refusals).toEqual([
    "`akasha gap delete` takes 2 words and this call says 3 words — nothing takes `three`",
  ])
})

test("a statement of no text is refused", () => {
  expect(wrongIn({ page: "domain/alpha", statement: "   " })).toEqual([
    "the statement said is empty, and a gap is named by the statement it states",
  ])
})

test("a name that is no page is refused in words naming it", () => {
  expect(wrongIn({ page: "alpha", statement: "A thing is so." })).toEqual([noAddress("alpha")])
  expect(noPage("domain/nowhere")).toBe("`domain/nowhere` is filed nowhere, so it states no gap")
})

test("a decision of another kind stating that text is no gap", () => {
  const value = {
    decisions: [{ decisionKind: "decision-kind/departure", statement: HELD.statement }],
  }
  expect(gapThere(value, HELD.statement)).toBe(false)
})

test("a gap stating that text is found", () => {
  const value = {
    decisions: [
      { decisionKind: "decision-kind/departure", statement: "Another thing is so." },
      { decisionKind: "decision-kind/gap", statement: HELD.statement },
    ],
  }
  expect(gapThere(value, HELD.statement)).toBe(true)
})

test("a page stating no gap saying that text is refused in words naming it", () => {
  expect(noGap(HELD)).toBe("domain/alpha states no gap saying `A thing is so.`")
})

test("the commit says what went and where it went from", () => {
  expect(messageFor(HELD)).toBe("take the gap `A thing is so.` out of domain/alpha")
})

test("a run says what went and the commit that run landed", () => {
  expect(saidFor(HELD, "abc123")).toEqual([
    "domain/alpha: the gap `A thing is so.` is gone",
    "abc123",
  ])
})

test("a run landing no commit says what went alone", () => {
  expect(saidFor(HELD, null)).toEqual(["domain/alpha: the gap `A thing is so.` is gone"])
})

test("each word lands on the argument sitting at its place", () => {
  const read = takenFor([HELD.page, HELD.statement], GIVEN.calledAs, commandPage, [
    pageArgument,
    statement,
  ])

  expect(read).toEqual({ taken: { page: HELD.page, statement: HELD.statement } })
})

const GAVE_WAY = new Error("the record would not come out of the page")

test("a run that landed the gap going and then threw says that commit", async () => {
  const said = await droppedBy(HELD, GIVEN, throwingAfter(["abc123"], GAVE_WAY))

  expect(said.report).toEqual(["abc123"])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run throwing before the gap went says why and nothing more", async () => {
  const said = await droppedBy(HELD, GIVEN, throwingAfter([], GAVE_WAY))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the record would not come out of the page")
})
