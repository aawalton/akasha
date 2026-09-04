import type { Book } from "../../book.page-type.ts"

export const autobiographyOfBenjaminFranklin = {
  id: "019db533-f39d-7b32-b023-e872a39d6f3f",
  pageTypeSlug: "book",
  slug: "autobiography-of-benjamin-franklin",
  title: "Autobiography of Benjamin Franklin",
  status: "completed",
  rank: "A",
  author: "Benjamin Franklin, D. Brown",
  unitSlug: "words",
  position: 1,
  ownLength: 68000,
  ownProgress: 68000,
} as const satisfies Book
