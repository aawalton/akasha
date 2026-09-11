import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const emotionalFirstAid = {
  id: "019db533-f39e-7225-a5ac-e85cd02d98c5",
  type: "book",
  slug: "emotional-first-aid",
  title: "Emotional First Aid",
  status: "not-started",
  author: "Guy Winch",
  unit: "words",
  ownLength: 136200,
} as const satisfies Book
