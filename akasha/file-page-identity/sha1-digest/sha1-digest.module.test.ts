import { expect, test } from "bun:test"
import { createHash, randomBytes } from "node:crypto"
import { bytesOfHex, hexOf, sha1Bytes, sha1HexOfText } from "./sha1-digest.module.code.ts"

const AT_NAMESPACE = "6ba7b8129dad11d180b400c04fd430c8"

const TEXTS: readonly string[] = [
  "",
  "a",
  "abc",
  "The quick brown fox jumps over the lazy dog",
  "héllo wörld — ünïcode ✓ 日本語 🙂",
  " ",
  "a".repeat(55),
  "a".repeat(56),
  "a".repeat(63),
  "a".repeat(64),
  "a".repeat(65),
  "a".repeat(119),
  "a".repeat(120),
  "a".repeat(127),
  "a".repeat(128),
  "z".repeat(1000),
  "akasha:akasha/person-system/person/people/alan.person.ts",
  "alan:pages/journal/2026-08-31.md",
]

function nodeHexOf(text: string): string {
  return createHash("sha1").update(text, "utf8").digest("hex")
}

test("a digest is twenty bytes", () => {
  expect(sha1Bytes(new Uint8Array(0)).length).toBe(20)
  expect(sha1Bytes(new TextEncoder().encode("abc")).length).toBe(20)
})

test("the published vectors come out as published", () => {
  expect(sha1HexOfText("")).toBe("da39a3ee5e6b4b0d3255bfef95601890afd80709")
  expect(sha1HexOfText("abc")).toBe("a9993e364706816aba3e25717850c26c9cd0d89d")
  expect(sha1HexOfText("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq")).toBe(
    "84983e441c3bd26ebaae4aa1f95129e5e54670f1"
  )
})

test("every text agrees with node:crypto, the empty and the multi-byte among them", () => {
  for (const text of TEXTS) {
    expect(sha1HexOfText(text)).toBe(nodeHexOf(text))
  }
})

test("every byte length up to two hundred agrees with node:crypto", () => {
  for (let length = 0; length <= 200; length += 1) {
    const bytes = new Uint8Array(Array.from({ length }, (_, one) => one % 251))
    expect(hexOf(sha1Bytes(bytes))).toBe(createHash("sha1").update(bytes).digest("hex"))
  }
})

test("a thousand random byte runs agree with node:crypto", () => {
  for (let one = 0; one < 1000; one += 1) {
    const bytes = randomBytes(Math.floor(Math.random() * 301))
    expect(hexOf(sha1Bytes(new Uint8Array(bytes)))).toBe(
      createHash("sha1").update(bytes).digest("hex")
    )
  }
})

test("a namespace read from hex is the bytes node reads from the same hex", () => {
  expect(hexOf(bytesOfHex(AT_NAMESPACE))).toBe(AT_NAMESPACE)
  expect([...bytesOfHex(AT_NAMESPACE)]).toEqual([...Buffer.from(AT_NAMESPACE, "hex")])
})

test("a namespace joined to text agrees with two updates over node:crypto", () => {
  const namespace = bytesOfHex(AT_NAMESPACE)
  for (const text of TEXTS) {
    const said = new TextEncoder().encode(text)
    const over = new Uint8Array(namespace.length + said.length)
    over.set(namespace)
    over.set(said, namespace.length)
    expect(hexOf(sha1Bytes(over))).toBe(
      createHash("sha1").update(Buffer.from(AT_NAMESPACE, "hex")).update(text, "utf8").digest("hex")
    )
  }
})

test("hex is written in lower case, two glyphs a byte", () => {
  expect(hexOf(new Uint8Array([0, 1, 15, 16, 171, 255]))).toBe("00010f10abff")
})
