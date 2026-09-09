import { describe, expect, test } from "bun:test"
import type { SecretPage } from "../placing/secret-placing.module.code.ts"
import { flagValue, flagValues, heldBy, labelsOf, secretYaml } from "./secret-saying.module.code.ts"

function page(slug: string, ...pairs: readonly (readonly [string, string])[]): SecretPage {
  return {
    slug,
    relPath: `service-system/secrets/pages/${slug}.secret.ts`,
    placements: pairs.map(([resourceName, resourceKey]) => ({ resourceName, resourceKey })),
  }
}

describe("heldBy", () => {
  test("gathers every page placing a value in the resource", () => {
    const held = heldBy(
      [
        page("gotrue-secrets-database-url", ["gotrue-secrets", "DATABASE_URL"]),
        page("gotrue-secrets-gotrue-jwt-keys", ["gotrue-secrets", "GOTRUE_JWT_KEYS"]),
        page("tailnet-egress-auth", ["tailnet-egress-auth", "TS_AUTHKEY"]),
      ],
      "gotrue-secrets"
    )
    expect(held.map((one) => one.key)).toEqual(["DATABASE_URL", "GOTRUE_JWT_KEYS"])
  })

  test("one page reaching two resources answers under the key each one asked for", () => {
    const shared = page(
      "cloudflare-api-token",
      ["cloudflare-api-token", "api-token"],
      ["pipeline-engine-secrets", "CLOUDFLARE_API_TOKEN"]
    )
    expect(heldBy([shared], "cloudflare-api-token").map((one) => one.key)).toEqual(["api-token"])
    expect(heldBy([shared], "pipeline-engine-secrets").map((one) => one.key)).toEqual([
      "CLOUDFLARE_API_TOKEN",
    ])
  })

  test("the keys come back in one order however the pages arrive", () => {
    const one = page("b", ["r", "BBB"])
    const two = page("a", ["r", "AAA"])
    expect(heldBy([one, two], "r").map((held) => held.key)).toEqual(["AAA", "BBB"])
    expect(heldBy([two, one], "r").map((held) => held.key)).toEqual(["AAA", "BBB"])
  })

  test("a resource no page names gathers nothing", () => {
    expect(heldBy([page("a", ["r", "K"])], "other")).toEqual([])
  })
})

describe("secretYaml", () => {
  test("says an Opaque Secret under the resource's own name", () => {
    expect(secretYaml({ DATABASE_URL: "postgres://x" }, "gotrue-secrets", "gotrue")).toBe(
      [
        "apiVersion: v1",
        "kind: Secret",
        "metadata:",
        "  name: gotrue-secrets",
        "  namespace: gotrue",
        "type: Opaque",
        "stringData:",
        "  DATABASE_URL: postgres://x",
        "",
      ].join("\n")
    )
  })

  test("says the type it is given, a cluster refusing a type changed under it", () => {
    const said = secretYaml(
      { "tls.crt": "a", "tls.key": "b" },
      "pgbouncer-tls",
      "pgbouncer",
      "kubernetes.io/tls"
    )
    expect(said).toContain("type: kubernetes.io/tls")
    expect(said).not.toContain("Opaque")
  })

  test("says the labels it is given, an apply taking off any it does not say", () => {
    const said = secretYaml({ password: "x" }, "postgres-cnpg-superuser", "postgres", "Opaque", {
      "cnpg.io/reload": "true",
    })
    expect(said).toContain('  labels:\n    cnpg.io/reload: "true"')
  })

  test("says no labels key at all where it is given none", () => {
    expect(secretYaml({ K: "v" }, "r", "n")).not.toContain("labels")
  })
})

describe("labelsOf", () => {
  test("reads a name and a value out of each entry", () => {
    expect(labelsOf(["a=1", "cnpg.io/reload=true"])).toEqual({
      a: "1",
      "cnpg.io/reload": "true",
    })
  })

  test("keeps every `=` past the first, a value holding one", () => {
    expect(labelsOf(["a=1=2"])).toEqual({ a: "1=2" })
  })

  test("refuses an entry with no name, rather than labelling with an empty one", () => {
    expect(() => labelsOf(["=1"])).toThrow()
  })

  test("refuses an entry that is no pair, rather than passing it over", () => {
    expect(() => labelsOf(["a"])).toThrow()
  })
})

describe("flagValue", () => {
  test("reads the word after a flag", () => {
    expect(flagValue(["--resource", "gotrue-secrets"], "--resource")).toBe("gotrue-secrets")
  })

  test("a flag followed by another flag names nothing", () => {
    expect(flagValue(["--resource", "--namespace"], "--resource")).toBeUndefined()
  })

  test("a flag that is not there names nothing", () => {
    expect(flagValue(["--namespace", "gotrue"], "--resource")).toBeUndefined()
  })
})

describe("flagValues", () => {
  test("reads every word a flag said more than once names", () => {
    expect(flagValues(["--label", "a=1", "--label", "b=2"], "--label")).toEqual(["a=1", "b=2"])
  })

  test("a flag that is not there names nothing", () => {
    expect(flagValues(["--resource", "r"], "--label")).toEqual([])
  })
})
