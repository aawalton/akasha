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
} as const satisfies Book
