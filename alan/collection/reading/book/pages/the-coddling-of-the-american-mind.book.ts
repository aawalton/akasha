import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCoddlingOfTheAmericanMind = {
  id: "019db533-f39d-7dff-a01a-eacd3fe2fce3",
  type: "page-type/book",
  slug: "the-coddling-of-the-american-mind",
  title: "The Coddling of the American Mind",
  status: "not-started",
  author: "Greg Lukianoff, Jonathan Haidt",
  unit: "unit/words",
  ownLength: 151500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
