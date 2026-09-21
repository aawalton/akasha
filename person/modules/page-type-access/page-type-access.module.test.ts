import { expect, test } from "bun:test"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { accessKind } from "akasha/person/access-kind/access-kind.page-type.ts"
import { pageType as pageTypeKind } from "akasha/person/access-kind/pages/page-type.access-kind.ts"
import { asAccount } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import {
  answeringByType,
  noNap,
  recordingFetcher,
} from "akasha/person/modules/enrolment/person-enrolment.module.test-fixtures.ts"
import {
  ANONYMOUS_PERSON,
  DEEDS,
  grantsPageType,
  pageTypeAccessFor,
  pageTypeAccessForPerson,
  pageTypeGrantsFor,
} from "akasha/person/modules/page-type-access/page-type-access.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { person } from "akasha/person/person.page-type.ts"

const ALAN_AT = `${person.slug}/${alan.slug}` as const

const PAGE_TYPE_AT = `${accessKind.slug}/${pageTypeKind.slug}` as const

const READ_ALL = [{ target: "all", deeds: [DEEDS.READ] }]

test("a person with no page type access reads no page type", async () => {
  const decided = await pageTypeAccessForPerson(
    "ki",
    "world-skill",
    DEEDS.READ,
    answeringByType({ "person-access": [] }),
    noNap
  )
  expect(decided.permitted).toBe(false)
  expect(decided.why).toContain("holds no page type access naming")
})

test("an access stating all names every page type", () => {
  expect(grantsPageType(READ_ALL, "anything-at-all", DEEDS.READ)).toBe(true)
})

test("an access naming one page type names no other", () => {
  const grants = [{ target: "world-skill", deeds: [DEEDS.READ] }]
  expect(grantsPageType(grants, "world-skill", DEEDS.READ)).toBe(true)
  expect(grantsPageType(grants, "world-character", DEEDS.READ)).toBe(false)
})

test("an access opens only the deed that access names", () => {
  expect(grantsPageType(READ_ALL, "world-skill", DEEDS.WRITE)).toBe(false)
  const both = [{ target: "all", deeds: [DEEDS.READ, DEEDS.WRITE] }]
  expect(grantsPageType(both, "world-skill", DEEDS.WRITE)).toBe(true)
})

test("an access naming no deed opens nothing", () => {
  expect(grantsPageType([{ target: "all", deeds: [] }], "world-skill", DEEDS.READ)).toBe(false)
})

test("only an access of the page type kind is asked for", async () => {
  const recording = recordingFetcher()
  await pageTypeGrantsFor(alan.slug, recording.fetcher, noNap)
  expect(recording.sent().pageTypeSlug).toBe("person-access")
  expect(recording.sent().where).toEqual({
    person: { is: ALAN_AT },
    accessKind: { is: PAGE_TYPE_AT },
  })
})

test("a caller no session names takes the anonymous reader's grants", async () => {
  const recording = recordingFetcher()
  await pageTypeAccessFor(null, "world-skill", DEEDS.READ, recording.fetcher, noNap)
  expect(recording.sent().where).toEqual({
    person: { is: `${person.slug}/${ANONYMOUS_PERSON}` },
    accessKind: { is: PAGE_TYPE_AT },
  })
})

test("access pages that went unread open nothing", async () => {
  const fetcher: Fetcher = async () =>
    new Response(JSON.stringify({ refused: "no" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  const decided = await pageTypeAccessFor(null, "world-skill", DEEDS.READ, fetcher, noNap)
  expect(decided.permitted).toBe(false)
  expect(decided.why).toContain("went unread")
})

test("an account read to a person takes that person's grants", async () => {
  const decided = await pageTypeAccessFor(
    asAccount("an-account"),
    "world-skill",
    DEEDS.READ,
    answeringByType({
      person: [{ slug: "jenny" }],
      "person-access": [{ target: "world-skill", deed: [DEEDS.READ] }],
    }),
    noNap
  )
  expect(decided).toEqual({ permitted: true, why: null })
})
