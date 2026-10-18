import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { inboxes as inboxesGroup } from "akasha/alan/harness/readout/group/pages/inboxes/inboxes.readout-group.ts"
import { answerStoplightsAdmittedBy } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import {
  colorIn,
  readingsDropped,
  readoutsNaming,
  servingStore,
  storeGoes,
  type Tile,
  tileAt,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.test-fixtures.ts"
import { RELAY_PATH } from "akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts"
import {
  type Relaying,
  relayingTo,
} from "akasha/alan/harness/readout/modules/relay/readout-relay.module.test-fixtures.ts"
import { SERVED_BY } from "akasha/alan/web/routes/inbox-stoplights/inbox-stoplights.route.code.ts"
import { action } from "akasha/alan/web/routes/readout-relay/readout-relay.route.code.ts"

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
    scale: "inbox-count",
    wireKey: "email",
    groups: [{ group: GROUP, place: 1 }],
  },
  {
    slug: "inboxes-tasks",
    label: "Tasks",
    unit: "tasks",
    scale: "inbox-count",
    wireKey: "tasks",
    groups: [{ group: GROUP, place: 2 }],
  },
  {
    slug: "inboxes-temper-tasks",
    label: "Temper",
    unit: "tasks",
    scale: "inbox-count",
    wireKey: "temperTasks",
    groups: [{ group: GROUP, place: 3 }],
  },
]

const SCALE_ROWS: Record<string, Record<string, unknown>> = {
  "inbox-count": {
    slug: "inbox-count",
    blackAt: 10000,
    redAt: 1000,
    orangeAt: 100,
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
let tile: Tile
let carryNow: Relaying

beforeAll(() => {
  store = servingStore((asked) => {
    if (asked.pageTypeSlug === "readout") return ANSWERED.readouts
    if (asked.pageTypeSlug === "readout-group") return [inboxesGroup]
    const scale = SCALE_ROWS[asked.where?.slug?.is ?? ""]
    return scale === undefined ? [] : [scale]
  })
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === RELAY_PATH) return action({ request } as never)
      if (pathname === PATH) {
        return answerStoplightsAdmittedBy(request, () => null, SERVED_BY)
      }
      return new Response("no such route", { status: 404 })
    },
  })
  origin = `http://localhost:${server.port}`
  tile = tileAt(origin, PATH, inboxesGroup.wireKeyName)
  carryNow = relayingTo(origin, RELAY_SECRET)
})

afterAll(() => {
  server.stop()
  storeGoes(store)
})

beforeEach(() => {
  readingsDropped()
  ANSWERED.readouts = READOUT_ROWS
})

async function carryAll(at: Date = new Date()): Promise<void> {
  for (const [readout, value] of CARRIED) await carryNow(readout, value, at)
}

test("the group this answers for is the inboxes group, whose page names this route", () => {
  expect<readonly string[]>(inboxesGroup.servedBy).toContain(SERVED_BY)
})

test("the pages naming the inboxes group are the three the fixture holds", () => {
  expect([...readoutsNaming(GROUP)].sort()).toEqual([
    "inboxes-email",
    "inboxes-tasks",
    "inboxes-temper-tasks",
  ])
})

test("the fixture holds every page naming the group and no page it does not", () => {
  expect(READOUT_ROWS.map((one) => one.slug).sort()).toEqual([...readoutsNaming(GROUP)])
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

test("the three keys are the three the widget looks its labels up by", async () => {
  await carryAll()
  expect((await tile.drawn()).map((one) => one.inbox)).toEqual(["email", "tasks", "temperTasks"])
})

test("the rings come back in the place order the readout pages state", async () => {
  await carryAll()
  expect((await tile.drawn()).map((one) => one.label)).toEqual(["Email", "Tasks", "Temper"])
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
  expect(tasks?.tier).toBe("green")
  expect(temperTasks?.tier).toBe("yellow")
})

test("each rung above green is ten times the one below it", async () => {
  for (const [count, tier] of [
    [0, "blue"],
    [1, "green"],
    [9, "green"],
    [10, "yellow"],
    [99, "yellow"],
    [100, "orange"],
    [999, "orange"],
    [1000, "red"],
    [9999, "red"],
    [10000, "black"],
  ] as const) {
    await carryNow("inboxes-tasks", count)
    expect((await tile.ringFor("tasks"))?.tier).toBe(tier)
  }
})

test("an inbox of ten thousand or more is black rather than a reading gone missing", async () => {
  await carryNow("inboxes-tasks", 14000)
  const one = await tile.ringFor("tasks")
  expect(one?.tier).toBe("black")
  expect(one?.reading).toBe("14000")
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
  expect(temperTasks?.nextTier).toBe("green")
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

test("a reading taken long ago keeps the count it holds on the ring", async () => {
  await carryAll(new Date(Date.now() - 46 * 60_000))
  const some = await tile.drawn()
  expect(some.length).toBe(3)
  for (const one of some) {
    expect(one.readingHeld).toBeUndefined()
    expect(one.reading).not.toBe("")
  }
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryAll()
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
})
