import type { Book } from "../../book.page-type.ts"

export const theStoryOfLiberty = {
  id: "019db533-f39d-758e-a656-fc30d4fed984",
  pageTypeSlug: "book",
  slug: "the-story-of-liberty",
  title: "The Story of Liberty",
  status: "not-started",
  author: "Charles Carleton Coffin",
  unitSlug: "words",
  position: 9,
  ownLength: 101000,
} as const satisfies Book
