import type { Book } from "../../book.page-type.ts"

export const theRighteousMind = {
  id: "019db533-f39d-7e0f-81ea-38a92115d905",
  pageTypeSlug: "book",
  slug: "the-righteous-mind",
  title: "The Righteous Mind",
  status: "not-started",
  author: "Jonathan Haidt",
  unitSlug: "words",
  ownLength: 165300,
} as const satisfies Book
