import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import { ROUTE_TARGETS } from "@shared/person-access/page-type"
import { z } from "zod"
import type { DeviceSecretContext } from "~/device-secret/lib/device-secrets.server"
import { scriptedAccessRecord } from "~/person-access/lib/_route-access-test-record"

const GRANTED_PERSON = "b41d9c62-3f7e-4a18-9d55-6c2e8f0a7b34"

const record = scriptedAccessRecord()
record.grant(GRANTED_PERSON, ROUTE_TARGETS.READOUT_FEED)

mock.module("~/person-access/lib/route-access.server", () => ({
  holdsRouteAccess: record.holdsRouteAccess,
}))

const {
  guardReadout,
  guardRingReadout,
  RELAY_SECRET_HEADER,
}: typeof import("./readout-credential.server") = await import("./readout-credential.server")
type DeviceSecretResolver = import("./readout-credential.server").DeviceSecretResolver

const optionalEnv = z.string().optional()

const RELAY_SECRET = "relay-secret-under-nobodys-user-id"
const realRelaySecret = optionalEnv.parse(process.env.SMILINGJENNY_RELAY_SECRET)

const anonymous: DeviceSecretResolver = async (): Promise<DeviceSecretContext> => ({
  authenticated: false,
})

const grantedDevice: DeviceSecretResolver = async (): Promise<DeviceSecretContext> => ({
  authenticated: true,
  userId: GRANTED_PERSON,
})

const somebodyElsesDevice: DeviceSecretResolver = async (): Promise<DeviceSecretContext> => ({
  authenticated: true,
  userId: "4ee54543-cb30-4f47-a8d0-9269b4b7df76",
})

function countingResolver(inner: DeviceSecretResolver) {
  let calls = 0
  return {
    calls: () => calls,
    resolve: async (request: Request): Promise<DeviceSecretContext> => {
      calls++
      return inner(request)
    },
  }
}

const get = (headers: Record<string, string> = {}): Request =>
  new Request("https://alanwalton.com/api/categorization", { headers })

beforeEach(() => {
  process.env.SMILINGJENNY_RELAY_SECRET = RELAY_SECRET
})

afterEach(() => {
  if (realRelaySecret === undefined) delete process.env.SMILINGJENNY_RELAY_SECRET
  else process.env.SMILINGJENNY_RELAY_SECRET = realRelaySecret
})

describe("the relay arm", () => {
  test("admits a caller presenting the relay secret, with no device secret at all", async () => {
    const request = get({ [RELAY_SECRET_HEADER]: RELAY_SECRET })
    expect(await guardRingReadout(request, anonymous)).toBeNull()
  })

  test("admits without a device-secret lookup, so no round trip is spent on it", async () => {
    const resolver = countingResolver(anonymous)
    await guardRingReadout(get({ [RELAY_SECRET_HEADER]: RELAY_SECRET }), resolver.resolve)
    expect(resolver.calls()).toBe(0)
  })

  test("refuses every value that is not the secret exactly", async () => {
    for (const presented of [
      RELAY_SECRET.slice(0, -1),
      `${RELAY_SECRET}x`,
      RELAY_SECRET.toUpperCase(),
      "",
      "wrong",
    ]) {
      const refusal = await guardRingReadout(get({ [RELAY_SECRET_HEADER]: presented }), anonymous)
      expect(refusal?.status).toBe(401)
    }
  })
})

describe("an unset relay secret admits nobody through the relay arm", () => {
  test("refuses when SMILINGJENNY_RELAY_SECRET is absent from the pod", async () => {
    delete process.env.SMILINGJENNY_RELAY_SECRET
    const refusal = await guardRingReadout(get({ [RELAY_SECRET_HEADER]: RELAY_SECRET }), anonymous)
    expect(refusal?.status).toBe(401)
  })

  test("refuses a caller sending an empty header when the env var is absent", async () => {
    delete process.env.SMILINGJENNY_RELAY_SECRET
    const refusal = await guardRingReadout(get({ [RELAY_SECRET_HEADER]: "" }), anonymous)
    expect(refusal?.status).toBe(401)
  })

  test("refuses when SMILINGJENNY_RELAY_SECRET is set to the empty string", async () => {
    process.env.SMILINGJENNY_RELAY_SECRET = ""
    const refusal = await guardRingReadout(get({ [RELAY_SECRET_HEADER]: "" }), anonymous)
    expect(refusal?.status).toBe(401)
  })

  test("still admits a granted person's device secret while the relay secret is unset", async () => {
    delete process.env.SMILINGJENNY_RELAY_SECRET
    expect(await guardRingReadout(get(), grantedDevice)).toBeNull()
  })
})

describe("the device-secret arm admits a granted person and nobody else", () => {
  test("admits a granted person's device secret", async () => {
    expect(await guardRingReadout(get(), grantedDevice)).toBeNull()
  })

  test("refuses a caller holding neither credential", async () => {
    const refusal = await guardRingReadout(get(), anonymous)
    expect(refusal?.status).toBe(401)
  })

  test("refuses a live device secret under an ungranted person", async () => {
    const refusal = await guardRingReadout(get(), somebodyElsesDevice)
    expect(refusal?.status).toBe(401)
  })

  test("does not let the relay widening carry a foreign device secret in", async () => {
    delete process.env.SMILINGJENNY_RELAY_SECRET
    const refusal = await guardRingReadout(get(), somebodyElsesDevice)
    expect(refusal?.status).toBe(401)
  })
})

describe("guardReadout admits a granted person's device secret and no other", () => {
  test("admits a person the record grants", async () => {
    expect(await guardReadout(get(), grantedDevice)).toBeNull()
  })

  test("refuses a live secret under a person the record grants nothing", async () => {
    const refusal = await guardReadout(get(), somebodyElsesDevice)
    expect(refusal?.status).toBe(401)
  })

  test("refuses a caller holding no credential", async () => {
    const refusal = await guardReadout(get(), anonymous)
    expect(refusal?.status).toBe(401)
  })

  test("ignores the relay credential entirely", async () => {
    const refusal = await guardReadout(get({ [RELAY_SECRET_HEADER]: RELAY_SECRET }), anonymous)
    expect(refusal?.status).toBe(401)
  })
})

describe("the refusal", () => {
  test("is a 401 no cache may store, naming no reason", async () => {
    const refusal = await guardRingReadout(get({ [RELAY_SECRET_HEADER]: "wrong" }), anonymous)
    if (refusal === null) throw new Error("the gate admitted a caller holding no credential")
    expect(refusal.status).toBe(401)
    expect(refusal.headers.get("Cache-Control")).toBe("no-store")
    const body = JSON.stringify(await refusal.json()).toLowerCase()
    for (const reason of ["relay", "secret", "header", "device", "missing", "wrong"]) {
      expect(body).not.toContain(reason)
    }
  })
})
