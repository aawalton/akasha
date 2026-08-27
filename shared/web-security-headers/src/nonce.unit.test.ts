import { expect, test } from "bun:test"
import { generateNonce } from "./nonce"

test("generateNonce returns a non-empty string", () => {
  const nonce = generateNonce()
  expect(typeof nonce).toBe("string")
  expect(nonce.length).toBeGreaterThan(0)
})

test("generateNonce is unique per call", () => {
  const nonces = new Set(Array.from({ length: 100 }, () => generateNonce()))
  expect(nonces.size).toBe(100)
})
