import { beforeEach, describe, expect, mock, test } from "bun:test"
import type { AppLoadContext } from "react-router"
import { z } from "zod"

const CREDENTIAL = "ring-credential-the-widget-build-carries"
const RING_CREDENTIAL_HEADER = "X-Ring-Credential"
const ESO_DAY = "1999-12-31"

let clientsBuilt = 0

const notThisRoute = (what: string) => () => {
  throw new Error(`this route reads the surplus alone and never ${what}`)
}

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

mock.module("@shared/supabase-server", () => ({
  createServiceRoleClient: () => {
    clientsBuilt += 1
    return { theStubbedClient: true }
  },
}))

const { loader } = await import("./api.surplus")

type RingLoaderArgs = {
  request: Request
  url: URL
  params: Record<string, string | undefined>
  pattern: string
  context: AppLoadContext
}

const get = (headers: Record<string, string> = {}): Request =>
  new Request("https://smilingjenny.me/api/surplus", { headers })

const argsFor = (request: Request): RingLoaderArgs => ({
  request,
  url: new URL(request.url),
  params: {},
  pattern: "/api/surplus",
  context: {},
})

const admitted = () => argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL }))

const anyObject = z.record(z.string(), z.unknown())

beforeEach(() => {
  clientsBuilt = 0
  process.env["SMILINGJENNY_RING_CREDENTIAL"] = CREDENTIAL
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
    expect((await loader(admitted())).status).toBe(401)
    expect((await loader(argsFor(get()))).status).toBe(401)
  })

  test("reads nothing at all for a caller it refuses", async () => {
    await loader(argsFor(get()))
    expect(clientsBuilt).toBe(0)
  })

  test("refuses with no-store and a body carrying no reading", async () => {
    const response = await loader(argsFor(get()))
    expect(response.headers.get("Cache-Control")).toBe("no-store")
    expect(anyObject.parse(await response.json())["stoplights"]).toBeUndefined()
  })
})
