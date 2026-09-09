import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { join } from "node:path"
import { answerStoplightsAdmittedBy } from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"
import {
  colorIn,
  readoutsNaming,
  type Tile,
  tileAt,
} from "akasha/readouts/group-serving/readout-group-serving.module.test-fixtures.ts"
import {
  dropRelayed,
  RELAY_PATH,
  relayReading,
} from "akasha/readouts/relay/readout-relay.module.code.ts"
import { action } from "../readout-relay/readout-relay.route.code.ts"

globalThis.Response = (await fetch("data:text/plain,")).constructor as typeof Response

const RELAY_SECRET = crypto.randomUUID()
const GROUP = "inboxes"

process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

const PATH = "/api/inbox-stoplights"

const READOUT_ROWS = [
  {
    slug: "inboxes-email",
    label: "Email",
    unit: "messages",
    place: 1,
    scale: "lowest-inbox-count",
    wireKey: "email",
    groups: [GROUP],
  },
  {
    slug: "inboxes-tasks",
    label: "Tasks",
    unit: "tasks",
    place: 2,
    scale: "daily-inbox",
    wireKey: "tasks",
    groups: [GROUP],
  },
  {
    slug: "inboxes-temper-tasks",
    label: "Temper tasks",
    unit: "tasks",
    place: 3,
    scale: "daily-inbox",
    wireKey: "temperTasks",
    groups: [GROUP],
  },
]

const SCALE_ROWS: Record<string, Record<string, unknown>> = {
  "daily-inbox": {
    slug: "daily-inbox",
    blackAt: 100,
    redAt: 10,
    yellowAt: 1,
    blueAt: 0,
    earnedColorSlug: "green",
  },
  "lowest-inbox-count": {
    slug: "lowest-inbox-count",
    blackAt: 100,
    redAt: 20,
    yellowAt: 10,
    greenAt: 1,
    blueAt: 0,
  },
}

const CARRIED: readonly (readonly [string, number])[] = [
  ["inboxes-email", 0],
  ["inboxes-tasks", 4],
  ["inboxes-temper-tasks", 23],
]

const ANSWERED: { readouts: readonly Record<string, unknown>[] } = { readouts: READOUT_ROWS }

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let origin: string
let heldOrigin: string | undefined
let tile: Tile

beforeAll(() => {
  store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as {
        pageTypeSlug: string
        where?: { slug?: { is?: string } }
      }
      if (asked.pageTypeSlug === "readout") return Response.json({ rows: ANSWERED.readouts })
      const named = asked.where?.slug?.is ?? ""
      const scale = SCALE_ROWS[named]
      return Response.json({ rows: scale === undefined ? [] : [scale] })
    },
  })
  heldOrigin = process.env.PAGES_SERVICE_ORIGIN
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === RELAY_PATH) return action({ request } as never)
      if (pathname === PATH) {
        return answerStoplightsAdmittedBy(request, () => null, GROUP, "inbox")
      }
      return new Response("no such route", { status: 404 })
    },
  })
  origin = `http://localhost:${server.port}`
  tile = tileAt(origin, PATH, "inbox")
})

afterAll(() => {
  server.stop()
  store.stop(true)
  if (heldOrigin === undefined) delete process.env.PAGES_SERVICE_ORIGIN
  else process.env.PAGES_SERVICE_ORIGIN = heldOrigin
})

beforeEach(() => {
  dropRelayed()
  ANSWERED.readouts = READOUT_ROWS
})

const carryNow = (readout: string, value: number, at: Date = new Date()) =>
  relayReading(origin, RELAY_SECRET, { readout, value, at: at.toISOString() })

async function carryAll(at: Date = new Date()): Promise<void> {
  for (const [readout, value] of CARRIED) await carryNow(readout, value, at)
}

const AKASHA = join(import.meta.dir, "..", "..", "..", "..")

test("the pages naming the inboxes group are the three the fixture holds", async () => {
  expect(await readoutsNaming(AKASHA, GROUP)).toEqual([
    "inboxes-email",
    "inboxes-tasks",
    "inboxes-temper-tasks",
  ])
})

test("the fixture holds every page naming the group and no page it does not", async () => {
  expect(READOUT_ROWS.map((one) => one.slug).sort()).toEqual([
    ...(await readoutsNaming(AKASHA, GROUP)),
  ])
})

test("nothing carried in shows three empty rings rather than an empty list", async () => {
  const some = await tile.drawn()
  expect(some.length).toBe(3)
  for (const one of some) {
    expect(one.readingHeld).toBe("none")
    expect(one.reading).toBe("")
    expect(one.tier).toBe("black")
  }
})

