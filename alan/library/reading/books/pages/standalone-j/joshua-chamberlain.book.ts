import type { Book } from "../../book.page-type.ts"

export const joshuaChamberlain = {
  id: "019db533-f39d-79c4-9f2f-cf9f4fd16e93",
  pageTypeSlug: "book",
  slug: "joshua-chamberlain",
  title: "Joshua Chamberlain",
  status: "completed",
  rank: "C",
  author: "John J. Pullen",
  unitSlug: "words",
  position: 4,
  ownLength: 47250,
  ownProgress: 47250,
} as const satisfies Book
