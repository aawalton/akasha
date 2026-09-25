import { afterAll, expect, test } from "bun:test"
import { generateKeyPairSync } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { gitIn } from "akasha/file/modules/git-place/git-place.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  cipherFor,
  keysBeside,
  keysHeldIn,
  looksEncrypted,
  secretsIn,
  unfit,
  yamlOf,
} from "akasha/page/modules/secret/page-secret.module.code.ts"

const scratch = scratchWorld()

const KEY_NAMED = "SOPS_AGE_KEY_FILE"

const KEY_WAS = optionalEnv(KEY_NAMED)

afterAll(() => {
  scratch.sweep()
  if (KEY_WAS === undefined) delete process.env[KEY_NAMED]
  else process.env[KEY_NAMED] = KEY_WAS
})

const PAGE = "akasha/one/aine.model-account.ts"

const BESIDE = "akasha/one/aine.model-account.sops.yaml"

const REPO = rootOf(import.meta.dir)

const LETTERS = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"

const STEPS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3]

function summed(values: readonly number[]): number {
  let sum = 1
  for (const one of values) {
    const top = sum >> 25
    sum = ((sum & 0x1ffffff) << 5) ^ one
    STEPS.forEach((step, at) => {
      if ((top >> at) & 1) sum ^= step
    })
  }
  return sum
}

function fivesOf(bytes: Uint8Array): readonly number[] {
  const found: number[] = []
  let carried = 0
  let bits = 0
  for (const one of bytes) {
    carried = ((carried << 8) | one) & 0xfff
    bits += 8
    while (bits >= 5) {
      bits -= 5
      found.push((carried >> bits) & 31)
    }
  }
  if (bits > 0) found.push((carried << (5 - bits)) & 31)
  return found
}

function bech32(prefix: string, bytes: Uint8Array): string {
  const codes = [...prefix].map((one) => one.charCodeAt(0))
  const data = fivesOf(bytes)
  const said = [...codes.map((one) => one >> 5), 0, ...codes.map((one) => one & 31), ...data]
  const mod = summed([...said, 0, 0, 0, 0, 0, 0]) ^ 1
  const check = [5, 4, 3, 2, 1, 0].map((at) => (mod >> (5 * at)) & 31)
  return `${prefix}1${[...data, ...check].map((one) => LETTERS[one]).join("")}`
}

const PAIR = generateKeyPairSync("x25519")

function bytesOf(said: unknown): Uint8Array {
  return new Uint8Array(Buffer.from(String(said), "base64url"))
}

const RECIPIENT = bech32("age", bytesOf(PAIR.publicKey.export({ format: "jwk" }).x))

const PRIVATE_KEY = bech32(
  "age-secret-key-",
  bytesOf(PAIR.privateKey.export({ format: "jwk" }).d)
).toUpperCase()

const KEYS_AT = join(scratch.rootFor("akasha-secret-key-"), "keys.txt")

writeFileSync(KEYS_AT, `${PRIVATE_KEY}\n`, { mode: 0o600 })

process.env[KEY_NAMED] = KEYS_AT

const RULES = readFileSync(join(REPO, ".sops.yaml"), "utf8").replaceAll(/age1[a-z0-9]+/g, RECIPIENT)

function rooted(): string {
  const root = scratch.rootFor("akasha-secret-")
  writeFileSync(join(root, ".sops.yaml"), RULES)
  mkdirSync(join(root, "akasha/one"), { recursive: true })
  return root
}

test("the key a test deciphers with is its own, and Alan's recipient is nowhere in its rules", () => {
  expect(RULES).toContain(RECIPIENT)
  expect(RULES.replaceAll(RECIPIENT, "")).not.toContain("age1")
})

function held(values: Readonly<Record<string, string>>): ReadonlyMap<string, string> {
  return new Map(Object.entries(values))
}

test("a value is written as one sorted line for each key, quoted", () => {
  expect(yamlOf(held({ refresh: "b", access: "a" }))).toBe('access: "a"\nrefresh: "b"\n')
})

test("a value carrying a newline is written as one line, the newline escaped", () => {
  expect(yamlOf(held({ access: "one\ntwo\n" }))).toBe('access: "one\\ntwo\\n"\n')
})

test("an empty value is refused, and text carrying newlines is not", () => {
  expect(unfit("access", "")).toContain("arrived empty")
  expect(unfit("access", "one\ntwo")).toBeNull()
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

test("a value of many lines is enciphered and decrypts back byte for byte", () => {
  const root = rooted()
  const whole = "-----BEGIN-----\none\ntwo\n-----END-----\n"
  const said = cipherFor(root, PAGE, held({ "access-token": whole }))
  if (said.text === null) throw new Error(said.why)
  expect(keysHeldIn(said.text)).toEqual(["access-token"])
  writeFileSync(join(root, BESIDE), said.text, "utf8")
  expect(secretsIn(root, PAGE)).toEqual(held({ "access-token": whole }))
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

test("no plaintext reaches the disk, so nothing is made under the folder git does not track", () => {
  const root = rooted()
  const said = cipherFor(root, PAGE, held({ "access-token": "one" }))
  expect(said.text).not.toBeNull()
  expect(existsSync(gitIn(root))).toBe(false)
})

test("the name given for the file settles which rule encrypts, though no file sits there", () => {
  const root = rooted()
  const said = cipherFor(root, PAGE, held({ "access-token": "one" }))
  if (said.text === null) throw new Error(said.why)
  expect(said.text).toContain("access-token: ENC[")
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
