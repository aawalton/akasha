import { afterAll, afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import * as askThrough from "@shared/status-bar-access/ask-through"
import * as readings from "@shared/status-bar-access/readings"
import * as stoplights from "@shared/status-bar-access/stoplights"

const realStatusBarAccess = { ...askThrough, ...readings, ...stoplights }
import type { AppLoadContext } from "react-router"
import { z } from "zod"

const realGreenDayUnitsLadder = realStatusBarAccess.GREEN_DAY_UNITS_LADDER
const realReadPersonaDaily = realStatusBarAccess.readPersonaDaily
const realGetInboxStoplightTiers = realStatusBarAccess.getInboxStoplightTiers
const realGetUpkeepStoplightTiers = realStatusBarAccess.getUpkeepStoplightTiers

let currentGetUpkeepStoplightTiers: typeof realGetUpkeepStoplightTiers = realGetUpkeepStoplightTiers

afterAll(() => {
  currentGetUpkeepStoplightTiers = realGetUpkeepStoplightTiers
})

const JENNYS_CAPTION = "Alan's Safety"

const SAFETY = {
  habit: "safety",
  label: "Safety",
  tier: "yellow",
  reading: "2.5",
  nextTier: "green",
  progress: 0.5,
}

let safetyAnswer: typeof SAFETY = SAFETY

const CREDENTIAL = "ring-credential-the-widget-build-carries"
const RING_CREDENTIAL_HEADER = "X-Ring-Credential"
const ESO_DAY = "1999-12-31"

let daysAsked: string[] = []

const notThisRoute = (what: string) => () => {
  throw new Error(`this route reads the safety level alone and never ${what}`)
}

currentGetUpkeepStoplightTiers = notThisRoute("reads the six upkeep circles")

mock.module("@shared/recurrence/reset-times", () => ({
  getEsoDayStr: () => ESO_DAY,
  getEsoResetTime: notThisRoute("asks for a reset time"),
  getEsoDayAnchor: notThisRoute("asks for a day anchor"),
  getEsoDayStrOffset: notThisRoute("asks for another day"),
  getEsoDayWindow: notThisRoute("asks for a day window"),
  diffEsoDays: notThisRoute("counts days"),
  nyWallToInstant: notThisRoute("converts wall time"),
  nyWallHm: notThisRoute("formats wall time"),
  getDenverDayEnd: notThisRoute("asks when a Denver day ends"),
  getMountainMorningDayStr: notThisRoute("asks for a mountain morning"),
  getMountainEveningDayStr: notThisRoute("asks for a mountain evening"),
}))

mock.module("@shared/status-bar-access", () => ({
  getSafetyStoplightTiers: async (args: { day: string }) => {
    daysAsked.push(args.day)
    return [safetyAnswer]
  },
  resolveOneReadout: notThisRoute("resolves one readout on its own"),
  resolveReadout: realStatusBarAccess.resolveReadout,
  resolveReadoutGroup: realStatusBarAccess.resolveReadoutGroup,
  readReadoutReading: realStatusBarAccess.readReadoutReading,
  readoutRing: realStatusBarAccess.readoutRing,
  upkeepStoplight: realStatusBarAccess.upkeepStoplight,
  getUpkeepStoplightTiers: (...args: Parameters<typeof realGetUpkeepStoplightTiers>) =>
    currentGetUpkeepStoplightTiers(...args),
  getUpkeepStoplights: notThisRoute("reads the six upkeep circles"),
  aggregateValueUnits: notThisRoute("aggregates value units"),
  GREEN_DAY_UNITS_LADDER: realGreenDayUnitsLadder,
  getDailyPerfectDay: notThisRoute("reads a perfect day"),
  getDailyStoplightFaces: notThisRoute("reads stoplight faces"),
  getDailyValues: notThisRoute("reads daily values"),
  readPersonaDaily: realReadPersonaDaily,
  getValuesLegend: notThisRoute("reads the values legend"),
  getInboxStoplights: notThisRoute("reads inbox stoplights"),
  getInboxStoplightTiers: realGetInboxStoplightTiers,
  getInboxLegend: notThisRoute("reads the inbox legend"),
  getPersonaDayColours: notThisRoute("reads persona day colours"),
  getPersonaStoplights: notThisRoute("reads persona stoplights"),
  doneByColumn: notThisRoute("reads the done columns"),
  fetchFinishedSince: notThisRoute("reads what finished"),
  trackOfLineageRows: notThisRoute("reads each row's track"),
  tierFloorValues: notThisRoute("reads tier floor values"),
  TIER_ORDER: realStatusBarAccess.TIER_ORDER,
  cardioReading: realStatusBarAccess.cardioReading,
  readDayMeasures: realStatusBarAccess.readDayMeasures,
  readSessionPages: realStatusBarAccess.readSessionPages,
  wakeWindow: realStatusBarAccess.wakeWindow,
  getUpkeepLegend: notThisRoute("reads the upkeep legend"),
}))

const { loader } = await import("./api.safety-level")

type RingLoaderArgs = {
  request: Request
  url: URL
  params: Record<string, string | undefined>
  pattern: string
  context: AppLoadContext
}

const get = (headers: Record<string, string> = {}): Request =>
  new Request("https://smilingjenny.me/api/safety-level", { headers })

const argsFor = (request: Request): RingLoaderArgs => ({
  request,
  url: new URL(request.url),
  params: {},
  pattern: "/api/safety-level",
  context: {},
})

const anyObject = z.record(z.string(), z.unknown())

const stoplightsBody = z.object({
  stoplights: z.array(z.object({ habit: z.string() })),
})

const captionedBody = z.object({
  stoplights: z.array(z.object({ label: z.string() })),
})

const optionalEnv = z.string().optional()
const realCredential = optionalEnv.parse(process.env["SMILINGJENNY_RING_CREDENTIAL"])

beforeEach(() => {
  daysAsked = []
  safetyAnswer = SAFETY
  process.env["SMILINGJENNY_RING_CREDENTIAL"] = CREDENTIAL
})

afterEach(() => {
  if (realCredential === undefined) delete process.env["SMILINGJENNY_RING_CREDENTIAL"]
  else process.env["SMILINGJENNY_RING_CREDENTIAL"] = realCredential
})

describe("the gate", () => {
  test("refuses a caller presenting no credential", async () => {
    expect((await loader(argsFor(get()))).status).toBe(401)
  })

  test("refuses every value that is not the credential exactly", async () => {
    for (const presented of [
      CREDENTIAL.slice(0, -1),
      `${CREDENTIAL}x`,
      CREDENTIAL.toUpperCase(),
      "",
      "wrong",
    ]) {
      const response = await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: presented })))
      expect(response.status).toBe(401)
    }
  })

  test("admits nobody when SMILINGJENNY_RING_CREDENTIAL is unset", async () => {
    delete process.env["SMILINGJENNY_RING_CREDENTIAL"]
    expect((await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))).status).toBe(401)
    expect((await loader(argsFor(get()))).status).toBe(401)
  })

  test("reads nothing at all for a caller it refuses", async () => {
    await loader(argsFor(get()))
    expect(daysAsked).toEqual([])
  })

  test("refuses with no-store and a body carrying no reading", async () => {
    const response = await loader(argsFor(get()))
    expect(response.headers.get("Cache-Control")).toBe("no-store")
    expect(anyObject.parse(await response.json())["stoplights"]).toBeUndefined()
  })
})

describe("the loader", () => {
  test("serves the safety circle to a caller presenting the credential", async () => {
    const response = await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      stoplights: [{ ...SAFETY, label: JENNYS_CAPTION }],
    })
  })

  test("captions the tile with whose level it is, which her phone cannot infer", async () => {
    const response = await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))
    const body = captionedBody.parse(await response.json())
    expect(body.stoplights[0]?.label).toBe(JENNYS_CAPTION)
  })

  test("carries an entry keyed safety, which is what the tile decodes on", async () => {
    const response = await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))
    const body = stoplightsBody.parse(await response.json())
    expect(body.stoplights.some((entry) => entry.habit === "safety")).toBe(true)
  })

  test("asks for the day the reset times decide, rather than one of its own", async () => {
    await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))
    expect(daysAsked).toEqual([ESO_DAY])
  })

  test("lets no cache hold a body about where Alan stands", async () => {
    const response = await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))
    expect(response.headers.get("Cache-Control")).toBe("private, no-store")
  })
})
