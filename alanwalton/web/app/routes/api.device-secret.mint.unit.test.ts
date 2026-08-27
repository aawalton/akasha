import { beforeEach, describe, expect, mock, test } from "bun:test"
import { ROUTE_TARGETS } from "@shared/person-access/page-type"
import type { AppLoadContext } from "react-router"
import { scriptedAccessRecord } from "~/person-access/lib/_route-access-test-record"

const GRANTED_PERSON = "b41d9c62-3f7e-4a18-9d55-6c2e8f0a7b34"
const SOMEBODY_ELSE = "4ee54543-cb30-4f47-a8d0-9269b4b7df76"
const MINTED = "dvs_v1_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

const record = scriptedAccessRecord()

const deviceSecrets = await import("~/device-secret/lib/device-secrets.server")

type ScriptedSession =
  | { authenticated: false; headers: Headers }
  | { authenticated: true; userId: string; headers: Headers }

let scriptedSession: ScriptedSession = { authenticated: false, headers: new Headers() }
let mintCalls: { userId: string; deviceId: string }[] = []

mock.module("~/push/lib/device-tokens.server", () => ({
  resolveDeviceTokenContext: async (): Promise<ScriptedSession> => scriptedSession,
}))

mock.module("~/device-secret/lib/device-secrets.server", () => ({
  mintDeviceSecret: async (args: { userId: string; deviceId: string }): Promise<string> => {
    mintCalls.push(args)
    return MINTED
  },
  revokeDeviceSecret: deviceSecrets.revokeDeviceSecret,
  resolveDeviceSecretContext: deviceSecrets.resolveDeviceSecretContext,
}))

mock.module("~/person-access/lib/route-access.server", () => ({
  holdsRouteAccess: record.holdsRouteAccess,
}))

const { action } = await import("./api.device-secret.mint")

const sessionFor = (userId: string): ScriptedSession => ({
  authenticated: true,
  userId,
  headers: new Headers(),
})

const mintRequest = (): Request =>
  new Request("https://alanwalton.com/api/device-secret/mint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId: "AAAAAAAA-1111-2222-3333-444444444444" }),
  })

type MintActionArgs = {
  request: Request
  url: URL
  params: Record<string, string | undefined>
  pattern: string
  context: AppLoadContext
}
type MintAction = (args: MintActionArgs) => Promise<Response>

const mintAction: MintAction = action

const mint = (): Promise<Response> => {
  const request = mintRequest()
  return mintAction({
    request,
    url: new URL(request.url),
    params: {},
    pattern: "/api/device-secret/mint",
    context: {},
  })
}

beforeEach(() => {
  mintCalls = []
  scriptedSession = { authenticated: false, headers: new Headers() }
  record.clear()
  record.grant(GRANTED_PERSON, ROUTE_TARGETS.DEVICE_SECRET_MINT)
})

describe("the mint route", () => {
  test("mints for a person the record grants the mint target", async () => {
    scriptedSession = sessionFor(GRANTED_PERSON)
    const res = await mint()
    expect(res.status).toBe(200)
    expect(mintCalls).toHaveLength(1)
    expect(mintCalls[0]?.userId).toBe(GRANTED_PERSON)
    expect(record.reads()).toBeGreaterThan(0)
  })

  test("stops minting for that same person once the grant is revoked", async () => {
    scriptedSession = sessionFor(GRANTED_PERSON)
    expect((await mint()).status).toBe(200)
    expect(mintCalls).toHaveLength(1)

    record.revoke(GRANTED_PERSON, ROUTE_TARGETS.DEVICE_SECRET_MINT)

    expect((await mint()).status).toBe(401)
    expect(mintCalls).toHaveLength(1)
  })

  test("refuses a person granted only the readout surface", async () => {
    record.clear()
    record.grant(GRANTED_PERSON, ROUTE_TARGETS.READOUT_FEED)
    scriptedSession = sessionFor(GRANTED_PERSON)
    const res = await mint()
    expect(res.status).toBe(401)
    expect(mintCalls).toEqual([])
  })

  test("refuses a signed-in session the record grants nothing", async () => {
    scriptedSession = sessionFor(SOMEBODY_ELSE)
    const res = await mint()
    expect(res.status).toBe(401)
  })

  test("writes no credential at all for anyone else", async () => {
    scriptedSession = sessionFor(SOMEBODY_ELSE)
    await mint()
    expect(mintCalls).toEqual([])
  })

  test("refuses without saying whose credential it would have been", async () => {
    scriptedSession = sessionFor(SOMEBODY_ELSE)
    const res = await mint()
    const body = JSON.stringify(await res.json()).toLowerCase()
    for (const leak of [SOMEBODY_ELSE, GRANTED_PERSON, "owner", "user", "alan"]) {
      expect(body).not.toContain(leak.toLowerCase())
    }
  })

  test("refuses an unenrolled person exactly as it refuses one whose grant was revoked", async () => {
    record.clear()
    scriptedSession = sessionFor(SOMEBODY_ELSE)
    const unenrolled = await mint()

    record.grant(GRANTED_PERSON, ROUTE_TARGETS.DEVICE_SECRET_MINT)
    record.revoke(GRANTED_PERSON, ROUTE_TARGETS.DEVICE_SECRET_MINT)
    scriptedSession = sessionFor(GRANTED_PERSON)
    const revoked = await mint()

    expect(revoked.status).toBe(unenrolled.status)
    expect(await revoked.json()).toEqual(await unenrolled.json())
  })

  test("refuses a foreign session exactly as it refuses an unauthenticated one", async () => {
    scriptedSession = { authenticated: false, headers: new Headers() }
    const anonymous = await mint()
    scriptedSession = sessionFor(SOMEBODY_ELSE)
    const foreign = await mint()
    expect(foreign.status).toBe(anonymous.status)
    expect(await foreign.json()).toEqual(await anonymous.json())
  })

  test("never returns a secret to a person the record does not grant", async () => {
    scriptedSession = sessionFor(SOMEBODY_ELSE)
    const body = JSON.stringify(await (await mint()).json())
    expect(body).not.toContain(MINTED)
    expect(body).not.toContain("dvs_v1_")
  })
})
