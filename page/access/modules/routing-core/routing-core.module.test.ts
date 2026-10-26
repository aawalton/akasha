import { expect, test } from "bun:test"
import {
  flattenRow,
  fromColumn,
  isPromotedKey,
} from "akasha/page/access/modules/routing-core/routing-core.module.code.ts"

const MARKED_AT = "2026-09-07T02:16:06.577Z"

const ROW = {
  id: "019fc2a9-cc9f-77d1-8d92-3d4c8bf09b6c",
  slug: "golden-pursuits-straight-to-the-crate",
  title: "Golden Pursuits",
  attributes: { lastCompletedAt: MARKED_AT },
  completed_at: MARKED_AT,
  favorited_at: null,
}

test("a page marked done is read back under the key that page's file states", () => {
  expect(flattenRow({ ...ROW }).completedAt).toBe(MARKED_AT)
})

test("a column holding nothing is read back as null", () => {
  expect(flattenRow({ ...ROW, completed_at: null }).completedAt).toBe(null)
})

test("a key the attributes hold is read back under that key", () => {
  expect(flattenRow({ ...ROW }).lastCompletedAt).toBe(MARKED_AT)
})

test("a column no key is held in is read back under no key", () => {
  expect(flattenRow({ ...ROW }).favoritedAt).toBe(undefined)
})

test("a page's status held in a column of its own is read back under its key", () => {
  expect(flattenRow({ ...ROW, status: "completed" }).status).toBe("completed")
  expect(fromColumn("status")).toBe("status")
  expect(isPromotedKey("status")).toBe(true)
})

test("the key a column is read under is the key that column is written from", () => {
  expect(fromColumn("completed_at")).toBe("completedAt")
  expect(isPromotedKey("completedAt")).toBe(true)
})
