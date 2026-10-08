import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const collectedDiscoursesVolume3 = {
  id: "019db533-f39d-7567-90a9-b234a3c069d7",
  type: "page-type/book",
  slug: "collected-discourses-volume-3",
  title: "Collected Discourses Volume 3",
  status: "not-started",
  author: "Theodore Parker",
  unit: "unit/words",
  position: 3,
  ownLength: 107000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