test("all three inboxes come back when all three have been carried in", async () => {
  await carryAll()
  expect((await tile.drawn()).length).toBe(3)
})

test("every stoplight carries its key under `inbox` rather than under `habit`", async () => {
  await carryAll()
  for (const one of await tile.drawn()) {
    expect(Object.keys(one)).toContain("inbox")
    expect(Object.keys(one)).not.toContain("habit")
  }
})

test("the three keys are the three the shipped widget looks its labels up by", async () => {
  await carryAll()
  expect((await tile.drawn()).map((one) => one.inbox)).toEqual(["email", "tasks", "temperTasks"])
})

test("the rings come back in the place order the readout pages state", async () => {
  await carryAll()
  expect((await tile.drawn()).map((one) => one.label)).toEqual(["Email", "Tasks", "Temper tasks"])
})

test("an inbox with no fresh reading keeps its ring rather than leaving the tile short", async () => {
  await carryNow("inboxes-email", 0)
  const some = await tile.drawn()
  expect(some.length).toBe(3)
  expect(some.map((one) => one.inbox)).toEqual(["email", "tasks", "temperTasks"])
  expect((await tile.ringFor("email"))?.reading).toBe("0")
  expect((await tile.ringFor("email"))?.readingHeld).toBeUndefined()
  expect((await tile.ringFor("tasks"))?.reading).toBe("")
  expect((await tile.ringFor("tasks"))?.readingHeld).toBe("none")
})

test("every stoplight carries a tier that is one of the six colours the phone decodes", async () => {
  await carryAll()
  for (const one of await tile.drawn()) {
    expect(TIERS).toContain(colorIn(one, "tier"))
    if (one.nextTier !== undefined) expect(TIERS).toContain(colorIn(one, "nextTier"))
  }
})

test("an inbox at empty is blue, with no tier above it", async () => {
  await carryAll()
  const [email] = await tile.drawn()
  expect(email?.tier).toBe("blue")
  expect(email?.reading).toBe("0")
  expect(email?.nextTier).toBeUndefined()
  expect(email?.progress).toBeUndefined()
})

test("a falling scale colours a rising count worse rather than better", async () => {
  await carryAll()
  const [, tasks, temperTasks] = await tile.drawn()
  expect(tasks?.tier).toBe("yellow")
  expect(temperTasks?.tier).toBe("red")
})

test("an inbox over a hundred is black rather than a reading gone missing", async () => {
  await carryNow("inboxes-tasks", 140)
  const one = await tile.ringFor("tasks")
  expect(one?.tier).toBe("black")
  expect(one?.reading).toBe("140")
})

test("a count of zero and a count never carried are told apart on the wire", async () => {
  await carryNow("inboxes-email", 0)
  const carried = await tile.ringFor("email")
  expect(carried?.reading).toBe("0")
  expect(carried?.readingHeld).toBeUndefined()

  const absent = await tile.ringFor("temperTasks")
  expect(absent?.reading).toBe("")
  expect(absent?.readingHeld).toBe("none")
})

test("the tier a falling reading is next to reach is the better one", async () => {
  await carryAll()
  const [, tasks, temperTasks] = await tile.drawn()
  expect(tasks?.nextTier).toBe("blue")
  expect(temperTasks?.nextTier).toBe("yellow")
})

test("how far a falling reading has come is the fraction of its band it has come down", async () => {
  await carryAll()
  const [, tasks, temperTasks] = await tile.drawn()
  expect(tasks?.progress).toBeCloseTo(6 / 9, 12)
  expect(temperTasks?.progress).toBeCloseTo(77 / 90, 12)
})

test("a count reaches the widget as a string, which is what the widget decodes", async () => {
  await carryAll()
  for (const one of await tile.drawn()) expect(typeof one.reading).toBe("string")
})

test("a count is written as the number the relay carried rather than rounded off", async () => {
  await carryNow("inboxes-tasks", 4)
  expect((await tile.ringFor("tasks"))?.reading).toBe("4")
  await carryNow("inboxes-tasks", 4.4)
  expect((await tile.ringFor("tasks"))?.reading).toBe("4.4")
})

test("a reading past forty-five minutes shows an empty ring rather than the count it held", async () => {
  await carryAll(new Date(Date.now() - 46 * 60_000))
  const some = await tile.drawn()
  expect(some.length).toBe(3)
  for (const one of some) {
    expect(one.readingHeld).toBe("stale")
    expect(one.reading).toBe("")
  }
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryAll()
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
})
