import { describe, expect, test } from "bun:test"
import { mkdtempSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { OAuthCredential } from "../../../models/gateway/modules/oauth-types/oauth-types.module.code.ts"
import {
  CREDENTIAL_FILE_NAME,
  CREDENTIAL_FILE_SHAPE,
  credentialFileIn,
  credentialFileWritten,
  fileChanged,
} from "./claude-account-credential-file.module.code.ts"

function whereverIn(): string {
  return mkdtempSync(join(tmpdir(), "credential-file-"))
}

function fileWritten(dir: string, body: string): string {
  const path = join(dir, CREDENTIAL_FILE_NAME)
  writeFileSync(path, body)
  return path
}

function bodyOf(oauth: Record<string, unknown>, beside: Record<string, unknown> = {}): string {
  return JSON.stringify({ ...beside, claudeAiOauth: oauth })
}

const WHOLE = {
  accessToken: "at-1",
  refreshToken: "rt-1",
  expiresAt: 1_800_000_000_000,
}

function credentialOf(over: Partial<OAuthCredential> = {}): OAuthCredential {
  return {
    account: "one",
    accessToken: "at-1",
    refreshToken: "rt-1",
    expiresAt: 1_800_000_000_000,
    scopes: ["user:inference"],
    subscriptionType: "max",
    rateLimitTier: null,
    ...over,
  }
}

describe("CREDENTIAL_FILE_SHAPE", () => {
  test("a file naming no claudeAiOauth parses", () => {
    expect(CREDENTIAL_FILE_SHAPE.parse({})).toEqual({})
  })

  test("a key beside claudeAiOauth survives the parse", () => {
    const parsed = CREDENTIAL_FILE_SHAPE.parse({
      claudeAiOauth: WHOLE,
      oauthAccount: { uuid: "u" },
    })
    expect(parsed.oauthAccount).toEqual({ uuid: "u" })
  })

  test("a key inside claudeAiOauth survives the parse", () => {
    const parsed = CREDENTIAL_FILE_SHAPE.parse({ claudeAiOauth: { ...WHOLE, hasClaudeMax: true } })
    expect(parsed.claudeAiOauth?.hasClaudeMax).toBe(true)
  })

  test("an empty access token refuses the parse", () => {
    expect(() =>
      CREDENTIAL_FILE_SHAPE.parse({ claudeAiOauth: { ...WHOLE, accessToken: "" } })
    ).toThrow()
  })

  test("an empty refresh token refuses the parse", () => {
    expect(() =>
      CREDENTIAL_FILE_SHAPE.parse({ claudeAiOauth: { ...WHOLE, refreshToken: "" } })
    ).toThrow()
  })

  test("an expiry that is no number refuses the parse", () => {
    expect(() =>
      CREDENTIAL_FILE_SHAPE.parse({ claudeAiOauth: { ...WHOLE, expiresAt: "soon" } })
    ).toThrow()
  })

  test("scopes, subscription type and rate limit tier are all optional", () => {
    expect(
      CREDENTIAL_FILE_SHAPE.parse({ claudeAiOauth: WHOLE }).claudeAiOauth?.scopes
    ).toBeUndefined()
  })
})

describe("credentialFileIn", () => {
  test("a directory holding no file reads as no credential", () => {
    expect(credentialFileIn(whereverIn())).toBeNull()
  })

  test("a file that is no JSON reads as no credential", () => {
    const dir = whereverIn()
    fileWritten(dir, "nope")
    expect(credentialFileIn(dir)).toBeNull()
  })

  test("a file naming no claudeAiOauth reads as no credential", () => {
    const dir = whereverIn()
    fileWritten(dir, JSON.stringify({ oauthAccount: { uuid: "u" } }))
    expect(credentialFileIn(dir)).toBeNull()
  })

  test("a file naming an empty access token reads as no credential", () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf({ ...WHOLE, accessToken: "" }))
    expect(credentialFileIn(dir)).toBeNull()
  })

  test("a whole file reads as its access token, scopes and expiry", () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf({ ...WHOLE, scopes: ["user:inference", "user:profile"] }))
    expect(credentialFileIn(dir)).toEqual({
      accessToken: "at-1",
      scopes: ["user:inference", "user:profile"],
      expiresAt: 1_800_000_000_000,
    })
  })

  test("a file naming no scopes reads as no scopes rather than as absent", () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    expect(credentialFileIn(dir)?.scopes).toEqual([])
  })

  test("the refresh token is not among what is read", () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    expect(Object.keys(credentialFileIn(dir) ?? {}).sort()).toEqual([
      "accessToken",
      "expiresAt",
      "scopes",
    ])
  })
})

