import { afterAll, afterEach, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  getTokenFilePath,
  readToken,
  removeToken,
  type SpotifyToken,
  SpotifyTokenSchema,
  writeToken,
} from "./spotify-token-store.module.code.ts"

const TOKEN: SpotifyToken = {
  accessToken: "an-access-token",
  refreshToken: "a-refresh-token",
  expiresAt: "2999-01-01T00:00:00.000Z",
  scopes: ["user-top-read"],
}

const ROOT = mkdtempSync("/var/tmp/spotify-token-store-")

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

afterEach(() => {
  delete process.env.SPOTIFY_TOKEN_FILE
})

function scratch(): string {
  next += 1
  const at = join(ROOT, `at-${next}`)
  mkdirSync(at, { recursive: true })
  return at
}

test("the token file sits in the folder it is given", () => {
  expect(getTokenFilePath("/base")).toBe("/base/token.json")
})

test("the environment names the token file instead", () => {
  process.env.SPOTIFY_TOKEN_FILE = "/elsewhere/token.json"
  expect(getTokenFilePath("/base")).toBe("/elsewhere/token.json")
})

test("the environment is read at every call rather than once at load", () => {
  const first = getTokenFilePath("/base")
  process.env.SPOTIFY_TOKEN_FILE = "/set/afterwards.json"
  expect(first).toBe("/base/token.json")
  expect(getTokenFilePath("/base")).toBe("/set/afterwards.json")
})

test("a token written is read back whole", () => {
  const at = scratch()
  writeToken(TOKEN, at)
  expect(readToken(at)).toEqual(TOKEN)
})

test("no token file reads as nothing", () => {
  expect(readToken(scratch())).toBe(null)
})

test("a token file missing its refresh token reads as nothing", () => {
  const at = scratch()
  writeFileSync(join(at, "token.json"), JSON.stringify({ ...TOKEN, refreshToken: "" }))
  expect(readToken(at)).toBe(null)
})

test("a token file carrying a field the shape does not name reads as nothing", () => {
  const at = scratch()
  writeFileSync(join(at, "token.json"), JSON.stringify({ ...TOKEN, extra: 1 }))
  expect(readToken(at)).toBe(null)
})

test("removing the token takes it away", () => {
  const at = scratch()
  writeToken(TOKEN, at)
  removeToken(at)
  expect(readToken(at)).toBe(null)
})

test("the shape refuses a token whose scopes are not text", () => {
  expect(SpotifyTokenSchema.safeParse({ ...TOKEN, scopes: [7] }).success).toBe(false)
})
