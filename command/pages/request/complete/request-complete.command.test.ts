import { expect, test } from "bun:test"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { featureRequest } from "akasha/command/argument/pages/feature-request.argument.ts"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/command/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  completedBy,
  messageFor,
  noRequest,
  noStanding,
  otherThan,
  requestComplete,
  saidFor,
} from "akasha/command/pages/request/complete/request-complete.command.code.ts"
import { requestComplete as page } from "akasha/command/pages/request/complete/request-complete.command.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha request complete",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const ASKED = { slug: "dark-mode" }

test("a call naming two words is refused", async () => {
  const said = await requestComplete(["one", "two"], GIVEN)

  expect(said.refusals).toEqual([
    "`akasha request complete` takes 1 word and this call says 2 words — nothing takes `two`",
  ])
})

test("a call naming spaces alone is refused before any page is looked for", async () => {
  const said = await requestComplete(["   "], GIVEN)

  expect(said.refusals).toEqual([
    "the request said is empty, and a feature request is named by the slug that request declares",
  ])
})

test("a name that is no feature request is refused in words naming it", () => {
  expect(noRequest("nowhere")).toBe(
    "`nowhere` names no feature request, so there is nothing to complete"
  )
})

test("a request whose page says no standing is refused in words naming it", () => {
  expect(noStanding("dark-mode")).toBe(
    "`dark-mode` is a feature request saying no standing, so nothing was completed"
  )
})

test("a request that is proposed is refused in words naming the standing it is at", () => {
  expect(otherThan("dark-mode", "proposed")).toBe(
    "`dark-mode` is at the standing `proposed`, and only a published request is completed"
  )
})

test("a request that is denied is refused in words naming the standing it is at", () => {
  expect(otherThan("dark-mode", "denied")).toBe(
    "`dark-mode` is at the standing `denied`, and only a published request is completed"
  )
})

test("the commit says which request was completed", () => {
  expect(messageFor(ASKED)).toBe("complete the feature request dark-mode")
})

test("a run says what became of the request and the commit that run landed", () => {
  expect(saidFor(ASKED, "abc123")).toEqual(["dark-mode is completed", "abc123"])
})

test("a run landing no commit says what became of the request alone", () => {
  expect(saidFor(ASKED, null)).toEqual(["dark-mode is completed"])
})

test("the one word lands on the argument sitting at its place in `arguments`", () => {
  const read = takenFor([ASKED.slug], GIVEN.calledAs, page, [featureRequest])

  expect(read).toEqual({ taken: { featureRequest: ASKED.slug } })
})

const GAVE_WAY = new Error("the standing would not be restated")

test("a run that landed the request completed and then threw says that commit", async () => {
  const said = await completedBy(ASKED, GIVEN, throwingAfter(["abc123"], GAVE_WAY))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run throwing before the request was completed says why and nothing more", async () => {
  const said = await completedBy(ASKED, GIVEN, throwingAfter([], GAVE_WAY))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the standing would not be restated")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})
