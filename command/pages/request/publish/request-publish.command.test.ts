import { expect, test } from "bun:test"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { featureRequest } from "akasha/command/argument/pages/feature-request.argument.ts"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/command/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  messageFor,
  noRequest,
  noStanding,
  otherThan,
  publishedBy,
  requestPublish,
  saidFor,
  wrongIn,
} from "akasha/command/pages/request/publish/request-publish.command.code.ts"
import { requestPublish as page } from "akasha/command/pages/request/publish/request-publish.command.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha request publish",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const ASKED = { slug: "dark-mode" }

test("a call naming two words is refused", async () => {
  const said = await requestPublish(["one", "two"], GIVEN)

  expect(said.refusals).toEqual([
    "`akasha request publish` takes 1 word and this call says 2 words — nothing takes `two`",
  ])
})

test("a request of no text is refused", () => {
  expect(wrongIn({ slug: "   " })).toEqual([
    "the request said is empty, and a feature request is named by the slug that request declares",
  ])
})

test("a name that is no feature request is refused in words naming it", () => {
  expect(noRequest("nowhere")).toBe(
    "`nowhere` names no feature request, so there is nothing to publish"
  )
})

test("a request whose page says no standing is refused in words naming it", () => {
  expect(noStanding("dark-mode")).toBe(
    "`dark-mode` is a feature request saying no standing, so nothing was published"
  )
})

test("a request past proposed is refused in words naming the standing it is at", () => {
  expect(otherThan("dark-mode", "completed")).toBe(
    "`dark-mode` is at the standing `completed`, and only a proposed request is published"
  )
})

test("the commit says which request was published", () => {
  expect(messageFor(ASKED)).toBe("publish the feature request dark-mode")
})

test("a run says what became of the request and the commit that run landed", () => {
  expect(saidFor(ASKED, "abc123")).toEqual(["dark-mode is published", "abc123"])
})

test("a run landing no commit says what became of the request alone", () => {
  expect(saidFor(ASKED, null)).toEqual(["dark-mode is published"])
})

test("the one word lands on the argument sitting at its place in `arguments`", () => {
  const read = takenFor([ASKED.slug], GIVEN.calledAs, page, [featureRequest])

  expect(read).toEqual({ taken: { featureRequest: ASKED.slug } })
})

const GAVE_WAY = new Error("the standing would not be restated")

test("a run that landed the request published and then threw says that commit", async () => {
  const said = await publishedBy(ASKED, GIVEN, throwingAfter(["abc123"], GAVE_WAY))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run throwing before the request was published says why and nothing more", async () => {
  const said = await publishedBy(ASKED, GIVEN, throwingAfter([], GAVE_WAY))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the standing would not be restated")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})
