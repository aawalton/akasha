// Alan's inbox tile, driven over real HTTP: the relay carrier POSTs each reading into his
// receiving route, and the group-serving path answers them as the `stoplights` body his shipped
// widget decodes. The relay secret is the only made-up thing here, generated fresh for each run.
//
// The readings are fixtures, and they are the three in the widget's own `INBOX_PREVIEW`. Alan's own
// inbox counts are never read here, and no test asserts a count as though it were his.
//
// What this pins that the upkeep files do not:
//
// The key. `InboxStoplight` decodes `let inbox: String`, non-optional, where every other stoplight
// consumer decodes `habit`, and `answerStoplightsAdmittedBy` defaults to `habit`. A route that
// forgot the fourth argument would answer 200 with a well-formed body that throws inside the array
// decode on the phone, leaving the last good payload on screen. Nothing on the server would say
// so. The assertion is on `Object.keys` of the decoded body rather than on field access, because
// `habit` and `inbox` are both declared on `Stoplight` and reading either one typechecks.
//
// The count. Two of three readouts would answer two rings and look right, so these count what
// comes back rather than asking whether anything did. Three is the number: two and four are both
// failures that draw a plausible tile.
//
// The membership. `READOUT_ROWS` below is a hand-copy of the pages, so it would go on answering
// three however many readouts really name the group. `the pages naming the inboxes group` reads
// the pages themselves off disk instead, and is the one test here that a readout left in the group
// by a half-finished removal cannot get past.
//
// The direction. Both inbox scales fall — a hundred waiting is black and an empty inbox is
// blue — where every upkeep scale climbs. A `tierAt` that reads only climbing scales answers null
// for all three, and a readout answering null is left out rather than refused, so the tile would
// have shown no rings while nothing errored.

import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { join } from "node:path"
import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { dropRelayed, RELAY_PATH, relayReading } from "@akasha/readout-system/readout-relay"
import { Glob } from "bun"
import { action } from "./api.readout-relay.ts"

// This workspace preloads happy-dom, which replaces `globalThis.Response` with one `Bun.serve`
// refuses to answer with. The preload keeps the native `fetch`, so the native `Response` comes
// back off any answer that fetch gives.
globalThis.Response = (await fetch("data:text/plain,")).constructor as typeof Response

const RELAY_SECRET = crypto.randomUUID()
const GROUP = "inboxes"

process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

// The three readouts naming the `inboxes` group and the two scales they are read against, as
// those pages state them. Held here so a change to any of them shows up as a failure rather than
// as a missing ring.
const READOUT_ROWS = [
  {
    slug: "inboxes-email",
    label: "Email",
    unit: "messages",
    place: 1,
    figureFormat: "integer",
    scaleSlug: "lowest-inbox-count",
    wireKey: "email",
    groupSlugs: [GROUP],
  },
  {
    slug: "inboxes-tasks",
    label: "Tasks",
    unit: "tasks",
    place: 2,
    figureFormat: "integer",
    scaleSlug: "daily-inbox",
    wireKey: "tasks",
    groupSlugs: [GROUP],
  },
  {
    slug: "inboxes-temper-tasks",
    label: "Temper tasks",
    unit: "tasks",
    place: 3,
    figureFormat: "integer",
    scaleSlug: "daily-inbox",
    wireKey: "temperTasks",
    groupSlugs: [GROUP],
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

// The widget's own preview payload, which is the record of what the old server sent.
const CARRIED: readonly (readonly [string, number])[] = [
  ["inboxes-email", 0],
  ["inboxes-tasks", 4],
  ["inboxes-temper-tasks", 23],
]

const ANSWERED: { readouts: readonly Record<string, unknown>[] } = { readouts: READOUT_ROWS }

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let origin: string

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
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === RELAY_PATH) return action({ request } as never)
      if (pathname === "/api/inbox-stoplights") {
        return answerStoplightsAdmittedBy(request, () => null, GROUP, "inbox")
      }
      return new Response("no such route", { status: 404 })
    },
  })
  origin = `http://localhost:${server.port}`
})

afterAll(() => {
  server.stop()
  store.stop()
})

beforeEach(() => {
  dropRelayed()
  ANSWERED.readouts = READOUT_ROWS
})

type Stoplight = Record<string, unknown>

// A stoplight is read here as the wire carries it, so every value arrives as `unknown` and a
// colour has to be narrowed before it can be compared. Narrowing by throwing rather than by
// casting keeps a key that arrives as the wrong shape from reading as a colour the list refuses.
function colourIn(one: Stoplight, key: string): string {
  const held = one[key]
  if (typeof held !== "string") {
    throw new Error(`a stoplight carries no text under \`${key}\`: ${JSON.stringify(held)}`)
  }
  return held
}

const tile = () => fetch(`${origin}/api/inbox-stoplights`)

const carryNow = (readout: string, value: number, at: Date = new Date()) =>
  relayReading(origin, RELAY_SECRET, { readout, value, at: at.toISOString() })

async function carryAll(at: Date = new Date()): Promise<void> {
  for (const [readout, value] of CARRIED) await carryNow(readout, value, at)
}

async function drawn(): Promise<readonly Stoplight[]> {
  const answered = await tile()
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Stoplight[] }
  return body.stoplights
}

// Every admitted readout answers a ring now, so a position no longer means the same inbox from
// one run to the next. Name the inbox wanted rather than counting to it.
async function ringFor(inbox: string): Promise<Stoplight | undefined> {
  return (await drawn()).find((one) => one.inbox === inbox)
}

const AKASHA = join(import.meta.dir, "..", "..", "..", "..", "akasha")

