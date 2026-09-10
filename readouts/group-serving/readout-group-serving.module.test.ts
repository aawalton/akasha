import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { dropRelayed } from "../relay/readout-relay.module.code.ts"
import { relayedFor } from "../relay/readout-relay.module.test-fixtures.ts"
import { readingHeldOn } from "../serving/readout-serving.module.code.ts"
import {
  answerStoplightsAdmittedBy,
  inPlaceOrder,
  type Stoplight,
  stoplightsInGroup,
} from "./readout-group-serving.module.code.ts"
import {
  ANSWERED,
  answeredAfresh,
  figureOffScaleOn,
  GROUP,
  GROUP_ROW,
  OTHER,
  OTHER_ROW,
  READOUT,
  READOUT_ROW,
  SCALE_ROW,
  servingStore,
  storeGoes,
} from "./readout-group-serving.module.test-fixtures.ts"

let store: ReturnType<typeof Bun.serve>

beforeAll(() => {
  store = servingStore()
})

afterAll(() => {
  storeGoes(store)
})

beforeEach(() => {
  dropRelayed()
  answeredAfresh()
})

const drawn = () => answerStoplightsAdmittedBy(new Request("http://a.test/"), () => null, GROUP)

async function stoplights(): Promise<readonly Stoplight[]> {
  const answered = await drawn()
  expect(answered.status).toBe(200)
  return ((await answered.json()) as { stoplights: readonly Stoplight[] }).stoplights
}

const agedOut = () => new Date(Date.now() - 46 * 60_000)

test("a refusal a guard answers is served whole rather than made again here", async () => {
  const refused = await answerStoplightsAdmittedBy(
    new Request("http://a.test/"),
    () => new Response("held back", { status: 403 }),
    GROUP
  )
  expect(refused.status).toBe(403)
  expect(await refused.text()).toBe("held back")
})

test("a group no readout is left in is answered as no reading rather than as empty", async () => {
  ANSWERED.readouts = []
  const answered = await drawn()
  expect(answered.status).toBe(503)
  expect(await answered.json()).toEqual({ ok: false, error: "No reading." })
})

test("every readout the group admits is answered as a stoplight", async () => {
  const withNothingCarried = await stoplights()
  expect(withNothingCarried.length).toBe(1)

  relayedFor(READOUT, 3, agedOut())
  expect((await stoplights()).length).toBe(1)

  dropRelayed()
  relayedFor(READOUT, 3)
  expect((await stoplights()).length).toBe(1)
})

test("a readout carrying no reading is answered as a stoplight carrying no figure", async () => {
  const [one] = await stoplights()
  expect(one?.label).toBe("Safety")
  expect(one?.habit).toBe("safety")
  expect(one?.readingHeld).toBe("none")
})

test("a reading older than the window is answered as a stoplight carrying no figure", async () => {
  relayedFor(READOUT, 3, agedOut())
  const [one] = await stoplights()
  expect(one?.label).toBe("Safety")
  expect(one?.habit).toBe("safety")
  expect(one?.readingHeld).toBe("stale")
})

test("a stoplight carrying no figure names whether no reading was taken or the reading was too old", async () => {
  const never = (await stoplights())[0]?.readingHeld
  relayedFor(READOUT, 3, agedOut())
  const tooOld = (await stoplights())[0]?.readingHeld
  expect(never).toBe("none")
  expect(tooOld).toBe("stale")
  expect(never).not.toBe(tooOld)
})

test("a reading of zero is a reading rather than an absence", async () => {
  relayedFor(READOUT, 0)
  const [carried] = await stoplights()
  expect(carried?.reading).toBe("0")
  expect(carried?.readingHeld).toBeUndefined()

  dropRelayed()
  const [absent] = await stoplights()
  expect(absent?.reading).toBe("")
  expect(absent?.readingHeld).toBe("none")
})

test("the color of a stoplight carrying no figure is the color below every rung", async () => {
  const tier = (await stoplights())[0]?.tier ?? "no color was answered"
  expect(tier).toBe("black")
  expect(["black", "red", "orange", "yellow", "green", "blue"]).toContain(tier)
})

