import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ivanhoe = {
  id: "019db533-f39d-79d6-acfa-9ad6ac5ce45e",
  type: "page-type/book",
  slug: "ivanhoe",
  title: "Ivanhoe",
  status: "not-started",
  author: "Sir Walter Scott",
  unit: "unit/words",
  position: 8,
  ownLength: 112500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
