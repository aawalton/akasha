import { expect, test } from "bun:test"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { featureRequest } from "akasha/command/argument/pages/feature-request.argument.ts"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/command/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  askingFrom,
  boostsIn,
  deniedBy,
  type Giving,
  messageFor,
  noBalance,
  noContributor,
  noProposer,
  noRequest,
  noStanding,
  otherThan,
  proposerIn,
  requestDeny,
  saidFor,
} from "akasha/command/pages/request/deny/request-deny.command.code.ts"
import { requestDeny as page } from "akasha/command/pages/request/deny/request-deny.command.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha request deny",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const ASKED = { slug: "dark-mode" }

const ONE = "contributor-one"

const AT = "product/kofi/feature-request/pages/dark-mode.feature-request.ts"

function giving(points: number): Giving {
  return {
    page: "product/kofi/contributor/pages/one/contributor-one.contributor.ts",
    beside: "product/kofi/contributor/pages/one/contributor-one.contributor.transactions.jsonl",
    line: '{"id":"one","at":"now","points":40}\n',
    was: 10,
    now: 10 + points,
    points,
  }
}

test("a call naming two words is refused", async () => {
  const said = await requestDeny(["one", "two"], GIVEN)

  expect(said.refusals).toEqual([
    "`akasha request deny` takes 1 word and this call says 2 words — nothing takes `two`",
  ])
})

test("a call naming spaces alone is refused before any page is looked for", async () => {
  const said = await requestDeny(["   "], GIVEN)

  expect(said.refusals).toEqual([
    "the request said is empty, and a feature request is named by the slug that request declares",
  ])
})

test("a name that is no feature request is refused in words naming it", () => {
  expect(noRequest("nowhere")).toBe(
    "`nowhere` names no feature request, so there is nothing to deny"
  )
})

test("a request whose page says no standing is refused in words naming it", () => {
  expect(noStanding("dark-mode")).toBe(
    "`dark-mode` is a feature request saying no standing, so nothing was denied"
  )
})

test("a request that is proposed is refused in words naming the standing it is at", () => {
  expect(otherThan("dark-mode", "proposed")).toBe(
    "`dark-mode` is at the standing `proposed`, and only a published request is denied"
  )
})

test("a request naming no proposer is refused", () => {
  expect(noProposer("dark-mode")).toContain("names no proposer")
})

test("a boost naming no contributor page is refused in words naming it", () => {
  expect(noContributor(ONE)).toContain("is no contributor page")
})

test("a contributor stating no balance is refused in words naming it", () => {
  expect(noBalance(ONE)).toContain("states no balance")
})

test("a boost is read off the page as a contributor and the points that contributor spent", () => {
  const value = {
    boosts: [
      { contributor: "contributor/contributor-one", points: 300 },
      { contributor: "contributor/contributor-two", points: 40 },
    ],
  }

  expect(boostsIn(value)).toEqual([
    { contributor: "contributor-one", points: 300 },
    { contributor: "contributor-two", points: 40 },
  ])
})

test("a boost row that is no record, or names no points, is passed over", () => {
  const value = {
    boosts: [
      "not a record",
      { contributor: "contributor/contributor-one" },
      { points: 40 },
      { contributor: "contributor/contributor-two", points: 40 },
    ],
  }

  expect(boostsIn(value)).toEqual([{ contributor: "contributor-two", points: 40 }])
})

test("a page carrying no boost is read as nothing boosting it", () => {
  expect(boostsIn({})).toEqual([])
  expect(boostsIn(null)).toEqual([])
})

test("the proposer is read off the page as a bare slug", () => {
  expect(proposerIn({ proposer: "contributor/contributor-one" })).toBe("contributor-one")
  expect(proposerIn({})).toBe(null)
  expect(proposerIn(null)).toBe(null)
})

test("every contributor given points back gains a line and a balance, and the standing is restated last", () => {
  const asked = askingFrom(AT, [giving(40)])

  expect(asked).toHaveLength(3)
  expect(asked[0]?.given).toEqual({
    at: "product/kofi/contributor/pages/one/contributor-one.contributor.transactions.jsonl",
    content: '{"id":"one","at":"now","points":40}\n',
  })
  expect(asked[1]?.given).toEqual({
    at: "product/kofi/contributor/pages/one/contributor-one.contributor.ts",
    old: "balance: 10,",
    new: "balance: 50,",
  })
  expect(asked[2]?.given).toEqual({ at: AT, key: "standing", to: "denied" })
})

test("a request nothing is owed back on is restated and nothing else", () => {
  const asked = askingFrom(AT, [])

  expect(asked).toHaveLength(1)
  expect(asked[0]?.given).toEqual({ at: AT, key: "standing", to: "denied" })
})

test("the commit says which request was denied", () => {
  expect(messageFor(ASKED)).toBe("deny the feature request dark-mode and put its boosts back")
})

test("a run says what became of the request, what went back, and the commit", () => {
  expect(saidFor(ASKED, [giving(40)], "abc123")).toEqual([
    "dark-mode is denied",
    "40 points went back, over 1 boosts",
    "abc123",
  ])
})

test("a run owing nothing back says so", () => {
  expect(saidFor(ASKED, [], null)).toEqual([
    "dark-mode is denied",
    "nothing was owed back, so no points moved",
  ])
})

test("the one word lands on the argument sitting at its place in `arguments`", () => {
  const read = takenFor([ASKED.slug], GIVEN.calledAs, page, [featureRequest])

  expect(read).toEqual({ taken: { featureRequest: ASKED.slug } })
})

const GAVE_WAY = new Error("the standing would not be restated")

test("a run that landed the denial and then threw says that commit", async () => {
  const said = await deniedBy(ASKED, GIVEN, throwingAfter(["abc123"], GAVE_WAY))

  expect(said.report).toEqual(["abc123"])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run throwing before the denial landed says why and nothing more", async () => {
  const said = await deniedBy(ASKED, GIVEN, throwingAfter([], GAVE_WAY))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the standing would not be restated")
})
