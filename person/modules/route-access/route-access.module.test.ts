import { expect, test } from "bun:test"
import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { accessKind } from "akasha/person/access-kind/access-kind.page-type.ts"
import { route } from "akasha/person/access-kind/pages/route.access-kind.ts"
import { asAccount } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import {
  noNap,
  recordingFetcher,
} from "akasha/person/modules/enrolment/person-enrolment.module.test-fixtures.ts"
import {
  grantsRoute,
  ROUTE_TARGETS,
  routeAccessFor,
  routeAccessForPerson,
  routeTargetsFor,
} from "akasha/person/modules/route-access/route-access.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { person } from "akasha/person/person.page-type.ts"

const ACCOUNT_NOBODY_STATES = "00000000-0000-7000-8000-000000000000"

const ALAN_AT = `${person.slug}/${alan.slug}` as const

const ROUTE_AT = `${accessKind.slug}/${route.slug}` as const

function parseAsked(held: unknown): { readonly pageTypeSlug: string } {
  const slug = asObjectRecord(held)?.["pageTypeSlug"]
  if (typeof slug !== "string") throw new Error("the body a fetch was handed names no page type")
  return { pageTypeSlug: slug }
}

function answeringByType(byType: Record<string, readonly Record<string, unknown>[]>): Fetcher {
  return async (_url, init) => {
    const body = parseAsked(JSON.parse(String(init.body)))
    const rows = byType[body.pageTypeSlug] ?? []
    return new Response(JSON.stringify({ rows }), {
      headers: { "content-type": "application/json" },
    })
  }
}

test("an account no person states reaches no route", async () => {
  const decided = await routeAccessFor(
    asAccount(ACCOUNT_NOBODY_STATES),
    ROUTE_TARGETS.READOUT_FEED,
    answeringByType({ person: [] }),
    noNap
  )
  expect(decided.permitted).toBe(false)
  expect(decided.why).toContain("no person states the account")
})

test("a person with no route access reaches no route", async () => {
  const decided = await routeAccessForPerson(
    "ki",
    ROUTE_TARGETS.READOUT_FEED,
    answeringByType({ "person-access": [] }),
    noNap
  )
  expect(decided.permitted).toBe(false)
  expect(decided.why).toContain("holds no route access naming")
})

test("an access stating all names every route", () => {
  expect(grantsRoute(["all"], "anything-at-all")).toBe(true)
})

test("an access naming one route names no other", () => {
  expect(grantsRoute(["readout-feed"], "readout-feed")).toBe(true)
  expect(grantsRoute(["readout-feed"], "device-secret-mint")).toBe(false)
})

test("only an access of the route kind is asked for", async () => {
  const recording = recordingFetcher()
  await routeTargetsFor(alan.slug, recording.fetcher, noNap)
  expect(recording.sent().pageTypeSlug).toBe("person-access")
  expect(recording.sent().where).toEqual({
    person: { is: ALAN_AT },
    accessKind: { is: ROUTE_AT },
  })
})

test("an account read to a person takes that person's grants", async () => {
  const decided = await routeAccessFor(
    asAccount("an-account"),
    "readout-feed",
    answeringByType({
      person: [{ slug: "jenny" }],
      "person-access": [{ target: "readout-feed" }],
    }),
    noNap
  )
  expect(decided).toEqual({ permitted: true, why: null })
})

test("access pages that went unread open nothing", async () => {
  const fetcher: Fetcher = async (_url, init) => {
    const body = parseAsked(JSON.parse(String(init.body)))
    if (body.pageTypeSlug === "person") {
      return new Response(JSON.stringify({ rows: [{ slug: "jenny" }] }), {
        headers: { "content-type": "application/json" },
      })
    }
    return new Response(JSON.stringify({ refused: "no" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
  const decided = await routeAccessFor(asAccount("an-account"), "readout-feed", fetcher, noNap)
  expect(decided.permitted).toBe(false)
  expect(decided.why).toContain("went unread")
})