describe("credentialFileWritten", () => {
  test("a credential reaches a directory that does not yet stand", () => {
    const dir = join(whereverIn(), "deep", "deeper")
    credentialFileWritten(dir, credentialOf())
    expect(credentialFileIn(dir)).toEqual({
      accessToken: "at-1",
      scopes: ["user:inference"],
      expiresAt: 1_800_000_000_000,
    })
  })

  test("a written file carries the whole credential, refresh token and all", () => {
    const dir = whereverIn()
    credentialFileWritten(dir, credentialOf())
    const held = JSON.parse(readFileSync(join(dir, CREDENTIAL_FILE_NAME), "utf-8"))
    expect(held.claudeAiOauth).toEqual({
      accessToken: "at-1",
      refreshToken: "rt-1",
      expiresAt: 1_800_000_000_000,
      scopes: ["user:inference"],
      subscriptionType: "max",
      rateLimitTier: null,
    })
  })

  test("a written file is readable by the owner and by nobody else", () => {
    const dir = whereverIn()
    credentialFileWritten(dir, credentialOf())
    // biome-ignore lint/suspicious/noBitwiseOperators: a file mode is read bit by bit
    expect(statSync(join(dir, CREDENTIAL_FILE_NAME)).mode & 0o777).toBe(0o600)
  })

  test("a key beside claudeAiOauth survives the write", () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE, { oauthAccount: { uuid: "u" } }))
    credentialFileWritten(dir, credentialOf({ accessToken: "at-2" }))
    const held = JSON.parse(readFileSync(join(dir, CREDENTIAL_FILE_NAME), "utf-8"))
    expect(held.oauthAccount).toEqual({ uuid: "u" })
    expect(held.claudeAiOauth.accessToken).toBe("at-2")
  })

  test("a file that is no JSON is written over rather than kept", () => {
    const dir = whereverIn()
    fileWritten(dir, "nope")
    credentialFileWritten(dir, credentialOf())
    expect(credentialFileIn(dir)?.accessToken).toBe("at-1")
  })

  test("an empty access token leaves the standing file untouched", () => {
    const dir = whereverIn()
    const path = fileWritten(dir, bodyOf(WHOLE))
    const before = readFileSync(path, "utf-8")
    credentialFileWritten(dir, credentialOf({ accessToken: "" }))
    expect(readFileSync(path, "utf-8")).toBe(before)
  })

  test("an empty refresh token leaves the standing file untouched", () => {
    const dir = whereverIn()
    const path = fileWritten(dir, bodyOf(WHOLE))
    const before = readFileSync(path, "utf-8")
    credentialFileWritten(dir, credentialOf({ refreshToken: "" }))
    expect(readFileSync(path, "utf-8")).toBe(before)
  })

  test("an empty token writes no file where none stood", () => {
    const dir = join(whereverIn(), "unmade")
    credentialFileWritten(dir, credentialOf({ accessToken: "" }))
    expect(credentialFileIn(dir)).toBeNull()
  })
})

type Watched = {
  readonly pushes: string[][]
  readonly said: string[]
  readonly reauths: string[]
}

function watchedIn(): Watched {
  return { pushes: [], said: [], reauths: [] }
}

function changeArgs(dir: string, watched: Watched, over: Record<string, unknown> = {}) {
  return {
    dir,
    slug: "one",
    prevObservedExpiresAt: null as number | null,
    shouldSkip: () => false,
    push: async (slug: string, where: string) => {
      watched.pushes.push([slug, where])
    },
    onReauthDetected: (slug: string) => {
      watched.reauths.push(slug)
    },
    said: (line: string) => {
      watched.said.push(line)
    },
    ...over,
  }
}

