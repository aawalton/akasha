import { expect, test } from "bun:test"
import { askComposed } from "../../pages-system/pages-query/store-questioning/store-questioning.module.code.ts"
import type { Fetcher } from "../../pages-system/pages-query/store-reaching/store-reaching.module.code.ts"
import { ACCOUNT_KEY } from "../person-enrolment/person-enrolment.module.code.ts"
import {
  grantsRoute,
  ROUTE_TARGETS,
  routeAccessForAccount,
  routeAccessForPerson,
  routeTargetsFor,
} from "./route-access.module.code.ts"

const LIVE_ORIGIN = "http://127.0.0.1:8787"

const ACCOUNT_NOBODY_STATES = "00000000-0000-7000-8000-000000000000"

const noNap = async () => undefined

function answeringByType(byType: Record<string, readonly Record<string, unknown>[]>): Fetcher {
  return async (_url, init) => {
    const body = JSON.parse(String(init.body)) as { pageTypeSlug: string }
    const rows = byType[body.pageTypeSlug] ?? []
    return new Response(JSON.stringify({ rows }), {
      headers: { "content-type": "application/json" },
    })
  }
}

async function overTheLiveStore<T>(taking: () => Promise<T>): Promise<T> {
  const held = process.env.PAGE_STORE_ORIGIN
  process.env.PAGE_STORE_ORIGIN = LIVE_ORIGIN
  try {
    return await taking()
  } finally {
    if (held === undefined) delete process.env.PAGE_STORE_ORIGIN
    else process.env.PAGE_STORE_ORIGIN = held
  }
}

async function accountStatedBy(personSlug: string): Promise<string> {
  const asked = await askComposed({
    "page-type": "person",
    where: { slug: { is: personSlug } },
    keys: [ACCOUNT_KEY],
  })
  if (!asked.ok) throw new Error(asked.why)
  const stated = asked.answer.rows[0]?.values[ACCOUNT_KEY]
  if (typeof stated !== "string" || stated === "") {
    throw new Error(`\`${personSlug}\` states no account, so nothing here can be read back`)
  }
  return stated
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
  let sent: Record<string, unknown> = {}
  const fetcher: Fetcher = async (_url, init) => {
    sent = JSON.parse(String(init.body))
    return new Response(JSON.stringify({ rows: [] }), {
      headers: { "content-type": "application/json" },
    })
  }
  await routeTargetsFor("alan", fetcher, noNap)
  expect(sent.pageTypeSlug).toBe("person-access")
  expect(sent.where).toEqual({ personSlug: { is: "alan" }, accessKind: { is: "route" } })
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
