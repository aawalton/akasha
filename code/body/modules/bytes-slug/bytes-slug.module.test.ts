import { expect, test } from "bun:test"
import { bytesSlug } from "akasha/code/body/modules/bytes-slug/bytes-slug.module.code.ts"

const ONE = new Uint8Array([1, 2, 3])

const TWO = new Uint8Array([4, 5, 6])

test("a slug is what it opens with and sixteen hex", () => {
  expect(bytesSlug("image-", ONE)).toMatch(/^image-[0-9a-f]{16}$/)
  expect(bytesSlug("audio-", ONE)).toMatch(/^audio-[0-9a-f]{16}$/)
})

test("the same bytes give the same slug", () => {
  expect(bytesSlug("image-", ONE)).toBe(bytesSlug("image-", new Uint8Array(ONE)))
})

test("other bytes give another slug", () => {
  expect(bytesSlug("image-", ONE)).not.toBe(bytesSlug("image-", TWO))
})