describe("fileChanged", () => {
  test("a directory holding no file is said to be unreadable and nothing is pushed", async () => {
    const dir = whereverIn()
    const watched = watchedIn()
    const change = await fileChanged(changeArgs(dir, watched))
    expect(change).toEqual({ pushed: false, observedExpiresAt: null, reauthDetected: false })
    expect(watched.pushes).toEqual([])
    expect(watched.said).toEqual([
      `Credential file unreadable or malformed at ${join(dir, CREDENTIAL_FILE_NAME)}`,
    ])
  })

  test("a malformed file keeps the expiry last observed rather than forgetting it", async () => {
    const dir = whereverIn()
    fileWritten(dir, "nope")
    const watched = watchedIn()
    const change = await fileChanged(changeArgs(dir, watched, { prevObservedExpiresAt: 7 }))
    expect(change).toEqual({ pushed: false, observedExpiresAt: 7, reauthDetected: false })
    expect(watched.said.length).toBe(1)
  })

  test("a file naming no claudeAiOauth is neither said nor pushed", async () => {
    const dir = whereverIn()
    fileWritten(dir, JSON.stringify({ oauthAccount: { uuid: "u" } }))
    const watched = watchedIn()
    const change = await fileChanged(changeArgs(dir, watched, { prevObservedExpiresAt: 7 }))
    expect(change).toEqual({ pushed: false, observedExpiresAt: 7, reauthDetected: false })
    expect(watched.said).toEqual([])
    expect(watched.pushes).toEqual([])
  })

  test("a readable file is pushed and its expiry observed", async () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    const watched = watchedIn()
    const change = await fileChanged(changeArgs(dir, watched))
    expect(change).toEqual({
      pushed: true,
      observedExpiresAt: 1_800_000_000_000,
      reauthDetected: false,
    })
    expect(watched.pushes).toEqual([["one", dir]])
  })

  test("a first read tells of no re-auth, having nothing to compare against", async () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    const watched = watchedIn()
    const change = await fileChanged(changeArgs(dir, watched, { prevObservedExpiresAt: null }))
    expect(change.reauthDetected).toBe(false)
  })

  test("an expiry that moved out reads as a re-auth", async () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    const watched = watchedIn()
    const change = await fileChanged(
      changeArgs(dir, watched, { prevObservedExpiresAt: 1_700_000_000_000 })
    )
    expect(change.reauthDetected).toBe(true)
    expect(watched.pushes).toEqual([["one", dir]])
  })

  test("an expiry that stands still reads as no re-auth", async () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    const watched = watchedIn()
    const change = await fileChanged(
      changeArgs(dir, watched, { prevObservedExpiresAt: 1_800_000_000_000 })
    )
    expect(change.reauthDetected).toBe(false)
  })

  test("an account the caller skips is observed and not pushed", async () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    const watched = watchedIn()
    const change = await fileChanged(changeArgs(dir, watched, { shouldSkip: () => true }))
    expect(change).toEqual({
      pushed: false,
      observedExpiresAt: 1_800_000_000_000,
      reauthDetected: false,
    })
    expect(watched.pushes).toEqual([])
    expect(watched.reauths).toEqual([])
  })

  test("an account the caller skips is pushed anyway once its expiry moves out", async () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    const watched = watchedIn()
    const change = await fileChanged(
      changeArgs(dir, watched, { shouldSkip: () => true, prevObservedExpiresAt: 1_700_000_000_000 })
    )
    expect(change).toEqual({
      pushed: true,
      observedExpiresAt: 1_800_000_000_000,
      reauthDetected: true,
    })
    expect(watched.reauths).toEqual(["one"])
    expect(watched.pushes).toEqual([["one", dir]])
  })

  test("the re-auth is told of before the push, not after", async () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    const order: string[] = []
    const change = await fileChanged({
      dir,
      slug: "one",
      prevObservedExpiresAt: 1_700_000_000_000,
      shouldSkip: () => true,
      push: async () => {
        order.push("push")
      },
      onReauthDetected: () => {
        order.push("reauth")
      },
      said: () => undefined,
    })
    expect(order).toEqual(["reauth", "push"])
    expect(change.pushed).toBe(true)
  })

  test("a push that throws is not caught here", async () => {
    const dir = whereverIn()
    fileWritten(dir, bodyOf(WHOLE))
    const watched = watchedIn()
    await expect(
      fileChanged(
        changeArgs(dir, watched, {
          push: async () => {
            throw new Error("no")
          },
        })
      )
    ).rejects.toThrow("no")
  })
})
