import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const commentariesOnTheLawsOfEnglandVolume4 = {
  id: "019db533-f39d-7502-b40e-aa3a5542dbac",
  type: "page-type/book",
  slug: "commentaries-on-the-laws-of-england-volume-4",
  title: "Commentaries on the Laws of England Volume 4",
  status: "not-started",
  author: "Sir William Blackstone",
  unit: "unit/words",
  position: 4,
  ownLength: 109000,
} as const satisfies Book
