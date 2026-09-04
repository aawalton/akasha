import { afterAll, expect, test } from "bun:test"
import { chmodSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { readingIn } from "@akasha/indexes"
import type { Child, Reading } from "@akasha/indexes/shape"
import { listedFiled, pageFiled } from "@akasha/indexes/testing"
import {
  accountBesideIn,
  accountPathIn,
  accountSecretPathIn,
  accountStateIn,
  accountUuidsIn,
  accountValuesIn,
  aliasIndexesIn,
  credentialFrom,
  credentialIn,
  everyAccountSlugIn,
  everyAccountStateIn,
  everyCredentialIn,
  lastWindowTriggerAcross,
  rescuedIn,
  type SecretsRead,
  stateFrom,
} from "./claude-account-reading.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const TYPE_PAGE = "akasha/agents/claude-accounts/claude-account.page-type.ts"

const PAGES_AT = "akasha/agents/claude-accounts/pages"

const ACCESS_FAKE = "fake-access-token-for-a-test"

const REFRESH_FAKE = "fake-refresh-token-for-a-test"

const RESCUED_ACCESS_FAKE = "fake-rescued-access-token"

const RESCUED_REFRESH_FAKE = "fake-rescued-refresh-token"

const EXPIRES_AT = "2026-09-02T18:00:00.000Z"

const EXPIRES_MS = Date.parse(EXPIRES_AT)

const secretsFake: SecretsRead = () =>
  new Map([
    ["access-token", ACCESS_FAKE],
    ["refresh-token", REFRESH_FAKE],
  ])

const noSecrets: SecretsRead = () => null

type Held = Record<string, unknown>

function pageAt(slug: string): string {
  return `${PAGES_AT}/${slug}/${slug}.claude-account.ts`
}

function bodied(name: string, held: Held): string {
  return `export const ${name} = ${JSON.stringify(held, null, 2)} as const\n`
}

function idFor(slug: string): string {
  return `01a0632e-0000-7000-8000-00000000000${slug.length}`
}

function accountWritten(root: string, slug: string, stated: Held, beside: Held | null): undefined {
  const at = pageAt(slug)
  mkdirSync(join(root, `${PAGES_AT}/${slug}`), { recursive: true })
  writeFileSync(
    join(root, at),
    bodied(slug, { id: idFor(slug), pageTypeSlug: "claude-account", slug, ...stated })
  )
  if (beside !== null) {
    writeFileSync(join(root, at.replace(/\.ts$/, ".uncommitted.ts")), bodied("held", beside))
  }
  listedFiled(root, "claude-account", slug, [{ path: at, id: idFor(slug) }])
}

function worldMade(): string {
  const root = scratch.rootFor("claude-account-reading-")
  pageFiled(root, ACCOUNT_TYPE, TYPE_PAGE)
  accountWritten(
    root,
    "aine",
    {
      email: "aine@example.test",
      aliasIndex: 3,
      subscriptionType: "max",
      rateLimitTier: "default",
      scopes: ["user:inference"],
      accountUuid: "uuid-aine",
    },
    {
      accessTokenExpiresAt: EXPIRES_AT,
      fiveHourPercentUsed: 12,
      sevenDayPercentUsed: 40,
      sevenDayResetsAt: "2026-09-05T00:00:00.000Z",
      lastWindowTriggerAt: "2026-09-01T08:00:00.000Z",
      retryAllowedAt: "2026-09-02T19:00:00.000Z",
      subscriptionDisabledReason: "withdrawn upstream",
    }
  )
  accountWritten(
    root,
    "ctw",
    { email: "ctw@example.test", aliasIndex: 1, accountUuid: "uuid-ctw" },
    {
      accessTokenExpiresAt: "2026-09-03T00:00:00.000Z",
      lastWindowTriggerAt: "2026-09-01T20:00:00.000Z",
    }
  )
  accountWritten(root, "aow", { email: "aow@example.test", aliasIndex: 2 }, null)
  return root
}

function counting(root: string): { readonly reading: Reading; readonly seen: string[] } {
  const real = readingIn(root)
  const seen: string[] = []
  const reading: Reading = {
    holds: (at: string): boolean => {
      seen.push(`holds ${at}`)
      return real.holds(at)
    },
    listing: (at: string): readonly Child[] => {
      seen.push(`listing ${at}`)
      return real.listing(at)
    },
    lines: (at: string): readonly string[] => {
      seen.push(`lines ${at}`)
      return real.lines(at)
    },
  }
  return { reading, seen }
}

test("one account is read by its slug", () => {
  const root = worldMade()
  expect(accountPathIn(root, "aine")).toBe(pageAt("aine"))
  expect(accountValuesIn(root, "aine")?.["email"]).toBe("aine@example.test")
  expect(accountSecretPathIn(root, "aine")).toBe(`${PAGES_AT}/aine/aine.claude-account.sops.yaml`)
  const state = accountStateIn(root, "aine")
  expect(state?.slug).toBe("aine")
  expect(state?.fiveHourPercentUsed).toBe(12)
  expect(state?.sevenDayPercentUsed).toBe(40)
  expect(state?.subscriptionType).toBe("max")
  expect(state?.subscriptionDisabledReason).toBe("withdrawn upstream")
  expect(state?.retryAllowedAtMs).toBe(Date.parse("2026-09-02T19:00:00.000Z"))
  expect(state?.accessTokenExpiresAtMs).toBe(EXPIRES_MS)
})

test("an account with no file beside its page carries no readings", () => {
  const root = worldMade()
  expect(accountBesideIn(root, "aow")).toEqual({})
  expect(accountStateIn(root, "aow")?.fiveHourPercentUsed).toBe(0)
  expect(accountStateIn(root, "aow")?.accessTokenExpiresAtMs).toBe(null)
})

test("an account no page is filed for is answered as absent", () => {
  const root = worldMade()
  expect(accountPathIn(root, "nobody")).toBe(null)
  expect(accountValuesIn(root, "nobody")).toBe(null)
  expect(accountBesideIn(root, "nobody")).toBe(null)
  expect(accountStateIn(root, "nobody")).toBe(null)
  expect(accountSecretPathIn(root, "nobody")).toBe(null)
  const held = credentialIn(root, "nobody", secretsFake)
  expect(held.kind).toBe("absent")
  expect(held.kind === "absent" ? held.why : "").toContain("no page is filed for `nobody`")
})

test("a credential is read off the page and the sops file beside it", () => {
  const root = worldMade()
  const held = credentialIn(root, "aine", secretsFake)
  expect(held.kind).toBe("read")
  if (held.kind !== "read") return
  expect(held.credential.accessToken).toBe(ACCESS_FAKE)
  expect(held.credential.refreshToken).toBe(REFRESH_FAKE)
  expect(held.credential.accessTokenExpiresAtMs).toBe(EXPIRES_MS)
  expect(held.credential.scopes).toEqual(["user:inference"])
  expect(held.credential.rateLimitTier).toBe("default")
  expect(held.credential.subscriptionDisabledReason).toBe("withdrawn upstream")
})

test("an account naming no sops file is answered as absent", () => {
  const root = worldMade()
  const held = credentialIn(root, "aine", noSecrets)
  expect(held.kind).toBe("absent")
  expect(held.kind === "absent" ? held.why : "").toContain("names no sops file")
})

test("a sops file that will not decrypt is answered as absent", () => {
  const root = worldMade()
  const held = credentialIn(root, "aine", () => {
    throw new Error("no age key reached the machine")
  })
  expect(held.kind).toBe("absent")
  expect(held.kind === "absent" ? held.why : "").toContain("no age key reached the machine")
})

test("an account with no readable expiry beside it is answered as absent", () => {
  const held = credentialFrom("aine", { slug: "aine" }, {}, secretsFake("", ""))
  expect(held.kind).toBe("absent")
  expect(held.kind === "absent" ? held.why : "").toContain("accessTokenExpiresAt")
})

test("a rescued pair expiring later than the committed pair is preferred", () => {
  const beside = {
    accessTokenExpiresAt: EXPIRES_AT,
    rescuedCredential: {
      accessToken: RESCUED_ACCESS_FAKE,
      refreshToken: RESCUED_REFRESH_FAKE,
      expiresAtMs: EXPIRES_MS + 60_000,
    },
  }
  expect(rescuedIn(beside)?.accessTokenExpiresAtMs).toBe(EXPIRES_MS + 60_000)
  const held = credentialFrom("aine", { slug: "aine" }, beside, secretsFake("", ""))
  expect(held.kind).toBe("read")
  if (held.kind !== "read") return
  expect(held.credential.accessToken).toBe(RESCUED_ACCESS_FAKE)
  expect(held.credential.refreshToken).toBe(RESCUED_REFRESH_FAKE)
  expect(held.credential.accessTokenExpiresAtMs).toBe(EXPIRES_MS + 60_000)
})

test("a rescued pair expiring no later than the committed pair is left aside", () => {
  const beside = {
    accessTokenExpiresAt: EXPIRES_AT,
    rescuedCredential: {
      accessToken: RESCUED_ACCESS_FAKE,
      refreshToken: RESCUED_REFRESH_FAKE,
      expiresAtMs: EXPIRES_MS,
    },
  }
  const held = credentialFrom("aine", { slug: "aine" }, beside, secretsFake("", ""))
  expect(held.kind).toBe("read")
  if (held.kind !== "read") return
  expect(held.credential.accessToken).toBe(ACCESS_FAKE)
  expect(held.credential.accessTokenExpiresAtMs).toBe(EXPIRES_MS)
})

test("a rescued pair spelled in kebab-case is read", () => {
  const said = rescuedIn({
    rescuedCredential: {
      "access-token": RESCUED_ACCESS_FAKE,
      "refresh-token": RESCUED_REFRESH_FAKE,
      "expires-at-ms": EXPIRES_MS,
    },
  })
  expect(said?.accessToken).toBe(RESCUED_ACCESS_FAKE)
  expect(said?.refreshToken).toBe(RESCUED_REFRESH_FAKE)
})

test("a rescued pair missing a token is read as none", () => {
  expect(rescuedIn({ rescuedCredential: { accessToken: RESCUED_ACCESS_FAKE } })).toBe(null)
  expect(rescuedIn({ rescuedCredential: "not an object" })).toBe(null)
  expect(rescuedIn({})).toBe(null)
  expect(rescuedIn(null)).toBe(null)
})

test("the fleet is read as every account filed", () => {
  const root = worldMade()
  expect(everyAccountSlugIn(root)).toEqual(["aine", "aow", "ctw"])
  const states = everyAccountStateIn(root)
  expect([...states.keys()]).toEqual(["aine", "aow", "ctw"])
  expect(states.get("ctw")?.accessTokenExpiresAtMs).toBe(Date.parse("2026-09-03T00:00:00.000Z"))
  expect(lastWindowTriggerAcross(states.values())).toBe(Date.parse("2026-09-01T20:00:00.000Z"))
  expect([...aliasIndexesIn(root)]).toEqual([
    ["aine", 3],
    ["aow", 2],
    ["ctw", 1],
  ])
  expect([...accountUuidsIn(root)]).toEqual([
    ["aine", "uuid-aine"],
    ["ctw", "uuid-ctw"],
  ])
  const credentials = everyCredentialIn(root, secretsFake)
  expect([...credentials.keys()]).toEqual(["aine", "aow", "ctw"])
  expect(credentials.get("aow")?.kind).toBe("absent")
})

test("a root filing no claude-account index is refused rather than read as an empty fleet", () => {
  const root = scratch.rootFor("claude-account-reading-bare-")
  expect(() => everyAccountSlugIn(root)).toThrow()
  expect(() => accountPathIn(root, "aine")).toThrow()
})

test("reading one account lists no directory of the fleet", () => {
  const root = worldMade()
  const one = counting(root)
  expect(accountPathIn(one.reading, "aine")).toBe(pageAt("aine"))
  expect(one.seen.filter((said) => said.startsWith("listing "))).toEqual([])
  expect(one.seen.filter((said) => said.startsWith("lines "))).toEqual([
    `lines identity/page/id/${ACCOUNT_TYPE}.jsonl`,
    "lines identity/claude-account/slug/aine.jsonl",
  ])
  const two = counting(root)
  expect(everyAccountSlugIn(two.reading)).toEqual(["aine", "aow", "ctw"])
  expect(two.seen.filter((said) => said.startsWith("listing "))).toEqual([
    "listing identity/claude-account/slug",
  ])
})

test("reading one account opens no other account's page", () => {
  const root = worldMade()
  for (const slug of ["aow", "ctw"]) {
    chmodSync(join(root, pageAt(slug)), 0o000)
  }
  expect(() => everyAccountStateIn(root)).toThrow()
  const state = accountStateIn(root, "aine")
  expect(state?.sevenDayPercentUsed).toBe(40)
  const held = credentialIn(root, "aine", secretsFake)
  expect(held.kind).toBe("read")
  for (const slug of ["aow", "ctw"]) {
    chmodSync(join(root, pageAt(slug)), 0o644)
  }
})

test("what an account states and what is observed of it are told apart", () => {
  const state = stateFrom("aine", { subscriptionType: "max" }, { subscriptionType: "pro" })
  expect(state.subscriptionType).toBe("max")
})
