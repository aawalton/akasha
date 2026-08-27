import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { ROUTE_TARGETS } from "@shared/person-access/page-type"
import type { AppLoadContext } from "react-router"
import { z } from "zod"
import type { DeviceSecretContext } from "~/device-secret/lib/device-secrets.server"
import { scriptedAccessRecord } from "~/person-access/lib/_route-access-test-record"

const deviceSecrets = await import("~/device-secret/lib/device-secrets.server")
const unmockedResolveDeviceSecretContext = deviceSecrets.resolveDeviceSecretContext

const GRANTED_PERSON = "b41d9c62-3f7e-4a18-9d55-6c2e8f0a7b34"
const GRANTED: DeviceSecretContext = { authenticated: true, userId: GRANTED_PERSON }
const UNGRANTED_PERSON = "4ee54543-cb30-4f47-a8d0-9269b4b7df76"
const SOMEBODY_ELSE: DeviceSecretContext = { authenticated: true, userId: UNGRANTED_PERSON }

const record = scriptedAccessRecord()
record.grant(GRANTED_PERSON, ROUTE_TARGETS.READOUT_FEED)

type ScriptedCredential = "anonymous" | "granted" | "somebody-else"
let scriptedCredential: ScriptedCredential = "anonymous"

mock.module("~/device-secret/lib/device-secrets.server", () => ({
  mintDeviceSecret: deviceSecrets.mintDeviceSecret,
  revokeDeviceSecret: deviceSecrets.revokeDeviceSecret,
  resolveDeviceSecretContext: async (request: Request): Promise<DeviceSecretContext> => {
    if (scriptedCredential === "granted") return GRANTED
    if (scriptedCredential === "somebody-else") return SOMEBODY_ELSE
    return unmockedResolveDeviceSecretContext(request)
  },
}))

mock.module("~/person-access/lib/route-access.server", () => ({
  holdsRouteAccess: record.holdsRouteAccess,
}))

mock.module("~/lib/supabase.server", () => ({
  getSupabaseServiceClient: (): never => {
    throw new Error(
      "this file watches the gate alone: a feed reaching its store has already passed the gate, " +
        "and reading one live would time out whichever case reached it first"
    )
  },
}))

const MonarchCookieSchema = z.string().optional()
const realMonarchCookie = MonarchCookieSchema.parse(process.env.MONARCH_COOKIE)

beforeEach(() => {
  process.env.MONARCH_COOKIE = ""
})

afterEach(() => {
  if (realMonarchCookie === undefined) delete process.env.MONARCH_COOKIE
  else process.env.MONARCH_COOKIE = realMonarchCookie
})

const uncredentialedGet = (path: string): Request => new Request(`https://alanwalton.com${path}`)

type ReadoutLoaderArgs = {
  request: Request
  url: URL
  params: Record<string, string | undefined>
  pattern: string
  context: AppLoadContext
}
type ReadoutLoader = (args: ReadoutLoaderArgs) => Promise<Response>

const gateArgs = (path: string): ReadoutLoaderArgs => {
  const request = uncredentialedGet(path)
  return {
    request,
    url: new URL(request.url),
    params: {},
    pattern: path,
    context: {},
  }
}

const VALUES_STOPLIGHTS: readonly [string, ReadoutLoader] = [
  "/api/values-stoplights",
  (await import("./api.values-stoplights")).loader,
]

const ROUTES: readonly (readonly [string, ReadoutLoader])[] = [
  VALUES_STOPLIGHTS,
  ["/api/persona-stoplights", (await import("./api.persona-stoplights")).loader],
  ["/api/claude-usage", (await import("./api.claude-usage")).loader],
  ["/api/inbox-stoplights", (await import("./api.inbox-stoplights")).loader],
  ["/api/habit-stoplights", (await import("./api.habit-stoplights")).loader],
  ["/api/surplus", (await import("./api.surplus")).loader],
  ["/api/safety-level", (await import("./api.safety-level")).loader],
  ["/api/categorization", (await import("./api.categorization")).loader],
]

const BodySchema = z.record(z.string(), z.unknown())

