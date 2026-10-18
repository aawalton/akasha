import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { connectionWithJenny } from "akasha/alan/harness/attribute/readouts/connection-with-jenny/connection-with-jenny.readout.ts"
import { connection as connectionGroup } from "akasha/alan/harness/readout/group/pages/connection/connection.readout-group.ts"
import {
  colorIn,
  readingsDropped,
  servingStore,
  storeGoes,
  type Tile,
  tileAt,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.test-fixtures.ts"
import { RELAY_PATH } from "akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts"
import {
  type RelayingOne,
  relayingOneTo,
} from "akasha/alan/harness/readout/modules/relay/readout-relay.module.test-fixtures.ts"
import { loader } from "akasha/product/smilingjenny/web/routes/jenny-connection/jenny-connection.route.code.ts"
import { action } from "akasha/product/smilingjenny/web/routes/jenny-readout-relay/jenny-readout-relay.route.code.ts"

const RING_CREDENTIAL = crypto.randomUUID()
const RELAY_SECRET = crypto.randomUUID()
const READOUT = connectionWithJenny.slug
const GROUP = connectionGroup.slug
const PATH = "/api/connection"

process.env.SMILINGJENNY_RING_CREDENTIAL = RING_CREDENTIAL
process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

const READOUT_ROW = {
  slug: READOUT,
  label: "Connection",
  unit: "points",
  scale: "attribute-points",
  wireKey: "connection",
  groups: [{ group: GROUP, place: 1 }],
}

const SCALE_ROW = {
  slug: "attribute-points",
  blackAt: 0,
  redAt: 0.25,
  yellowAt: 0.5,
  greenAt: 1,
  blueAt: 2,
}

const ANSWERED: { readouts: readonly Record<string, unknown>[] } = { readouts: [READOUT_ROW] }

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let tile: Tile
let carryNow: RelayingOne

beforeAll(() => {
  store = servingStore((asked) => {
    if (asked.pageTypeSlug === "readout") return ANSWERED.readouts
    if (asked.pageTypeSlug === "readout-group") return [connectionGroup]
    return [SCALE_ROW]
  })
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === RELAY_PATH) return action({ request } as never)
      if (pathname === PATH) return loader({ request } as never)
      return new Response("no such route", { status: 404 })
    },
  })
  const origin = `http://localhost:${server.port}`
  tile = tileAt(origin, PATH, GROUP, RING_CREDENTIAL)
  carryNow = relayingOneTo(origin, RELAY_SECRET, READOUT)
})

afterAll(() => {
  server.stop()
  storeGoes(store)
})

beforeEach(() => {
  readingsDropped()
  ANSWERED.readouts = [READOUT_ROW]
})

test("a caller holding no ring credential is refused", async () => {
  await carryNow(1)
  expect((await tile.askedWith(null)).status).toBe(401)
  expect((await tile.askedWith(crypto.randomUUID())).status).toBe(401)
})

test("the tile is handed the one connection stoplight", async () => {
  await carryNow(1.5)
  const stoplights = await tile.drawn()
  expect(stoplights.length).toBe(1)
  expect(stoplights[0]?.label).toBe("Connection")
  expect(stoplights[0]?.habit).toBe("connection")
  expect(stoplights[0]?.reading).toBe("1.5")
})

test("the color is the rung the points reach on the charisma's scale", async () => {
  await carryNow(0.75)
  const [one] = await tile.drawn()
  expect(one?.tier).toBe("yellow")
  expect(one?.nextTier).toBe("green")
  expect(one?.progress).toBe(0.5)
})

test("a day with no hours at ease with Jenny is black rather than no signal", async () => {
  await carryNow(0)
  const [one] = await tile.drawn()
  expect(one?.tier).toBe("black")
  expect(one?.readingHeld).toBeUndefined()
  expect(one?.reading).toBe("0")
})

test("nothing carried in shows no signal rather than a connection of zero", async () => {
  const [one] = await tile.drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
})

test("every stoplight carries a tier that is one of the six colors the phone decodes", async () => {
  for (const points of [0, 0.25, 0.5, 1, 2, 3.5]) {
    readingsDropped()
    await carryNow(points)
    for (const one of await tile.drawn()) {
      expect(TIERS).toContain(colorIn(one, "tier"))
      if (one.nextTier !== undefined) expect(TIERS).toContain(colorIn(one, "nextTier"))
    }
  }
})

test("only a group no readout is left in answers 503", async () => {
  await carryNow(1)
  expect((await tile.answer()).status).toBe(200)
  ANSWERED.readouts = []
  expect((await tile.answer()).status).toBe(503)
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow(1)
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
})
