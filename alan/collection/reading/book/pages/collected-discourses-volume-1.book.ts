import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const collectedDiscoursesVolume1 = {
  id: "019db533-f39d-756f-8980-aa6eb905f810",
  type: "page-type/book",
  slug: "collected-discourses-volume-1",
  title: "Collected Discourses Volume 1",
  status: "not-started",
  author: "Theodore Parker",
  unit: "unit/words",
  position: 1,
  ownLength: 99250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
