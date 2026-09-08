import { describe, expect, test } from "bun:test"
import { z } from "zod"
import {
  appsResponseSchema,
  buildAscJwt,
  buildBetaDetailResponseSchema,
  buildsResponseSchema,
  buildVersionsResponseSchema,
  pickAppId,
  pickInternalBuildState,
  pickLatestBuild,
  pickMaxBuildVersion,
} from "./asc-client.module.code.ts"

async function generateEcPem(): Promise<{ pem: string; publicKey: CryptoKey }> {
  const pair = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, [
    "sign",
    "verify",
  ])
  const pkcs8 = await crypto.subtle.exportKey("pkcs8", pair.privateKey)
  const b64 = Buffer.from(new Uint8Array(pkcs8)).toString("base64")
  const lines: string[] = []
  for (let i = 0; i < b64.length; i += 64) lines.push(b64.slice(i, i + 64))
  const pem = `-----BEGIN PRIVATE KEY-----\n${lines.join("\n")}\n-----END PRIVATE KEY-----\n`
  return { pem, publicKey: pair.publicKey }
}

function decodeSegment(seg: string): Record<string, unknown> {
  const b64 = seg.replaceAll("-", "+").replaceAll("_", "/")
  return z
    .record(z.string(), z.unknown())
    .parse(JSON.parse(Buffer.from(b64, "base64").toString("utf8")))
}

describe("buildAscJwt", () => {
  test("mints a verifiable ES256 JWT with the ASC header/claims", async () => {
    const { pem, publicKey } = await generateEcPem()
    const now = 1_700_000_000
    const jwt = await buildAscJwt({ pem, keyId: "KEY123", issuerId: "ISSUER-9", nowSeconds: now })

    const [header, payload, signature] = jwt.split(".")
    expect(header).toBeDefined()
    expect(payload).toBeDefined()
    expect(signature).toBeDefined()

    expect(decodeSegment(header ?? "")).toEqual({ alg: "ES256", kid: "KEY123", typ: "JWT" })
    expect(decodeSegment(payload ?? "")).toEqual({
      iss: "ISSUER-9",
      iat: now,
      exp: now + 900,
      aud: "appstoreconnect-v1",
    })

    const sigBytes = Uint8Array.from(
      Buffer.from((signature ?? "").replaceAll("-", "+").replaceAll("_", "/"), "base64")
    )
    const ok = await crypto.subtle.verify(
      { name: "ECDSA", hash: "SHA-256" },
      publicKey,
      sigBytes,
      new TextEncoder().encode(`${header}.${payload}`)
    )
    expect(ok).toBe(true)
  })

  test("rejects an empty / non-PEM key", async () => {
    await expect(
      buildAscJwt({ pem: "   ", keyId: "K", issuerId: "I", nowSeconds: 1 })
    ).rejects.toThrow(/empty or not PEM/)
  })
})

describe("pickAppId (apps response, passthrough)", () => {
  test("returns the first app id and preserves unknown upstream keys", () => {
    const parsed = appsResponseSchema.parse({
      data: [{ id: "6785480749", type: "apps", attributes: { name: "Alan Walton" } }],
      links: { self: "https://api.appstoreconnect.apple.com/v1/apps" },
    })
    expect(pickAppId(parsed)).toBe("6785480749")
    expect(parsed.data[0]).toHaveProperty("type", "apps")
  })

  test("returns null when the bundle filter matched nothing", () => {
    expect(pickAppId(appsResponseSchema.parse({ data: [] }))).toBeNull()
  })
})

describe("pickLatestBuild (builds response, passthrough)", () => {
  test("extracts id + version + processingState from the latest build", () => {
    const parsed = buildsResponseSchema.parse({
      data: [
        {
          id: "build-uuid-3",
          type: "builds",
          attributes: {
            version: "3",
            processingState: "VALID",
            uploadedDate: "2026-07-02T09:23:18-07:00",
            expired: false,
          },
        },
      ],
    })
    expect(pickLatestBuild(parsed)).toEqual({
      id: "build-uuid-3",
      version: "3",
      processingState: "VALID",
      uploadedDate: "2026-07-02T09:23:18-07:00",
    })
  })

  test("returns null when no build has been uploaded", () => {
    expect(pickLatestBuild(buildsResponseSchema.parse({ data: [] }))).toBeNull()
  })

  test("returns null when the latest build carries no attributes", () => {
    const parsed = buildsResponseSchema.parse({ data: [{ id: "b1" }] })
    expect(pickLatestBuild(parsed)).toBeNull()
  })
})

describe("pickInternalBuildState (tester visibility, #14174)", () => {
  test("extracts internalBuildState from buildBetaDetail", () => {
    const parsed = buildBetaDetailResponseSchema.parse({
      data: {
        id: "detail-1",
        type: "buildBetaDetails",
        attributes: { internalBuildState: "IN_BETA_TESTING", externalBuildState: "EXPIRED" },
      },
    })
    expect(pickInternalBuildState(parsed)).toBe("IN_BETA_TESTING")
  })

  test("null when attributes / state are absent", () => {
    expect(pickInternalBuildState(buildBetaDetailResponseSchema.parse({ data: {} }))).toBeNull()
    expect(
      pickInternalBuildState(buildBetaDetailResponseSchema.parse({ data: { attributes: {} } }))
    ).toBeNull()
  })
})

describe("pickMaxBuildVersion (auto-increment floor, #14174)", () => {
  test("parses the SPARSE fields[builds]=version shape — attributes carry ONLY version", () => {
    const parsed = buildVersionsResponseSchema.parse({
      data: [
        { id: "b-new", type: "builds", attributes: { version: "1" } },
        { id: "b-hi", type: "builds", attributes: { version: "57" } },
        { id: "b-mid", type: "builds", attributes: { version: "12" } },
      ],
    })
    expect(pickMaxBuildVersion(parsed)).toBe(57)
  })

  test("no builds yet → floor 0 (first claim becomes max(0, ascFloor)+1)", () => {
    expect(pickMaxBuildVersion(buildVersionsResponseSchema.parse({ data: [] }))).toBe(0)
  })

  test("skips builds with missing / non-numeric versions", () => {
    const parsed = buildVersionsResponseSchema.parse({
      data: [
        { id: "b1" },
        { id: "b2", attributes: { version: "beta" } },
        { id: "b3", attributes: { version: "4" } },
      ],
    })
    expect(pickMaxBuildVersion(parsed)).toBe(4)
  })
})
