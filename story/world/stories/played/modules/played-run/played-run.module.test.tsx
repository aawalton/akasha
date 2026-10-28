import { expect, test } from "bun:test"
import { asPage, type Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  chaptersBefore,
  previousShown,
} from "akasha/story/world/stories/played/modules/played-run/played-run.module.code.tsx"

const chapter = (id: string, position: number): Page =>
  asPage({ pageTypeSlug: "story-chapter-played", id, position })

const CHAPTERS = [chapter("c3", 3), chapter("c1", 1), chapter("c2", 2)]

const ids = (rows: readonly Page[]): readonly string[] => rows.map((row) => row.id)

test("where turns are the run, every chapter is before it, first chapter first", () => {
  expect(ids(chaptersBefore(CHAPTERS, true, 0))).toEqual(["c1", "c2", "c3"])
})

test("where chapters are the run, only the chapters before the drawn tail are before it", () => {
  expect(ids(chaptersBefore(CHAPTERS, false, 1))).toEqual(["c1"])
  expect(ids(chaptersBefore(CHAPTERS, false, 0))).toEqual([])
})

test("nothing before the run is shown until Show Previous is pressed", () => {
  expect(previousShown(chaptersBefore(CHAPTERS, true, 0), 0)).toEqual([])
})

test("each press shows one more chapter, the latest first", () => {
  const before = chaptersBefore(CHAPTERS, true, 0)
  expect(ids(previousShown(before, 1))).toEqual(["c3"])
  expect(ids(previousShown(before, 2))).toEqual(["c2", "c3"])
})

test("pressing past the first chapter shows every chapter and no more", () => {
  const before = chaptersBefore(CHAPTERS, true, 0)
  expect(ids(previousShown(before, 3))).toEqual(["c1", "c2", "c3"])
  expect(ids(previousShown(before, 9))).toEqual(["c1", "c2", "c3"])
})