test("a stoplight carrying no figure carries the figure as empty text rather than leaving it out", async () => {
  const answered = await drawn()
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Record<string, unknown>[] }
  const [one] = body.stoplights
  expect(one === undefined ? [] : Object.keys(one)).toContain("reading")
  expect(one?.reading).toBe("")
})

test("a stoplight carrying no figure carries no tier above and no fraction climbed", async () => {
  const [never] = await stoplights()
  expect(never?.nextTier).toBeUndefined()
  expect(never?.progress).toBeUndefined()

  relayedFor(READOUT, 3, agedOut())
  const [tooOld] = await stoplights()
  expect(tooOld?.nextTier).toBeUndefined()
  expect(tooOld?.progress).toBeUndefined()
})

test("a stoplight carrying a reading says nothing of how that reading is held", async () => {
  relayedFor(READOUT, 2.5)
  const answered = await drawn()
  const body = (await answered.json()) as { stoplights: readonly Record<string, unknown>[] }
  expect(Object.keys(body.stoplights[0] ?? {})).not.toContain("readingHeld")
})

test("a readout whose page names no wire key is left out rather than answered keyless", async () => {
  ANSWERED.readouts = [{ ...READOUT_ROW, wireKey: "  " }]
  expect((await drawn()).status).toBe(503)

  relayedFor(READOUT, 3)
  expect((await drawn()).status).toBe(503)
})

test("the color answered is the rung the reading reaches on the scale the readout names", async () => {
  relayedFor(READOUT, 2.5)
  const [one] = await stoplights()
  expect(one?.tier).toBe("yellow")
  expect(one?.nextTier).toBe("green")
  expect(one?.progress).toBe(0.5)
})

test("the label and the key answered are the ones the readout's own page carries", async () => {
  relayedFor(READOUT, 3)
  const [one] = await stoplights()
  expect(one?.label).toBe("Safety")
  expect(one?.habit).toBe("safety")
})

const WIRE_KEY_NAME = "a-key-named-only-in-this-test"

async function keysAnswered(wireKeyName?: string): Promise<readonly string[]> {
  const answered = await answerStoplightsAdmittedBy(
    new Request("http://a.test/"),
    () => null,
    GROUP,
    wireKeyName
  )
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Record<string, unknown>[] }
  return Object.keys(body.stoplights[0] ?? {})
}

test("the wire key is answered under the key the caller names", async () => {
  relayedFor(READOUT, 3)
  const keys = await keysAnswered(WIRE_KEY_NAME)
  expect(keys).toContain(WIRE_KEY_NAME)
  expect(keys).not.toContain("habit")
})

test("a caller naming no key for the wire key has the wire key answered under habit", async () => {
  relayedFor(READOUT, 3)
  const keys = await keysAnswered()
  expect(keys).toContain("habit")
  expect(keys).not.toContain(WIRE_KEY_NAME)
})

test("the key the caller names is answered first, where the key answered before it was", async () => {
  relayedFor(READOUT, 3)
  expect((await keysAnswered(WIRE_KEY_NAME))[0]).toBe(WIRE_KEY_NAME)
  dropRelayed()
  relayedFor(READOUT, 3)
  expect((await keysAnswered())[0]).toBe("habit")
})

test("the key the caller names carries a stoplight that carries no figure too", async () => {
  expect(await keysAnswered(WIRE_KEY_NAME)).toContain(WIRE_KEY_NAME)
  expect(await keysAnswered()).toContain("habit")
})

test("a reading under ten keeps one decimal place", async () => {
  relayedFor(READOUT, 2.5)
  expect((await stoplights())[0]?.reading).toBe("2.5")
  dropRelayed()
  relayedFor(READOUT, -1.5)
  expect((await stoplights())[0]?.reading).toBe("-1.5")
})

test("a reading added up out of hours is floored to two significant figures", async () => {
  relayedFor(READOUT, -0.008333333333334636)
  expect((await stoplights())[0]?.reading).toBe("-0.0084")
})

test("a reading is never answered as the whole tail of the float it was added up from", async () => {
  relayedFor(READOUT, 2.6666666666666665)
  const said = (await stoplights())[0]?.reading ?? ""
  expect(said.length).toBeLessThanOrEqual(6)
  expect(said).toBe("2.6")
})