const REASON_WORDS_A_REFUSAL_MUST_NOT_CONTAIN = [
  "absent",
  "missing",
  "malformed",
  "invalid",
  "unknown",
  "revoked",
  "expired",
  "header",
  "secret",
  "device",
]

const THREW_SO_IT_GOT_PAST_THE_GATE = false

const refusedByGate = (loader: ReadoutLoader, path: string): Promise<boolean> =>
  loader(gateArgs(path)).then(
    (res) => res.status === 401,
    () => THREW_SO_IT_GOT_PAST_THE_GATE
  )

describe("every readout feed refuse an uncredentialed caller", () => {
  for (const [path, loader] of ROUTES) {
    it(`${path} answers 401 before doing any data work`, async () => {
      scriptedCredential = "anonymous"
      const res = await loader(gateArgs(path))
      expect(res.status).toBe(401)
    })

    it(`${path} forbids any cache storing its refusal`, async () => {
      scriptedCredential = "anonymous"
      const res = await loader(gateArgs(path))
      expect(res.headers.get("Cache-Control")).toBe("no-store")
    })

    it(`${path} names no reason for refusing`, async () => {
      scriptedCredential = "anonymous"
      const res = await loader(gateArgs(path))
      const refusal = JSON.stringify(BodySchema.parse(await res.json())).toLowerCase()
      for (const reason of REASON_WORDS_A_REFUSAL_MUST_NOT_CONTAIN) {
        expect(refusal).not.toContain(reason)
      }
    })
  }
})

describe("every readout feed refuse a credential whose owner holds no grant", () => {
  for (const [path, loader] of ROUTES) {
    it(`${path} answers 401 to a live secret under an ungranted person`, async () => {
      scriptedCredential = "somebody-else"
      const res = await loader(gateArgs(path))
      scriptedCredential = "anonymous"
      expect(res.status).toBe(401)
    })

    it(`${path} refuses it exactly as it refuses an anonymous caller`, async () => {
      scriptedCredential = "somebody-else"
      const res = await loader(gateArgs(path))
      scriptedCredential = "anonymous"
      expect(res.headers.get("Cache-Control")).toBe("no-store")
      const refusal = JSON.stringify(BodySchema.parse(await res.json())).toLowerCase()
      for (const reason of REASON_WORDS_A_REFUSAL_MUST_NOT_CONTAIN) {
        expect(refusal).not.toContain(reason)
      }
      expect(refusal).not.toContain("user")
      expect(refusal).not.toContain("owner")
    })
  }
})

describe("every readout feed admit a credential whose owner holds the grant", () => {
  for (const [path, loader] of ROUTES) {
    it(`${path} does not refuse a caller whose person the record grants`, async () => {
      scriptedCredential = "granted"
      const refused = await refusedByGate(loader, path)
      scriptedCredential = "anonymous"
      expect(refused).toBe(false)
    })
  }
})

describe("the record, not the identity, is what the feeds consult", () => {
  const [path, loader] = VALUES_STOPLIGHTS

  it("serves the granted person, then refuses that same person once revoked", async () => {
    scriptedCredential = "granted"
    expect(await refusedByGate(loader, path)).toBe(false)

    record.revoke(GRANTED_PERSON, ROUTE_TARGETS.READOUT_FEED)
    const refusal = await loader(gateArgs(path))

    record.grant(GRANTED_PERSON, ROUTE_TARGETS.READOUT_FEED)
    scriptedCredential = "anonymous"
    expect(refusal.status).toBe(401)
  })

  it("refuses a person granted only the mint surface", async () => {
    record.revoke(GRANTED_PERSON, ROUTE_TARGETS.READOUT_FEED)
    record.grant(GRANTED_PERSON, ROUTE_TARGETS.DEVICE_SECRET_MINT)
    scriptedCredential = "granted"
    const refusal = await loader(gateArgs(path))

    record.revoke(GRANTED_PERSON, ROUTE_TARGETS.DEVICE_SECRET_MINT)
    record.grant(GRANTED_PERSON, ROUTE_TARGETS.READOUT_FEED)
    scriptedCredential = "anonymous"
    expect(refusal.status).toBe(401)
  })

  it("actually reads the record", () => {
    expect(record.reads()).toBeGreaterThan(0)
  })
})
