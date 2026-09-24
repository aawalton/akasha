import { expect, test } from "bun:test"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { accessKind } from "akasha/person/access-kind/access-kind.page-type.ts"
import { pageType as pageTypeKind } from "akasha/person/access-kind/pages/page-type.access-kind.ts"
import {
  answeringByType,
  noNap,
  recordingFetcher,
} from "akasha/person/modules/enrolment/person-enrolment.module.test-fixtures.ts"
import {
  ANONYMOUS_PERSON,
  DEEDS,
  type Grant,
  malformed,
  pageTypeGrantsFor,
  reachOf,
} from "akasha/person/modules/page-type-access/page-type-access.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { person } from "akasha/person/person.page-type.ts"

const ALAN_AT = `${person.slug}/${alan.slug}` as const

const PAGE_TYPE_AT = `${accessKind.slug}/${pageTypeKind.slug}` as const

const READ_ALL = [{ target: "all", deeds: [DEEDS.READ], narrow: null }]

async function grantsOf(personSlug: string, fetcher: Fetcher): Promise<readonly Grant[]> {
  const held = await pageTypeGrantsFor(personSlug, fetcher, noNap)
  if (!held.ok) throw new Error(held.why)
  return held.grants
}

test("a person with no page type access reads no page type", async () => {
  const grants = await grantsOf("ki", answeringByType({ "person-access": [] }))
  const reach = reachOf(grants, "world-skill", DEEDS.READ, "ki")
  expect(reach.permitted).toBe(false)
  expect(reach.permitted === false && reach.why).toContain("holds no page type access naming")
})

test("an access stating all names every page type", () => {
  expect(reachOf(READ_ALL, "anything-at-all", DEEDS.READ, "alan")).toEqual({
    permitted: true,
    narrows: null,
  })
})

test("an access naming one page type names no other", () => {
  const grants = [{ target: "world-skill", deeds: [DEEDS.READ], narrow: null }]
  expect(reachOf(grants, "world-skill", DEEDS.READ, "alan").permitted).toBe(true)
  expect(reachOf(grants, "world-character", DEEDS.READ, "alan").permitted).toBe(false)
})

test("an access opens only the deed that access names", () => {
  expect(reachOf(READ_ALL, "world-skill", DEEDS.WRITE, "alan").permitted).toBe(false)
  const both = [{ target: "all", deeds: [DEEDS.READ, DEEDS.WRITE], narrow: null }]
  expect(reachOf(both, "world-skill", DEEDS.WRITE, "alan").permitted).toBe(true)
})

test("an access naming no deed opens nothing", () => {
  const none = [{ target: "all", deeds: [], narrow: null }]
  expect(reachOf(none, "world-skill", DEEDS.READ, "alan").permitted).toBe(false)
})

test("a narrow an access carries is answered with the reach", () => {
  const narrowed = [
    { target: "world-skill", deeds: [DEEDS.READ_SOME], narrow: { key: "world", is: "world/one" } },
  ]
  expect(reachOf(narrowed, "world-skill", DEEDS.READ, "anonymous")).toEqual({
    permitted: true,
    narrows: [{ key: "world", is: "world/one" }],
  })
})

test("an access stating no narrow widens past one that does", () => {
  const both = [
    { target: "world-skill", deeds: [DEEDS.READ_SOME], narrow: { key: "world", is: "world/one" } },
    { target: "all", deeds: [DEEDS.READ], narrow: null },
  ]
  expect(reachOf(both, "world-skill", DEEDS.READ, "alan")).toEqual({
    permitted: true,
    narrows: null,
  })
})

test("an access carrying a narrow under the plain read deed reaches nothing", () => {
  const wrong = [
    { target: "world-skill", deeds: [DEEDS.READ], narrow: { key: "world", is: "world/one" } },
  ]
  expect(malformed(wrong[0] as Grant)).toContain("would widen past it")
  expect(reachOf(wrong, "world-skill", DEEDS.READ, "anonymous").permitted).toBe(false)
})

test("an access stating read-some and carrying no narrow reaches nothing", () => {
  const wrong = [{ target: "world-skill", deeds: [DEEDS.READ_SOME], narrow: null }]
  expect(malformed(wrong[0] as Grant)).toContain("carries no narrow")
  expect(reachOf(wrong, "world-skill", DEEDS.READ, "anonymous").permitted).toBe(false)
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

test("the reader nobody signed in as is asked for by that reader's own page", async () => {
  const recording = recordingFetcher()
  await pageTypeGrantsFor(ANONYMOUS_PERSON, recording.fetcher, noNap)
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
  const held = await pageTypeGrantsFor(ANONYMOUS_PERSON, fetcher, noNap)
  expect(held.ok).toBe(false)
  expect(held.ok === false && held.why).toContain("went unread")
})

test("a person's grants are read off the access pages", async () => {
  const grants = await grantsOf(
    "jenny",
    answeringByType({ "person-access": [{ target: "world-skill", deed: [DEEDS.READ] }] })
  )
  expect(reachOf(grants, "world-skill", DEEDS.READ, "jenny")).toEqual({
    permitted: true,
    narrows: null,
  })
})

test("a narrow the access pages carry reaches the reach", async () => {
  const grants = await grantsOf(
    "jenny",
    answeringByType({
      "person-access": [
        {
          target: "world-skill",
          deed: [DEEDS.READ_SOME],
          narrow: { key: "world", is: "world/one" },
        },
      ],
    })
  )
  expect(reachOf(grants, "world-skill", DEEDS.READ, "jenny")).toEqual({
    permitted: true,
    narrows: [{ key: "world", is: "world/one" }],
  })
})