test("a reading below every rung is black rather than left out", async () => {
  relayedFor(READOUT, -2)
  const [one] = await stoplights()
  expect(one?.tier).toBe("black")
  expect(one?.nextTier).toBe("red")
  expect(one?.progress).toBeUndefined()
  expect(one?.readingHeld).toBeUndefined()
})

test("a reading on the highest rung has no tier above that rung", async () => {
  relayedFor(READOUT, 5)
  const [one] = await stoplights()
  expect(one?.tier).toBe("blue")
  expect(one?.nextTier).toBeUndefined()
})

test("a reading inside the window is still a reading", async () => {
  relayedFor(READOUT, 3, new Date(Date.now() - 44 * 60_000))
  const [one] = await stoplights()
  expect(one?.reading).toBe("3")
  expect(one?.readingHeld).toBeUndefined()
})

test("a readout whose page names no label is left out rather than labelled here", async () => {
  relayedFor(READOUT, 3)
  ANSWERED.readouts = [{ ...READOUT_ROW, label: "  " }]
  expect((await drawn()).status).toBe(503)
})

test("a readout whose page names no scale is left out rather than colored", async () => {
  relayedFor(READOUT, 3)
  ANSWERED.readouts = [{ slug: READOUT, label: "Safety" }]
  expect((await drawn()).status).toBe(503)
})

test("a scale the store withholds leaves its readout out rather than colored", async () => {
  relayedFor(READOUT, 3)
  ANSWERED.scales = []
  expect((await drawn()).status).toBe(503)
})

test("the readouts are answered in the order the place on each page states", () => {
  const ordered = inPlaceOrder([
    { slug: "c", place: 9 },
    { slug: "a", place: 1 },
    { slug: "b", place: 4 },
  ])
  expect(ordered.map((row) => row.slug)).toEqual(["a", "b", "c"])
})

test("a caller wanting the colors without a route asks for the group on its own", async () => {
  relayedFor(READOUT, 3)
  const held = await stoplightsInGroup(GROUP)
  expect(held.length).toBe(1)
  expect(held[0]?.habit).toBe("safety")
  expect(held[0]?.tier).toBe("green")
})

test("where each reading is read from is handed in rather than settled here", async () => {
  ANSWERED.readouts = [{ ...READOUT_ROW, lastValue: 2.5, lastValueAt: new Date().toISOString() }]
  const carried = await stoplightsInGroup(GROUP, "habit", readingHeldOn)
  expect(carried[0]?.tier).toBe("yellow")
  expect(carried[0]?.readingHeld).toBeUndefined()
})

const rowReading = (value: number, at: Date = new Date()) => [
  { ...READOUT_ROW, lastValue: value, lastValueAt: at.toISOString() },
]

test("a caller handing in nothing has the reading the relay holds read first", async () => {
  ANSWERED.readouts = rowReading(2.5)
  relayedFor(READOUT, 5)
  const [one] = await stoplights()
  expect(one?.reading).toBe("5")
  expect(one?.tier).toBe("blue")
})

test("a caller handing in nothing has the row's own reading read where the relay holds none", async () => {
  ANSWERED.readouts = rowReading(2.5)
  const drawnFromTheRow = await stoplightsInGroup(GROUP)
  expect(drawnFromTheRow[0]?.reading).toBe("2.5")
  expect(drawnFromTheRow[0]?.tier).toBe("yellow")
  expect(drawnFromTheRow[0]?.readingHeld).toBeUndefined()
})

test("a reading on neither the relay nor the row is answered as never taken", async () => {
  const [one] = await stoplights()
  expect(one?.reading).toBe("")
  expect(one?.tier).toBe("black")
  expect(one?.readingHeld).toBe("none")
})

test("a reading on the row older than the window is answered as too old", async () => {
  ANSWERED.readouts = rowReading(2.5, agedOut())
  const [one] = await stoplights()
  expect(one?.reading).toBe("")
  expect(one?.tier).toBe("black")
  expect(one?.readingHeld).toBe("stale")
})

