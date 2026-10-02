import { expect, test } from "bun:test"
import { unanchored } from "akasha/command/modules/cover-anchoring/cover-anchoring.module.code.ts"

const BARE = 'export const t = {\n  slug: "t-00-001",\n}\n'

const COVERED = 'export const t = {\n  slug: "t-00-001",\n  cover: "image/image-a",\n}\n'

const ANCHORED =
  'export const t = {\n  slug: "t-00-001",\n  cover: "image/image-a",\n  coverAfter: "She ran",\n}\n'

const RECOVERED = 'export const t = {\n  slug: "t-00-001",\n  cover: "image/image-b",\n}\n'

test("a turn drafted a new cover with no words to draw it after is refused", () => {
  expect(unanchored(BARE, COVERED)).toBe(true)
  expect(unanchored(null, COVERED)).toBe(true)
  expect(unanchored(COVERED, RECOVERED)).toBe(true)
})

test("a turn drafted a new cover with its words, or keeping the cover it had, is let through", () => {
  expect(unanchored(BARE, ANCHORED)).toBe(false)
  expect(unanchored(COVERED, COVERED)).toBe(false)
  expect(unanchored(BARE, BARE)).toBe(false)
})
