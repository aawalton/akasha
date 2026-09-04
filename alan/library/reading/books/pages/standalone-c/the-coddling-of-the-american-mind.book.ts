import type { Book } from "../../book.page-type.ts"

export const theCoddlingOfTheAmericanMind = {
  id: "019db533-f39d-7dff-a01a-eacd3fe2fce3",
  pageTypeSlug: "book",
  slug: "the-coddling-of-the-american-mind",
  title: "The Coddling of the American Mind",
  status: "not-started",
  author: "Greg Lukianoff, Jonathan Haidt",
  unitSlug: "words",
  ownLength: 151500,
} as const satisfies Book
