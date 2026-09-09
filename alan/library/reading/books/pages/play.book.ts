import type { Book } from "../book.page-type.ts"

export const play = {
  id: "019db533-f39e-7022-91f9-bae533384e16",
  pageTypeSlug: "book",
  type: "book",
  slug: "play",
  title: "Play",
  status: "not-started",
  author: "Eric Berne",
  unit: "words",
  ownLength: 105450,
} as const satisfies Book
