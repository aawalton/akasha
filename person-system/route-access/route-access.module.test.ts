import { expect, test } from "bun:test"
import type { Fetcher } from "@akasha/pages-system-service/calling"
import {
  accountStatedBy,
  noNap,
  overTheLiveStore,
  recordingFetcher,
} from "../person-enrolment/person-enrolment.module.test-fixtures.ts"
import {
  grantsRoute,
  ROUTE_TARGETS,
  routeAccessForAccount,
  routeAccessForPerson,
  routeTargetsFor,
} from "./route-access.module.code.ts"

const ACCOUNT_NOBODY_STATES = "00000000-0000-7000-8000-000000000000"

function answeringByType(byType: Record<string, readonly Record<string, unknown>[]>): Fetcher {
  return async (_url, init) => {
    const body = JSON.parse(String(init.body)) as { pageTypeSlug: string }
    const rows = byType[body.pageTypeSlug] ?? []
    return new Response(JSON.stringify({ rows }), {
      headers: { "content-type": "application/json" },
    })
  }
}

test("the account Alan states reaches the readout feed", async () => {
  const decided = await overTheLiveStore(async () =>
    routeAccessForAccount(await accountStatedBy("alan"), ROUTE_TARGETS.READOUT_FEED)
  )
  expect(decided).toEqual({ permitted: true, why: null })
})

test("the account Alan states reaches the device secret mint", async () => {
  const decided = await overTheLiveStore(async () =>
    routeAccessForAccount(await accountStatedBy("alan"), ROUTE_TARGETS.DEVICE_SECRET_MINT)
  )
  expect(decided.permitted).toBe(true)
})

test("an account no person states reaches no route", async () => {
  const decided = await overTheLiveStore(async () =>
    routeAccessForAccount(ACCOUNT_NOBODY_STATES, ROUTE_TARGETS.READOUT_FEED)
  )
  expect(decided.permitted).toBe(false)
  expect(decided.why).toContain("no person states the account")
})

test("a person standing with no route access reaches no route", async () => {
  const decided = await overTheLiveStore(async () =>
    routeAccessForPerson("ki", ROUTE_TARGETS.READOUT_FEED)
  )
  expect(decided.permitted).toBe(false)
  expect(decided.why).toContain("holds no route access naming")
})

test("the accesses read for a person are the route ones alone", async () => {
  const held = await overTheLiveStore(async () => routeTargetsFor("alan"))
  expect(held.ok).toBe(true)
  if (!held.ok) return
  expect([...held.targets].sort()).toEqual(["all", "device-secret-mint", "readout-feed"])
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
  await routeTargetsFor("alan", recording.fetcher, noNap)
  expect(recording.sent().pageTypeSlug).toBe("person-access")
  expect(recording.sent().where).toEqual({
    personSlug: { is: "alan" },
    accessKind: { is: "route" },
  })
})

test("an account read to a person takes that person's grants", async () => {
  const decided = await routeAccessForAccount(
    "an-account",
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
    const body = JSON.parse(String(init.body)) as { pageTypeSlug: string }
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
  const decided = await routeAccessForAccount("an-account", "readout-feed", fetcher, noNap)
  expect(decided.permitted).toBe(false)
  expect(decided.why).toContain("went unread")
})
