import { afterAll, afterEach, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  getPkceFilePath,
  type PkceHandoff,
  readPkce,
  removePkce,
  writePkce,
} from "./spotify-pkce-store.module.code.ts"

const HANDOFF: PkceHandoff = { verifier: "a-verifier", state: "a-state" }

const ROOT = mkdtempSync("/var/tmp/spotify-pkce-store-")

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

afterEach(() => {
  delete process.env.SPOTIFY_PKCE_FILE
})

function scratch(): string {
  next += 1
  const at = join(ROOT, `at-${next}`)
  mkdirSync(at, { recursive: true })
  return at
}

test("the handoff file sits beside the token file", () => {
  expect(getPkceFilePath("/base")).toBe("/base/pkce.json")
})

test("the environment names the handoff file instead", () => {
  process.env.SPOTIFY_PKCE_FILE = "/elsewhere/pkce.json"
  expect(getPkceFilePath("/base")).toBe("/elsewhere/pkce.json")
})

test("a handoff written is read back whole", () => {
  const at = scratch()
  writePkce(HANDOFF, at)
  expect(readPkce(at)).toEqual(HANDOFF)
})

test("no handoff file reads as nothing", () => {
  expect(readPkce(scratch())).toBe(null)
})

test("a handoff missing its state reads as nothing", () => {
  const at = scratch()
  writeFileSync(join(at, "pkce.json"), JSON.stringify({ verifier: "a-verifier" }))
  expect(readPkce(at)).toBe(null)
})

test("the handoff is gone once it is taken away", () => {
  const at = scratch()
  writePkce(HANDOFF, at)
  removePkce(at)
  expect(readPkce(at)).toBe(null)
})
