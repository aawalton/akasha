import { expect, test } from "bun:test"
import { isRiff } from "./riff-bytes.module.code.ts"

const HEADER = 44

function riffOf(size: number): Uint8Array {
  const bytes = new Uint8Array(size)
  bytes.set([0x52, 0x49, 0x46, 0x46])
  return bytes
}

test("bytes opening with RIFF and longer than a header are a wav", () => {
  expect(isRiff(riffOf(HEADER + 1))).toBe(true)
})

test("bytes no longer than a header are no wav", () => {
  expect(isRiff(riffOf(HEADER))).toBe(false)
})

test("bytes opening with anything else are no wav", () => {
  expect(isRiff(new Uint8Array(HEADER + 1))).toBe(false)
})
