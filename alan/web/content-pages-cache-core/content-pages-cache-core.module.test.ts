import { expect, test } from "bun:test"
import {
  chapterPageForOffline,
  OFFLINE_CHAPTER_KEYS,
} from "akasha/alan/library/reading/offline-reading/offline-reading.module.code.ts"
import {
  parsePersistedContentPage,
  serializeContentPage,
} from "./content-pages-cache-core.module.code.ts"

const CHAPTER_ID = "01a0655d-daa6-7fdf-b1e7-000000000001"

const BODY = "The innkeeper set the mug down and looked out at the empty road."

const CHAPTER_IN_THE_STORE: Readonly<Record<string, unknown>> = {
  id: CHAPTER_ID,
  title: "Chapter 1.00",
  position: 0,
  ownLength: BODY.length,
  body: BODY,
  seq: 1,
  slug: "chapter-1-00",
  icon: null,
  userId: "01a0655d-daa6-7fdf-b1e7-000000000002",
  pageTypeId: "01a0655d-daa6-7fdf-b1e7-000000000003",
  pageTypeSlug: "story-chapter-wandering-inn",
  uniqueKey: null,
}

function rowTheStoreAnswers(): Readonly<Record<string, unknown>> {
  const row: Record<string, unknown> = {}
  for (const key of OFFLINE_CHAPTER_KEYS) row[key] = CHAPTER_IN_THE_STORE[key] ?? null
  return row
}

test("the chapter this test hands the writer has every key the writer asks the store for", () => {
  for (const key of OFFLINE_CHAPTER_KEYS) {
    expect(CHAPTER_IN_THE_STORE[key]).toBeDefined()
  }
})

test("a chapter the offline writer shapes reads back out of the held cache", () => {
  const written = chapterPageForOffline(rowTheStoreAnswers())
  if (written === null) throw new Error("the writer shaped no page from a chapter that has a body")
  const readBack = parsePersistedContentPage(serializeContentPage(written))
  expect(readBack).not.toBeNull()
  expect(readBack?.id).toBe(CHAPTER_ID)
  expect(readBack?.text).toBe(BODY)
  expect(readBack?.body).toBe(BODY)
})

test("the writer keeps no key the writer never asked the store for", () => {
  const written = chapterPageForOffline(rowTheStoreAnswers())
  if (written === null) throw new Error("the writer shaped no page from a chapter that has a body")
  expect(Object.keys(written).sort()).toEqual([...OFFLINE_CHAPTER_KEYS, "text"].sort())
})

test("a chapter with no body is never handed to the cache", () => {
  expect(chapterPageForOffline({ ...rowTheStoreAnswers(), body: null })).toBeNull()
  expect(chapterPageForOffline({ ...rowTheStoreAnswers(), body: "" })).toBeNull()
})