test("a reading too old on the relay gives way to a fresh reading on the row", async () => {
  ANSWERED.readouts = rowReading(2.5)
  relayedFor(READOUT, 3, agedOut())
  const [one] = await stoplights()
  expect(one?.reading).toBe("2.5")
  expect(one?.readingHeld).toBeUndefined()
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  relayedFor(READOUT, 3)
  expect((await drawn()).headers.get("Cache-Control")).toBe("no-store")
  dropRelayed()
  expect((await drawn()).headers.get("Cache-Control")).toBe("no-store")
})

async function keysDrawn(): Promise<readonly (string | undefined)[]> {
  return (await stoplights()).map((one) => one.habit)
}

test("a readout whose page stills the readout is left out rather than answered", async () => {
  relayedFor(READOUT, 3)
  relayedFor(OTHER, 3)
  ANSWERED.readouts = [READOUT_ROW, { ...OTHER_ROW, enabled: false }]
  expect(await keysDrawn()).toEqual(["safety"])
})

test("a readout whose page states nothing about being stilled is answered", async () => {
  relayedFor(READOUT, 3)
  relayedFor(OTHER, 3)
  ANSWERED.readouts = [READOUT_ROW, OTHER_ROW]
  expect(await keysDrawn()).toEqual(["safety", "surplus"])
})

test("a readout stilled and then stilled no longer is answered again", async () => {
  relayedFor(READOUT, 3)
  relayedFor(OTHER, 3)
  ANSWERED.readouts = [READOUT_ROW, { ...OTHER_ROW, enabled: false }]
  expect(await keysDrawn()).toEqual(["safety"])
  ANSWERED.readouts = [READOUT_ROW, { ...OTHER_ROW, enabled: true }]
  expect(await keysDrawn()).toEqual(["safety", "surplus"])
})

test("a stilled readout keeps its place for the readouts left beside it", async () => {
  relayedFor(READOUT, 3)
  relayedFor(OTHER, 3)
  ANSWERED.readouts = [{ ...READOUT_ROW, enabled: false }, OTHER_ROW]
  expect(await keysDrawn()).toEqual(["surplus"])
})

test("a group every readout of which is stilled is answered as no reading", async () => {
  relayedFor(READOUT, 3)
  ANSWERED.readouts = [{ ...READOUT_ROW, enabled: false }]
  expect((await drawn()).status).toBe(503)
})

const offScaleDrawn = async (): Promise<unknown> =>
  figureOffScaleOn((await stoplightsInGroup(GROUP))[0])

test("a group stating it draws a figure off scale carries that on each reading", async () => {
  relayedFor(READOUT, 5)
  ANSWERED.groups = [{ ...GROUP_ROW, figureOffScale: true }]
  expect(await offScaleDrawn()).toBe(true)
})

test("a group stating nothing carries no answer about a figure off scale", async () => {
  relayedFor(READOUT, 5)
  expect(await offScaleDrawn()).toBeUndefined()
})

test("a group stating it draws no figure off scale carries no answer either", async () => {
  relayedFor(READOUT, 5)
  ANSWERED.groups = [{ ...GROUP_ROW, figureOffScale: false }]
  expect(await offScaleDrawn()).toBeUndefined()
})

test("a group the store holds no page for carries no answer", async () => {
  relayedFor(READOUT, 5)
  ANSWERED.groups = []
  expect(await offScaleDrawn()).toBeUndefined()
})

test("a group drawing a figure off scale carries that on every reading it sends", async () => {
  relayedFor(READOUT, 5)
  relayedFor(OTHER, 5)
  ANSWERED.readouts = [READOUT_ROW, OTHER_ROW]
  ANSWERED.groups = [{ ...GROUP_ROW, figureOffScale: true }]
  const sent = await stoplightsInGroup(GROUP)
  expect(sent.map(figureOffScaleOn)).toEqual([true, true])
})

test("a scale is still answered as a scale now that groups are answered too", async () => {
  relayedFor(READOUT, 2.5)
  expect((await stoplights())[0]?.tier).toBe("yellow")
  ANSWERED.scales = [SCALE_ROW]
  expect((await stoplights())[0]?.nextTier).toBe("green")
})