// Every readout page under `akasha/` that names the inboxes group, read off the pages rather than
// off the fixture above. A readout page left behind by a removal shows up here by its own slug.
async function readoutsNamingInboxes(): Promise<readonly string[]> {
  const named: string[] = []
  for await (const relative of new Glob("**/*.readout.ts").scan({ cwd: AKASHA })) {
    if (relative.includes("node_modules")) continue
    const loaded = (await import(join(AKASHA, relative))) as Record<
      string,
      { slug?: string; groupSlugs?: readonly string[] } | undefined
    >
    for (const one of Object.values(loaded)) {
      if (one?.slug === undefined) continue
      if (one.groupSlugs?.includes(GROUP) === true) named.push(one.slug)
    }
  }
  return named.sort()
}

test("the pages naming the inboxes group are the three the fixture holds", async () => {
  expect(await readoutsNamingInboxes()).toEqual([
    "inboxes-email",
    "inboxes-tasks",
    "inboxes-temper-tasks",
  ])
})

test("the fixture holds every page naming the group and no page it does not", async () => {
  expect(READOUT_ROWS.map((one) => one.slug).sort()).toEqual([...(await readoutsNamingInboxes())])
})

test("nothing carried in shows three empty rings rather than an empty list", async () => {
  const some = await drawn()
  expect(some.length).toBe(3)
  for (const one of some) {
    expect(one.readingHeld).toBe("none")
    expect(one.reading).toBe("")
    expect(one.tier).toBe("black")
  }
})

test("all three inboxes come back when all three have been carried in", async () => {
  await carryAll()
  expect((await drawn()).length).toBe(3)
})

test("every stoplight carries its key under `inbox` rather than under `habit`", async () => {
  await carryAll()
  for (const one of await drawn()) {
    expect(Object.keys(one)).toContain("inbox")
    expect(Object.keys(one)).not.toContain("habit")
  }
})

test("the three keys are the three the shipped widget looks its labels up by", async () => {
  await carryAll()
  expect((await drawn()).map((one) => one.inbox)).toEqual(["email", "tasks", "temperTasks"])
})

test("the rings come back in the place order the readout pages state", async () => {
  await carryAll()
  expect((await drawn()).map((one) => one.label)).toEqual(["Email", "Tasks", "Temper tasks"])
})

test("an inbox with no fresh reading keeps its ring rather than leaving the tile short", async () => {
  await carryNow("inboxes-email", 0)
  const some = await drawn()
  expect(some.length).toBe(3)
  expect(some.map((one) => one.inbox)).toEqual(["email", "tasks", "temperTasks"])
  expect((await ringFor("email"))?.reading).toBe("0")
  expect((await ringFor("email"))?.readingHeld).toBeUndefined()
  expect((await ringFor("tasks"))?.reading).toBe("")
  expect((await ringFor("tasks"))?.readingHeld).toBe("none")
})

test("every stoplight carries a tier that is one of the six colours the phone decodes", async () => {
  await carryAll()
  for (const one of await drawn()) {
    expect(TIERS).toContain(colourIn(one, "tier"))
    if (one.nextTier !== undefined) expect(TIERS).toContain(colourIn(one, "nextTier"))
  }
})

test("an inbox at empty is blue, with no tier above it", async () => {
  await carryAll()
  const [email] = await drawn()
  expect(email?.tier).toBe("blue")
  expect(email?.reading).toBe("0")
  expect(email?.nextTier).toBeUndefined()
  expect(email?.progress).toBeUndefined()
})

test("a falling scale colours a rising count worse rather than better", async () => {
  await carryAll()
  const [, tasks, temperTasks] = await drawn()
  expect(tasks?.tier).toBe("yellow")
  expect(temperTasks?.tier).toBe("red")
})

test("an inbox over a hundred is black rather than a reading gone missing", async () => {
  await carryNow("inboxes-tasks", 140)
  const one = await ringFor("tasks")
  expect(one?.tier).toBe("black")
  expect(one?.reading).toBe("140")
})

test("a count of zero and a count never carried are told apart on the wire", async () => {
  await carryNow("inboxes-email", 0)
  const carried = await ringFor("email")
  expect(carried?.reading).toBe("0")
  expect(carried?.readingHeld).toBeUndefined()

  const absent = await ringFor("temperTasks")
  expect(absent?.reading).toBe("")
  expect(absent?.readingHeld).toBe("none")
})

test("the tier a falling reading is next to reach is the better one", async () => {
  await carryAll()
  const [, tasks, temperTasks] = await drawn()
  expect(tasks?.nextTier).toBe("blue")
  expect(temperTasks?.nextTier).toBe("yellow")
})

test("how far a falling reading has come is the fraction of its band it has come down", async () => {
  await carryAll()
  const [, tasks, temperTasks] = await drawn()
  expect(tasks?.progress).toBeCloseTo(6 / 9, 12)
  expect(temperTasks?.progress).toBeCloseTo(77 / 90, 12)
})

test("a count reaches the widget as a string, which is what the widget decodes", async () => {
  await carryAll()
  for (const one of await drawn()) expect(typeof one.reading).toBe("string")
})

test("a count is written whole rather than as the float the relay carried", async () => {
  await carryNow("inboxes-tasks", 4.4)
  expect((await ringFor("tasks"))?.reading).toBe("4")
})

test("a reading past forty-five minutes shows an empty ring rather than the count it held", async () => {
  await carryAll(new Date(Date.now() - 46 * 60_000))
  const some = await drawn()
  expect(some.length).toBe(3)
  for (const one of some) {
    expect(one.readingHeld).toBe("stale")
    expect(one.reading).toBe("")
  }
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryAll()
  expect((await tile()).headers.get("Cache-Control")).toBe("no-store")
})
