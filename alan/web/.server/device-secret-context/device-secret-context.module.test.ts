import { expect, test } from "bun:test"
import type {
  Fetcher,
  Sleeper,
} from "akasha/pages/service/page-calling/page-calling.module.code.ts"
import {
  DEVICE_SECRET_HEADER,
  generateDeviceSecret,
  hashDeviceSecret,
} from "akasha/persons/device-secret-keeping/device-secret-keeping.module.code.ts"
import {
  readDeviceSecretAdmission,
  resolveDeviceSecretContext,
} from "./device-secret-context.module.code.ts"

const ALAN_ACCOUNT = "9ba554f7-cb18-48bb-a709-ec935a895ca7"

const A_DEVICE = "A1B2C3D4-E5F6-47B8-9C0D-1E2F3A4B5C6D"

const AT = "https://alanwalton.com/api/tracking/health-samples"

const noNap: Sleeper = async () => {}

function presenting(secret: string | null): Request {
  const headers = new Headers()
  if (secret !== null) headers.set(DEVICE_SECRET_HEADER, secret)
  return new Request(AT, { headers })
}

function pageFor(secret: string, over: Record<string, string> = {}) {
  return {
    id: "01a05b39-f50c-7841-a154-33ae8bc93e0a",
    pageTypeSlug: "device-secret",
    slug: "alan-a1b2c3d4-e5f6-47b8-9c0d-1e2f3a4b5c6d",
    userId: ALAN_ACCOUNT,
    deviceId: A_DEVICE,
    secretHash: hashDeviceSecret(secret),
    ...over,
  }
}

function storeHolding(rows: readonly Record<string, unknown>[]): Fetcher {
  return async (_url, init) => {
    const asked = JSON.parse(String(init.body)) as { where?: Record<string, { is?: unknown }> }
    const held = rows.filter((row) => {
      for (const [key, wanted] of Object.entries(asked.where ?? {})) {
        if (row[key] !== wanted.is) return false
      }
      return true
    })
    return new Response(JSON.stringify({ rows: held }), {
      headers: { "content-type": "application/json" },
    })
  }
}

const storeUnreachable: Fetcher = async () => {
  throw new Error("Unable to connect. Is the computer able to access the url?")
}

test("a secret the store matches reads to that account", async () => {
  const secret = generateDeviceSecret()
  const held = await resolveDeviceSecretContext(
    presenting(secret),
    storeHolding([pageFor(secret)]),
    noNap
  )
  expect(held).toEqual({ outcome: "admitted", userId: ALAN_ACCOUNT })
})

test("a secret the store matches to nothing is refused", async () => {
  const held = await resolveDeviceSecretContext(
    presenting(generateDeviceSecret()),
    storeHolding([pageFor(generateDeviceSecret())]),
    noNap
  )
  expect(held).toEqual({ outcome: "refused" })
})

test("a revoked secret is refused rather than read as unread", async () => {
  const secret = generateDeviceSecret()
  const held = await resolveDeviceSecretContext(
    presenting(secret),
    storeHolding([pageFor(secret, { revokedAt: "2026-08-31T00:00:00.000Z" })]),
    noNap
  )
  expect(held).toEqual({ outcome: "refused" })
})

test("a store that never answers is unread rather than refused", async () => {
  const held = await resolveDeviceSecretContext(
    presenting(generateDeviceSecret()),
    storeUnreachable,
    noNap
  )
  expect(held).toEqual({ outcome: "unread" })
})

test("a store that never answers admits nobody", async () => {
  const secret = generateDeviceSecret()
  const held = await resolveDeviceSecretContext(presenting(secret), storeUnreachable, noNap)
  expect(held.outcome).not.toBe("admitted")
})

test("a caller presenting nothing is refused without the store being asked", async () => {
  const held = await resolveDeviceSecretContext(presenting(null), storeUnreachable, noNap)
  expect(held).toEqual({ outcome: "refused" })
})

test("the admission read answers the outcome the context carries", async () => {
  const secret = generateDeviceSecret()
  const admitted = await readDeviceSecretAdmission(
    presenting(secret),
    storeHolding([pageFor(secret)]),
    noNap
  )
  expect(admitted).toBe("admitted")
  const refused = await readDeviceSecretAdmission(presenting(secret), storeHolding([]), noNap)
  expect(refused).toBe("refused")
  const unread = await readDeviceSecretAdmission(presenting(secret), storeUnreachable, noNap)
  expect(unread).toBe("unread")
})
