import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFederalist = {
  id: "019db533-f39d-78cf-8ee5-37c911a5eb2d",
  type: "page-type/book",
  slug: "the-federalist",
  title: "The Federalist",
  status: "not-started",
  author: "Alexander Hamilton, James Madison, John Jay",
  unit: "unit/words",
  position: 12,
  ownLength: 147750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
