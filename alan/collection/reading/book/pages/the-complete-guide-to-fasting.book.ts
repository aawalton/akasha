import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompleteGuideToFasting = {
  id: "019db533-f39d-7ec7-90ff-4b8059801c6c",
  type: "page-type/book",
  slug: "the-complete-guide-to-fasting",
  title: "The Complete Guide to Fasting",
  status: "not-started",
  author: "Jason Fung",
  unit: "unit/words",
  ownLength: 114000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
