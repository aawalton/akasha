import { expect, test } from "bun:test"
import type { Fetcher } from "@akasha/pages-system-service/calling"
import {
  DEVICE_SECRET_PREFIX,
  hasDeviceSecretShape,
} from "../device-secret-shape/device-secret-shape.module.code.ts"
import {
  noNap,
  overTheLiveStore,
  recordingFetcher,
} from "../person-enrolment/person-enrolment.module.test-fixtures.ts"
import {
  DEVICE_SECRET_PAGE_TYPE,
  deviceSecretBody,
  deviceSecretHashesEqual,
  deviceSecretPath,
  deviceSecretPresented,
  deviceSecretSlug,
  exportNameFor,
  generateDeviceSecret,
  hashDeviceSecret,
  pageIn,
  readPresentedDeviceSecret,
  uuidVersion7,
} from "./device-secret-keeping.module.code.ts"

const ALAN_ACCOUNT = "9ba554f7-cb18-48bb-a709-ec935a895ca7"

const A_DEVICE = "A1B2C3D4-E5F6-47B8-9C0D-1E2F3A4B5C6D"

const AN_IDENTIFIER = /^[A-Za-z][A-Za-z0-9]*$/

type Rows = Record<string, readonly Record<string, unknown>[]>

function storeLike(byType: Rows): Fetcher {
  return async (_url, init) => {
    const asked = JSON.parse(String(init.body)) as {
      pageTypeSlug: string
      where?: Record<string, { is?: unknown }>
    }
    const rows = (byType[asked.pageTypeSlug] ?? []).filter((value) => {
      for (const [key, test] of Object.entries(asked.where ?? {})) {
        if (value[key] !== test.is) return false
      }
      return true
    })
    return new Response(JSON.stringify({ rows }), {
      headers: { "content-type": "application/json" },
    })
  }
}

function pageFor(secret: string, over: Partial<Record<string, string>> = {}) {
  return {
    id: uuidVersion7(),
    pageTypeSlug: DEVICE_SECRET_PAGE_TYPE,
    slug: deviceSecretSlug("alan", A_DEVICE),
    userId: ALAN_ACCOUNT,
    deviceId: A_DEVICE,
    secretHash: hashDeviceSecret(secret),
    ...over,
  }
}

test("a minted secret carries the prefix and the shape", () => {
  const secret = generateDeviceSecret()
  expect(secret.startsWith(DEVICE_SECRET_PREFIX)).toBe(true)
  expect(hasDeviceSecretShape(secret)).toBe(true)
})

test("a header carrying nothing is read as absent", () => {
  expect(readPresentedDeviceSecret(null)).toEqual({ ok: false, reason: "absent" })
  expect(readPresentedDeviceSecret("")).toEqual({ ok: false, reason: "absent" })
})

test("a header carrying something of another shape is read as malformed", () => {
  expect(readPresentedDeviceSecret("not-a-device-secret")).toEqual({
    ok: false,
    reason: "malformed",
  })
})

test("a hash is sixty-four lower hex and the same secret hashes the same way", () => {
  const secret = generateDeviceSecret()
  expect(hashDeviceSecret(secret)).toMatch(/^[0-9a-f]{64}$/)
  expect(hashDeviceSecret(secret)).toBe(hashDeviceSecret(secret))
  expect(hashDeviceSecret(secret)).not.toBe(hashDeviceSecret(generateDeviceSecret()))
})

test("two hashes are equal only where they are the same hash", () => {
  const one = hashDeviceSecret("one")
  expect(deviceSecretHashesEqual(one, one)).toBe(true)
  expect(deviceSecretHashesEqual(one, hashDeviceSecret("two"))).toBe(false)
})

test("something that is no hash is equal to nothing", () => {
  expect(deviceSecretHashesEqual("short", "short")).toBe(false)
})

test("a slug names the person and the device in lower kebab", () => {
  expect(deviceSecretSlug("alan", A_DEVICE)).toBe("alan-a1b2c3d4-e5f6-47b8-9c0d-1e2f3a4b5c6d")
})

test("a slug becomes an export name that opens with a letter", () => {
  const name = exportNameFor(deviceSecretSlug("alan", A_DEVICE))
  expect(name).toBe("alanA1b2c3d4E5f647b89c0d1e2f3a4b5c6d")
  expect(name).toMatch(AN_IDENTIFIER)
})

test("a page stands at a path under the device secrets folder", () => {
  expect(deviceSecretPath("alan-a1b2")).toBe(
    "akasha/person-system/device-secrets/pages/alan-a1b2.device-secret.ts"
  )
})

