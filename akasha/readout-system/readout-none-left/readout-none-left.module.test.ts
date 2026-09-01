import { expect, test } from "bun:test"
import { noneLeftIn, readNoneLeft, stated } from "./readout-none-left.module.code.ts"

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
  expect(noneLeftIn({ "none-left-words": "All reviewed!" })).toEqual({ words: "All reviewed!" })
  expect(noneLeftIn({ "none-left-emoji": "🎉" })).toEqual({ emoji: "🎉" })
})

test("a page stating both halves carries both", () => {
  expect(noneLeftIn({ "none-left-words": "All reviewed!", "none-left-emoji": "🎉" })).toEqual({
    words: "All reviewed!",
    emoji: "🎉",
  })
})

test("a readout no page names carries nothing", async () => {
  expect(await readNoneLeft("no-readout-is-named-this")).toEqual({})
})

test("the words and emoji the unreviewed readout states are read from the store", async () => {
  const noneLeft = await readNoneLeft("monarch-unreviewed-transactions")
  expect(noneLeft.words).toBeDefined()
  expect(noneLeft.emoji).toBeDefined()
})
