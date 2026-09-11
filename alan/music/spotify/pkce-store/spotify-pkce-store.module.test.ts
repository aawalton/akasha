import { afterAll, afterEach, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  getPkceFilePath,
  type PkceHandoff,
  readPkce,
  removePkce,
  writePkce,
} from "akasha/alan/music/spotify/pkce-store/spotify-pkce-store.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"

const HANDOFF: PkceHandoff = { verifier: "a-verifier" }

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

afterEach(() => {
  delete process.env.SPOTIFY_PKCE_FILE
})

function scratch(): string {
  return SCRATCH.rootFor("spotify-pkce-store-")
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

test("a handoff missing its verifier reads as nothing", () => {
  const at = scratch()
  writeFileSync(join(at, "pkce.json"), JSON.stringify({}))
  expect(readPkce(at)).toBe(null)
})

test("a handoff carrying a state reads as nothing", () => {
  const at = scratch()
  writeFileSync(join(at, "pkce.json"), JSON.stringify({ verifier: "a-verifier", state: "a-state" }))
  expect(readPkce(at)).toBe(null)
})

test("the handoff is gone once it is taken away", () => {
  const at = scratch()
  writePkce(HANDOFF, at)
  removePkce(at)
  expect(readPkce(at)).toBe(null)
})