test("a rendered body declares the page and names no secret", () => {
  const secret = generateDeviceSecret()
  const page = {
    id: "01a05b39-f50c-7841-a154-33ae8bc93e0a",
    slug: "alan-a1b2",
    userId: ALAN_ACCOUNT,
    deviceId: A_DEVICE,
    secretHash: hashDeviceSecret(secret),
    revokedAt: null,
  }
  const body = deviceSecretBody(page)
  expect(body).toContain('import type { DeviceSecret } from "../device-secret.page-type.ts"')
  expect(body).toContain("export const alanA1b2 = {")
  expect(body).toContain(`  secretHash: "${page.secretHash}",`)
  expect(body).toContain("} as const satisfies DeviceSecret")
  expect(body).not.toContain("revokedAt")
  expect(body).not.toContain(secret)
})

test("a rendered body states when the secret was revoked where it was", () => {
  const body = deviceSecretBody({
    id: "01a05b39-f50c-7841-a154-33ae8bc93e0a",
    slug: "alan-a1b2",
    userId: ALAN_ACCOUNT,
    deviceId: A_DEVICE,
    secretHash: hashDeviceSecret("one"),
    revokedAt: "2026-08-31T00:00:00.000Z",
  })
  expect(body).toContain('  revokedAt: "2026-08-31T00:00:00.000Z",')
})

test("a row missing the hash is read as no page", () => {
  expect(pageIn({ id: "one", slug: "two", userId: "three", deviceId: "four" })).toBeNull()
})

test("a caller presenting nothing is refused", async () => {
  const refused = await deviceSecretPresented(null, storeLike({}), noNap)
  expect(refused).toEqual({ outcome: "refused", why: "the device secret presented is absent" })
})

test("a caller presenting something of another shape is refused", async () => {
  const refused = await deviceSecretPresented("bearer-token", storeLike({}), noNap)
  expect(refused).toEqual({ outcome: "refused", why: "the device secret presented is malformed" })
})

test("a caller presenting a secret no page stands for is refused", async () => {
  const page = pageFor(generateDeviceSecret())
  const refused = await deviceSecretPresented(
    generateDeviceSecret(),
    storeLike({ [DEVICE_SECRET_PAGE_TYPE]: [page] }),
    noNap
  )
  expect(refused.outcome).toBe("refused")
  if (refused.outcome !== "refused") return
  expect(refused.why).toBe("no device secret stands for the secret presented")
})

test("a caller presenting a secret a page stands for is read to that account", async () => {
  const secret = generateDeviceSecret()
  const page = pageFor(secret)
  const read = await deviceSecretPresented(
    secret,
    storeLike({ [DEVICE_SECRET_PAGE_TYPE]: [page] }),
    noNap
  )
  expect(read).toEqual({
    outcome: "stands",
    userId: ALAN_ACCOUNT,
    slug: "alan-a1b2c3d4-e5f6-47b8-9c0d-1e2f3a4b5c6d",
  })
})

test("the page is asked for under the key the page carries", async () => {
  const secret = generateDeviceSecret()
  const recording = recordingFetcher()
  await deviceSecretPresented(secret, recording.fetcher, noNap)
  expect(recording.sent().pageTypeSlug).toBe(DEVICE_SECRET_PAGE_TYPE)
  expect(recording.sent().where).toEqual({ secretHash: { is: hashDeviceSecret(secret) } })
})

test("a caller presenting a revoked secret is refused", async () => {
  const secret = generateDeviceSecret()
  const page = pageFor(secret, { revokedAt: "2026-08-31T00:00:00.000Z" })
  const refused = await deviceSecretPresented(
    secret,
    storeLike({ [DEVICE_SECRET_PAGE_TYPE]: [page] }),
    noNap
  )
  expect(refused.outcome).toBe("refused")
  if (refused.outcome !== "refused") return
  expect(refused.why).toContain("was revoked at")
})

test("pages that went unread are told apart from pages that matched nothing", async () => {
  const fetcher: Fetcher = async () =>
    new Response(JSON.stringify({ refused: "the index is not there" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  const held = await deviceSecretPresented(generateDeviceSecret(), fetcher, noNap)
  expect(held.outcome).toBe("unread")
  if (held.outcome !== "unread") return
  expect(held.why).toContain("went unread")
})

test("a hash standing on two pages is read to neither", async () => {
  const secret = generateDeviceSecret()
  const rows = [pageFor(secret), pageFor(secret, { slug: "alan-another" })]
  const held = await deviceSecretPresented(
    secret,
    storeLike({ [DEVICE_SECRET_PAGE_TYPE]: rows }),
    noNap
  )
  expect(held.outcome).toBe("unread")
  if (held.outcome !== "unread") return
  expect(held.why).toContain("more than one device secret")
})

test("no refusal carries the secret that was presented", async () => {
  const secret = generateDeviceSecret()
  const refused = await deviceSecretPresented(secret, storeLike({}), noNap)
  expect(JSON.stringify(refused)).not.toContain(secret)
})

test("the store answers for the device secret page type rather than refusing", async () => {
  const held = await overTheLiveStore(async () =>
    deviceSecretPresented(generateDeviceSecret(), undefined, noNap)
  )
  expect(held.outcome).toBe("refused")
  if (held.outcome !== "refused") return
  expect(held.why).toBe("no device secret stands for the secret presented")
})
