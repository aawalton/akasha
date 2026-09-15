import { expect, test } from "bun:test"
import {
  noneLeftIn,
  stated,
} from "akasha/alan/harness/readout/modules/none-left/readout-none-left.module.code.ts"

test("a value that is not text says nothing", () => {
  expect(stated(11)).toBe(undefined)
  expect(stated(null)).toBe(undefined)
  expect(stated(undefined)).toBe(undefined)
})

test("text holding nothing but spaces says nothing", () => {
  expect(stated("")).toBe(undefined)
  expect(stated("   ")).toBe(undefined)
})

test("text is carried with its spaces trimmed off", () => {
  expect(stated("  All reviewed!  ")).toBe("All reviewed!")
})

test("a page stating neither half carries neither", () => {
  expect(noneLeftIn({})).toEqual({})
})

test("a page stating one half carries that half alone", () => {
  expect(noneLeftIn({ noneLeftWords: "All reviewed!" })).toEqual({ words: "All reviewed!" })
  expect(noneLeftIn({ noneLeftEmoji: "🎉" })).toEqual({ emoji: "🎉" })
})

test("a page stating both halves carries both", () => {
  expect(noneLeftIn({ noneLeftWords: "All reviewed!", noneLeftEmoji: "🎉" })).toEqual({
    words: "All reviewed!",
    emoji: "🎉",
  })
})
