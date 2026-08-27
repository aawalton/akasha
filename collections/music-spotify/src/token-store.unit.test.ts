import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  getTokenFilePath,
  readToken,
  removeToken,
  type SpotifyToken,
  writeToken,
} from "./token-store"

let dir: string
let file: string

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "spotify-token-"))
  file = join(dir, "token.json")
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

const sample: SpotifyToken = {
  accessToken: "acc",
  refreshToken: "ref",
  expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
  scopes: ["user-read-private", "user-read-email"],
}

describe("token-store", () => {
  test("SPOTIFY_TOKEN_FILE override wins for the path", () => {
    process.env.SPOTIFY_TOKEN_FILE = file
    try {
      expect(getTokenFilePath()).toBe(file)
      expect(getTokenFilePath(join(dir, "other"))).toBe(file)
    } finally {
      process.env.SPOTIFY_TOKEN_FILE = undefined
    }
  })

  test("baseDir resolves the token path under the given dir", () => {
    expect(getTokenFilePath(dir)).toBe(file)
  })

  test("write → read round trip", () => {
    writeToken(sample, dir)
    expect(readToken(dir)).toEqual(sample)
  })

  test("missing file reads as null", () => {
    expect(readToken(dir)).toBeNull()
  })

  test("malformed JSON reads as null", () => {
    writeFileSync(file, "{ not json", { mode: 0o600 })
    expect(readToken(dir)).toBeNull()
  })

  test("schema-invalid content reads as null", () => {
    writeFileSync(file, JSON.stringify({ accessToken: "x" }), { mode: 0o600 })
    expect(readToken(dir)).toBeNull()
  })

  test("remove is idempotent", () => {
    writeToken(sample, dir)
    removeToken(dir)
    expect(readToken(dir)).toBeNull()
    removeToken(dir)
    expect(readToken(dir)).toBeNull()
  })
})
