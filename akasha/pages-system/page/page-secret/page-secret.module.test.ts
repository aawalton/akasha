import { afterAll, expect, test } from "bun:test"
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { dataIn } from "../../../file-system/data-place/data-place.module.code.ts"
import {
  cipherFor,
  keysBeside,
  keysHeldIn,
  looksEncrypted,
  secretsIn,
  unfit,
  yamlOf,
} from "./page-secret.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE = "akasha/one/aine.claude-account.ts"

const BESIDE = "akasha/one/aine.claude-account.sops.yaml"

const REPO = join(dirname(import.meta.path), "..", "..", "..", "..")

function rooted(): string {
  const root = scratch.rootFor("akasha-secret-")
  copyFileSync(join(REPO, ".sops.yaml"), join(root, ".sops.yaml"))
  mkdirSync(join(root, "akasha/one"), { recursive: true })
  return root
}

function held(values: Readonly<Record<string, string>>): ReadonlyMap<string, string> {
  return new Map(Object.entries(values))
}

test("a value is written as one sorted line for each key, quoted", () => {
  expect(yamlOf(held({ refresh: "b", access: "a" }))).toBe('access: "a"\nrefresh: "b"\n')
})

test("an empty value and one carrying a newline are refused, and one line of text is not", () => {
  expect(unfit("access", "")).toContain("arrived empty")
  expect(unfit("access", "one\ntwo")).toContain("one line")
  expect(unfit("access", "one")).toBeNull()
})

test("the key names a sops file holds are read without decrypting it", () => {
  const text =
    "access-token: ENC[AES256_GCM,data:aa]\nrefresh-token: ENC[AES256_GCM,data:bb]\nsops:\n"
  expect(keysHeldIn(text)).toEqual(["access-token", "refresh-token"])
})

test("text carrying no sops mac does not look encrypted", () => {
  expect(looksEncrypted('access: "a"\n')).toBe(false)
  expect(looksEncrypted("sops:\n    mac: ENC[AES256_GCM,data:aa]\n")).toBe(true)
})

test("composing nothing is refused, a sops file holding nothing being taken away instead", () => {
  expect(cipherFor(rooted(), PAGE, new Map()).text).toBeNull()
})

test("a value that is no single line is refused before sops is reached", () => {
  const said = cipherFor(rooted(), PAGE, held({ "access-token": "one\ntwo" }))
  expect(said.text).toBeNull()
  expect(said.why).toContain("one line")
})

test("what is composed is encrypted, names its keys in the open, and decrypts back", () => {
  const root = rooted()
  const said = cipherFor(root, PAGE, held({ "access-token": "one", "refresh-token": "two" }))
  if (said.text === null) throw new Error(said.why)
  expect(looksEncrypted(said.text)).toBe(true)
  expect(keysHeldIn(said.text)).toEqual(["access-token", "refresh-token"])
  expect(said.text).not.toContain("one")

  writeFileSync(join(root, BESIDE), said.text, "utf8")
  expect(secretsIn(root, PAGE)).toEqual(held({ "access-token": "one", "refresh-token": "two" }))
  expect(keysBeside(root, PAGE)).toEqual(["access-token", "refresh-token"])
})

test("the plaintext handed to sops does not stand after the call", () => {
  const root = rooted()
  cipherFor(root, PAGE, held({ "access-token": "one" }))
  const at = dataIn(root, "sops")
  expect(existsSync(at) ? readdirSync(at) : []).toEqual([])
})

test("a page with no sops file beside it carries no secrets, which is an answer", () => {
  expect(secretsIn(rooted(), PAGE)).toBeNull()
  expect(keysBeside(rooted(), PAGE)).toEqual([])
})

test("a sops file that will not decrypt is refused rather than read as empty", () => {
  const root = rooted()
  writeFileSync(join(root, BESIDE), "access-token: ENC[nonsense]\nsops:\n", "utf8")
  expect(() => secretsIn(root, PAGE)).toThrow("could not be decrypted")
})

test("a path that is no TypeScript file holds no secrets and composes none", () => {
  expect(secretsIn(rooted(), "akasha/one/notes.txt")).toBeNull()
  expect(() => cipherFor(rooted(), "akasha/one/notes.txt", held({ a: "b" }))).toThrow(
    "no TypeScript file"
  )
})
