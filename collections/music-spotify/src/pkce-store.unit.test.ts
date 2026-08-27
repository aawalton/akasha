import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { getPkceFilePath, type PkceHandoff, readPkce, removePkce, writePkce } from "./pkce-store"

let dir: string
let file: string

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "spotify-pkce-"))
  file = join(dir, "pkce.json")
  process.env.SPOTIFY_PKCE_FILE = file
})

afterEach(() => {
  process.env.SPOTIFY_PKCE_FILE = undefined
  rmSync(dir, { recursive: true, force: true })
})

const sample: PkceHandoff = {
  verifier: "the-pkce-verifier",
  state: "0123456789abcdef",
}

describe("pkce-store", () => {
  test("SPOTIFY_PKCE_FILE override wins for the path", () => {
    expect(getPkceFilePath()).toBe(file)
  })

  test("write → read round trip", () => {
    writePkce(sample)
    expect(readPkce()).toEqual(sample)
  })

  test("missing file reads as null", () => {
    expect(readPkce()).toBeNull()
  })

  test("malformed JSON reads as null", () => {
    writeFileSync(file, "{ not json", { mode: 0o600 })
    expect(readPkce()).toBeNull()
  })

  test("schema-invalid content reads as null", () => {
    writeFileSync(file, JSON.stringify({ verifier: "x" }), { mode: 0o600 })
    expect(readPkce()).toBeNull()
  })

  test("remove is idempotent", () => {
    writePkce(sample)
    removePkce()
    expect(readPkce()).toBeNull()
    removePkce()
    expect(readPkce()).toBeNull()
  })
})
