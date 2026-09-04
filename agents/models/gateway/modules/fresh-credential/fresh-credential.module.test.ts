import { expect, test } from "bun:test"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import {
  behindLine,
  expiredLine,
  type FreshCredentialSeams,
  freshCredentialIn,
} from "./fresh-credential.module.code.ts"

const PREFIX = "[oauth-proxy]"

const NOW = 1_700_000_000_000

const BUFFER_MS = 5 * 60 * 1000

const ACCOUNT = "one"

function credentialAt(expiresAt: number): OAuthCredential {
  return {
    account: ACCOUNT,
    accessToken: "invented-access",
    refreshToken: "invented-refresh",
    expiresAt,
    scopes: ["user:inference"],
    subscriptionType: "max",
    rateLimitTier: null,
  }
}

type Rig = {
  readonly seams: FreshCredentialSeams
  readonly warnings: readonly string[]
  readonly asked: readonly (readonly [string, string | undefined])[]
  readonly clocks: () => number
}

function rigged(held: OAuthCredential | null, now: number = NOW): Rig {
  const warnings: string[] = []
  const asked: (readonly [string, string | undefined])[] = []
  let clocks = 0
  return {
    seams: {
      logPrefix: PREFIX,
      credentialByAccount: async (account, logPrefix) => {
        asked.push([account, logPrefix])
        return held
      },
      now: () => {
        clocks += 1
        return now
      },
      warned: (line) => {
        warnings.push(line)
      },
    },
    warnings,
    asked,
    clocks: () => clocks,
  }
}

test("a credential is asked of the read handed in by the account named", async () => {
  const rig = rigged(credentialAt(NOW + BUFFER_MS * 2))
  await freshCredentialIn(rig.seams)(ACCOUNT)
  expect(rig.asked).toEqual([[ACCOUNT, PREFIX]])
})

test("an account the read holds no credential for is answered as no credential", async () => {
  const rig = rigged(null)
  expect(await freshCredentialIn(rig.seams)(ACCOUNT)).toBeNull()
  expect(rig.warnings).toEqual([])
})

test("a credential expiring beyond the refresh buffer is answered and written about nowhere", async () => {
  const held = credentialAt(NOW + BUFFER_MS * 2)
  const rig = rigged(held)
  expect(await freshCredentialIn(rig.seams)(ACCOUNT)).toBe(held)
  expect(rig.warnings).toEqual([])
})

test("a credential whose expiry is at the moment read is answered as no credential", async () => {
  const rig = rigged(credentialAt(NOW))
  expect(await freshCredentialIn(rig.seams)(ACCOUNT)).toBeNull()
})

test("a credential whose expiry is behind the moment read is answered as no credential", async () => {
  const rig = rigged(credentialAt(NOW - 1))
  expect(await freshCredentialIn(rig.seams)(ACCOUNT)).toBeNull()
})

test("an expired credential is written about on the warning seam", async () => {
  const rig = rigged(credentialAt(NOW - 1))
  await freshCredentialIn(rig.seams)(ACCOUNT)
  expect(rig.warnings).toEqual([expiredLine(PREFIX, ACCOUNT, NOW - 1)])
})

test("a credential expiring inside the refresh buffer is answered all the same", async () => {
  const held = credentialAt(NOW + BUFFER_MS - 1)
  const rig = rigged(held)
  expect(await freshCredentialIn(rig.seams)(ACCOUNT)).toBe(held)
})

test("a credential expiring inside the refresh buffer is written about on the warning seam", async () => {
  const at = NOW + BUFFER_MS - 1
  const rig = rigged(credentialAt(at))
  await freshCredentialIn(rig.seams)(ACCOUNT)
  expect(rig.warnings).toEqual([behindLine(PREFIX, ACCOUNT, at)])
})

test("a credential expiring exactly at the edge of the refresh buffer is written about nowhere", async () => {
  const rig = rigged(credentialAt(NOW + BUFFER_MS))
  await freshCredentialIn(rig.seams)(ACCOUNT)
  expect(rig.warnings).toEqual([])
})

test("the moment an expiry is weighed against is read once for one ask", async () => {
  const rig = rigged(credentialAt(NOW + BUFFER_MS * 2))
  await freshCredentialIn(rig.seams)(ACCOUNT)
  expect(rig.clocks()).toBe(1)
})

test("the clock a credential absent is met with is read never", async () => {
  const rig = rigged(null)
  await freshCredentialIn(rig.seams)(ACCOUNT)
  expect(rig.clocks()).toBe(0)
})

test("a line names the account and the moment that account's credential expires at", () => {
  const at = NOW + 1000
  expect(expiredLine(PREFIX, ACCOUNT, at)).toContain(ACCOUNT)
  expect(expiredLine(PREFIX, ACCOUNT, at)).toContain(new Date(at).toISOString())
  expect(behindLine(PREFIX, ACCOUNT, at)).toContain(ACCOUNT)
  expect(behindLine(PREFIX, ACCOUNT, at)).toContain(new Date(at).toISOString())
})

test("no token value reaches a line written here", async () => {
  const held = credentialAt(NOW + 1)
  const rig = rigged(held)
  await freshCredentialIn(rig.seams)(ACCOUNT)
  expect(rig.warnings.length).toBe(1)
  expect(rig.warnings[0]?.includes(held.accessToken)).toBe(false)
  expect(rig.warnings[0]?.includes(held.refreshToken)).toBe(false)
})

test("every line written here opens with the log prefix", async () => {
  const rig = rigged(credentialAt(NOW - 1))
  await freshCredentialIn(rig.seams)(ACCOUNT)
  expect(rig.warnings[0]?.startsWith(PREFIX)).toBe(true)
})
