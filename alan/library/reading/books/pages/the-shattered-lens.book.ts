import type { Book } from "../book.page-type.types.ts"

export const theShatteredLens = {
  id: "019db533-f39d-70cb-9214-e1d81e7f8684",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-shattered-lens",
  title: "The Shattered Lens",
  status: "completed",
  rank: "B",
  author: "Jonathan Alpeyrie",
  unit: "words",
  position: 4,
  ownLength: 80250,
  ownProgress: 80250,
} as const satisfies Book
