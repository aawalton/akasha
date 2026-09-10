import type { Book } from "../book.page-type.types.ts"

export const abundance = {
  id: "019db533-f39e-721d-bdce-4f08e7c84710",
  pageTypeSlug: "book",
  type: "book",
  slug: "abundance",
  title: "Abundance",
  status: "completed",
  rank: "A",
  author: "John Green",
  unit: "words",
  ownLength: 108450,
  ownProgress: 108450,
} as const satisfies Book
