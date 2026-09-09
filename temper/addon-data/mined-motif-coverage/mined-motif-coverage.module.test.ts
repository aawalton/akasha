import { beforeAll, expect, test } from "bun:test"
import {
  type Coverage,
  isCanonicalMotifTitle,
  isMotifShapedLoreName,
  itemsMissingLore,
  loreMissingItems,
  minedMotifCoverage,
  motifKey,
  motifTuplesOf,
  motifWording,
} from "./mined-motif-coverage.module.code.ts"

function tuplesOf(
  names: readonly string[]
): ReadonlyMap<string, { styleId: number; chapterId: number | null }> {
  return motifTuplesOf(names).tuples
}

const BOOK_5 = "Crafting Motif 5: Breton Style"

const CHAPTER_5_AXES = "Crafting Motif 5: Breton Axes"

test("a motif key parts a book from a chapter of the same style", () => {
  expect(motifKey({ styleId: 5, chapterId: null })).toBe("5:B")
  expect(motifKey({ styleId: 5, chapterId: 1 })).toBe("5:1")
})

test("a motif is worded by the style and the piece", () => {
  expect(motifWording({ styleId: 5, chapterId: null })).toBe("style 5 book")
  expect(motifWording({ styleId: 5, chapterId: 1 })).toBe("style 5 chapter 1")
})

test("a tome edition is left out and the book it restates is kept", () => {
  expect(isCanonicalMotifTitle(BOOK_5)).toBe(true)
  expect(isCanonicalMotifTitle("Crafting Motif 5: Breton Style, Tome Edition")).toBe(false)
})

test("a lore name is motif shaped under either prefix and nothing else", () => {
  expect(isMotifShapedLoreName(BOOK_5)).toBe(true)
  expect(isMotifShapedLoreName("Crown Crafting Motif 40: Dremora Style")).toBe(true)
  expect(isMotifShapedLoreName("The Improved Emperor's Guide to Tamriel")).toBe(false)
})

test("a name no motif parser reads is gathered as unparseable rather than dropped", () => {
  const gathered = motifTuplesOf([BOOK_5, "Crafting Motif : Nothing Parseable Here"])
  expect(gathered.tuples.size).toBe(1)
  expect(gathered.unparseable).toEqual(["Crafting Motif : Nothing Parseable Here"])
})

test("an item the lore library names nothing for is reported", () => {
  const items = tuplesOf([CHAPTER_5_AXES])
  expect(itemsMissingLore(items, tuplesOf([]))).toEqual(["style 5 chapter 1"])
  expect(itemsMissingLore(items, tuplesOf([CHAPTER_5_AXES]))).toEqual([])
})

test("a book item is covered where the library names any chapter of that style", () => {
  expect(itemsMissingLore(tuplesOf([BOOK_5]), tuplesOf([CHAPTER_5_AXES]))).toEqual([])
})

test("a lore entry no item answers is reported", () => {
  const lore = tuplesOf([CHAPTER_5_AXES])
  expect(loreMissingItems(tuplesOf([]), lore)).toEqual(["style 5 chapter 1"])
  expect(loreMissingItems(tuplesOf([CHAPTER_5_AXES]), lore)).toEqual([])
})

test("a chapter entry is covered where an item names the style's book", () => {
  expect(loreMissingItems(tuplesOf([BOOK_5]), tuplesOf([CHAPTER_5_AXES]))).toEqual([])
})

let coverage: Coverage

beforeAll(() => {
  coverage = minedMotifCoverage()
})

test("the sweep holds motifs to judge, so a clean answer is no empty one", () => {
  expect(coverage.items.tuples.size).toBeGreaterThan(1_000)
  expect(coverage.lore.tuples.size).toBeGreaterThan(1_000)
})

test("every motif item title the sweep read parses cleanly", () => {
  expect(coverage.items.unparseable).toEqual([])
})

test("every lore library motif entry parses cleanly", () => {
  expect(coverage.lore.unparseable).toEqual([])
})

test("every motif item the sweep read has lore covering it", () => {
  expect(coverage.itemsMissingLore).toEqual([])
})

test("every lore library motif entry has an item answering it", () => {
  expect(coverage.loreMissingItems).toEqual([])
})
