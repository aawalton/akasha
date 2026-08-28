import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import type { AppLoadContext } from "react-router"
import { z } from "zod"

const COUNTS = { unreviewed: 7, total: 91, intake: 12 }
const CREDENTIAL = "ring-credential-the-widget-build-carries"

let relayAnswers: () => Promise<{ unreviewed: number; total: number; intake: number }> = async () =>
  COUNTS

mock.module("@shared/monarch-categorization-access/ring-relay", () => ({
  fetchRingCountsFromRoute: async () => relayAnswers(),
}))

const { loader, refuseUncredentialedRingCaller } = await import("./api.categorization")

const RING_CREDENTIAL_HEADER = "X-Ring-Credential"

type RingLoaderArgs = {
  request: Request
  url: URL
  params: Record<string, string | undefined>
  pattern: string
  context: AppLoadContext
}

const get = (headers: Record<string, string> = {}): Request =>
  new Request("https://smilingjenny.me/api/categorization", { headers })

const argsFor = (request: Request): RingLoaderArgs => ({
  request,
  url: new URL(request.url),
  params: {},
  pattern: "/api/categorization",
  context: {},
})

const anyObject = z.record(z.string(), z.unknown())

const optionalEnv = z.string().optional()

const realCredential = optionalEnv.parse(process.env["SMILINGJENNY_RING_CREDENTIAL"])

beforeEach(() => {
  relayAnswers = async () => COUNTS
  process.env["SMILINGJENNY_RING_CREDENTIAL"] = CREDENTIAL
})

afterEach(() => {
  if (realCredential === undefined) delete process.env["SMILINGJENNY_RING_CREDENTIAL"]
  else process.env["SMILINGJENNY_RING_CREDENTIAL"] = realCredential
})

describe("the gate", () => {
  test("refuses a caller presenting no credential", () => {
    const refusal = refuseUncredentialedRingCaller(get())
    expect(refusal?.status).toBe(401)
  })

  test("refuses every value that is not the credential exactly", () => {
    for (const presented of [
      CREDENTIAL.slice(0, -1),
      `${CREDENTIAL}x`,
      CREDENTIAL.toUpperCase(),
      "",
      "wrong",
    ]) {
      const refusal = refuseUncredentialedRingCaller(get({ [RING_CREDENTIAL_HEADER]: presented }))
      expect(refusal?.status).toBe(401)
    }
  })

  test("admits a caller presenting the credential", () => {
    expect(refuseUncredentialedRingCaller(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL }))).toBeNull()
  })

  test("admits nobody when SMILINGJENNY_RING_CREDENTIAL is unset", () => {
    delete process.env["SMILINGJENNY_RING_CREDENTIAL"]
    expect(
      refuseUncredentialedRingCaller(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL }))?.status
    ).toBe(401)
    expect(refuseUncredentialedRingCaller(get({ [RING_CREDENTIAL_HEADER]: "" }))?.status).toBe(401)
    expect(refuseUncredentialedRingCaller(get())?.status).toBe(401)
  })

  test("admits nobody when SMILINGJENNY_RING_CREDENTIAL is empty", () => {
    process.env["SMILINGJENNY_RING_CREDENTIAL"] = ""
    expect(refuseUncredentialedRingCaller(get({ [RING_CREDENTIAL_HEADER]: "" }))?.status).toBe(401)
  })

  test("refuses with no-store and a body naming no reason", async () => {
    const refusal = refuseUncredentialedRingCaller(get())
    if (refusal === null) throw new Error("the gate admitted a caller holding no credential")
    expect(refusal.headers.get("Cache-Control")).toBe("no-store")
    expect(await refusal.json()).toEqual({ ok: false, error: "Not authenticated." })
  })
})

describe("the loader", () => {
  test("serves the counts to a caller presenting the credential", async () => {
    const response = await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual(COUNTS)
  })

  test("lets no shared cache hold a body a credential is paid for", async () => {
    const response = await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))
    expect(response.headers.get("Cache-Control")).toBe("private, max-age=300")
  })

  test("refuses an uncredentialed caller rather than serving the counts", async () => {
    const response = await loader(argsFor(get()))
    expect(response.status).toBe(401)
    const body = anyObject.parse(await response.json())
    expect(body["unreviewed"]).toBeUndefined()
    expect(body["total"]).toBeUndefined()
    expect(body["intake"]).toBeUndefined()
  })

  test("answers 503 rather than 200 when the relay has no reading to give", async () => {
    relayAnswers = async () => {
      throw new Error("alanwalton.com answered 503 for the ring counts")
    }
    const response = await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))
    expect(response.status).toBe(503)
    expect(response.headers.get("Cache-Control")).toBe("no-store")
  })

  test("answers no counts at all when it has no reading, so zero cannot pass for one", async () => {
    relayAnswers = async () => {
      throw new Error("alanwalton.com answered 503 for the ring counts")
    }
    const response = await loader(argsFor(get({ [RING_CREDENTIAL_HEADER]: CREDENTIAL })))
    const body = anyObject.parse(await response.json())
    expect(body["unreviewed"]).toBeUndefined()
    expect(body["total"]).toBeUndefined()
    expect(body["intake"]).toBeUndefined()
  })
})
