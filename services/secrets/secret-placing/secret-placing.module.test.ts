import { describe, expect, test } from "bun:test"
import {
  DeployRefused,
  placedAt,
  placementsIn,
  type SecretPage,
} from "./secret-placing.module.code.ts"

function page(slug: string, ...pairs: readonly (readonly [string, string])[]): SecretPage {
  return {
    slug,
    relPath: `service-system/secrets/pages/${slug}.secret.ts`,
    placements: pairs.map(([resourceName, resourceKey]) => ({ resourceName, resourceKey })),
  }
}

describe("placementsIn", () => {
  test("reads every resource and key a page names", () => {
    const read = placementsIn({
      slug: "cloudflare-api-token",
      placements: [
        { resourceName: "cloudflare-api-token", resourceKey: "api-token" },
        { resourceName: "pipeline-engine-secrets", resourceKey: "CLOUDFLARE_API_TOKEN" },
      ],
    })
    expect(read).toEqual([
      { resourceName: "cloudflare-api-token", resourceKey: "api-token" },
      { resourceName: "pipeline-engine-secrets", resourceKey: "CLOUDFLARE_API_TOKEN" },
    ])
  })

  test("a page naming no placement reads as none", () => {
    expect(placementsIn({ slug: "orphan" })).toEqual([])
  })

  test("an entry missing either half is read past", () => {
    const read = placementsIn({
      placements: [
        { resourceName: "kept", resourceKey: "KEY" },
        { resourceName: "no-key" },
        { resourceKey: "NO_NAME" },
        "not a record",
      ],
    })
    expect(read).toEqual([{ resourceName: "kept", resourceKey: "KEY" }])
  })
})

describe("placedAt", () => {
  test("one value reaching two resources is one page", () => {
    const at = placedAt([
      page(
        "cloudflare-api-token",
        ["cloudflare-api-token", "api-token"],
        ["pipeline-engine-secrets", "CLOUDFLARE_API_TOKEN"]
      ),
    ])
    expect(at.size).toBe(2)
    expect(at.get(JSON.stringify(["cloudflare-api-token", "api-token"]))?.slug).toBe(
      "cloudflare-api-token"
    )
    expect(at.get(JSON.stringify(["pipeline-engine-secrets", "CLOUDFLARE_API_TOKEN"]))?.slug).toBe(
      "cloudflare-api-token"
    )
  })

  test("two pages placing a value in one resource at one key is refused", () => {
    expect(() =>
      placedAt([
        page("first", ["gotrue-secrets", "DATABASE_URL"]),
        page("second", ["gotrue-secrets", "DATABASE_URL"]),
      ])
    ).toThrow(DeployRefused)
  })

  test("one page naming a resource and key twice is refused too", () => {
    expect(() =>
      placedAt([
        page("doubled", ["gotrue-secrets", "DATABASE_URL"], ["gotrue-secrets", "DATABASE_URL"]),
      ])
    ).toThrow(/twice/)
  })

  test("two pages under one resource at different keys both place", () => {
    const at = placedAt([
      page("gotrue-secrets-database-url", ["gotrue-secrets", "DATABASE_URL"]),
      page("gotrue-secrets-gotrue-jwt-keys", ["gotrue-secrets", "GOTRUE_JWT_KEYS"]),
    ])
    expect(at.size).toBe(2)
  })

  test("a page naming no placement puts nothing anywhere", () => {
    expect(placedAt([page("empty")]).size).toBe(0)
  })
})
