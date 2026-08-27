import { afterAll, describe, expect, it } from "bun:test"
import { seaweedFsConfigFromEnv } from "./config"
import { createFetchStub } from "./fetch-stub"
import { MULTIPART_PART_SIZE_BYTES, MULTIPART_THRESHOLD_BYTES } from "./multipart"
import { seaweedFSObjectStoreFromEnv } from "./object-store"
import { seaweedFsMissingEnvVars } from "./config"
import { signS3Request } from "./sigv4"

const MiB = 1024 * 1024
const missing = seaweedFsMissingEnvVars()
if (missing.length > 0) {
  console.log(`[smoke skip] object-store multipart: missing ${missing.join(", ")}`)
}

const TEST_KEY = `_smoke-multipart-15756/${globalThis.crypto.randomUUID()}.bin`

async function deleteTestObject(): Promise<void> {
  const config = seaweedFsConfigFromEnv()
  if (!config) return
  const { s3Endpoint, bucket, accessKey, secretKey, region } = config
  const encoded = TEST_KEY.split("/")
    .map((s) => encodeURIComponent(s))
    .join("/")
  const url = `${s3Endpoint}/${bucket}/${encoded}`
  const headers = signS3Request({
    method: "DELETE",
    url,
    body: "",
    accessKey,
    secretKey,
    region: region ?? "us-east-1",
  })
  await fetch(url, { method: "DELETE", headers }).catch(() => {})
}

describe.skipIf(missing.length > 0)("SeaweedFS multipart PUT (live)", () => {
  afterAll(deleteTestObject)

  it("splits a >threshold PUT into bounded parts and reassembles it correctly on the gateway", async () => {
    const store = seaweedFSObjectStoreFromEnv()
    expect(store).not.toBeNull()
    if (!store) return

    const size = MULTIPART_THRESHOLD_BYTES + 4 * MiB
    const body = new Uint8Array(size)
    body.fill(0x41, 0, 8 * MiB)
    body.fill(0x42, 8 * MiB, 16 * MiB)
    body.fill(0x43, 16 * MiB, size)

    const originalFetch = globalThis.fetch
    const partBodySizes: number[] = []
    globalThis.fetch = createFetchStub((input, init) => {
      const b = init?.body
      if (b instanceof Uint8Array) partBodySizes.push(b.byteLength)
      return originalFetch(input, init)
    })
    try {
      await store.put(TEST_KEY, body)
    } finally {
      globalThis.fetch = originalFetch
    }

    expect(partBodySizes.length).toBeGreaterThanOrEqual(2)
    expect(Math.max(...partBodySizes)).toBeLessThanOrEqual(MULTIPART_PART_SIZE_BYTES)
    expect(partBodySizes.some((n) => n === size)).toBe(false)

    const head = await store.head(TEST_KEY)
    expect(head?.size).toBe(size)

    const got = await store.get(TEST_KEY)
    expect(got.length).toBe(size)
    expect(got[0]).toBe(0x41)
    expect(got[8 * MiB]).toBe(0x42)
    expect(got[16 * MiB]).toBe(0x43)
    expect(got[size - 1]).toBe(0x43)
  }, 120_000)
})
