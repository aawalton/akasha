import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theHeroWithAThousandFaces = {
  id: "019db533-f39d-7edf-955f-da21087c9ab3",
  type: "page-type/book",
  slug: "the-hero-with-a-thousand-faces",
  title: "The Hero with a Thousand Faces",
  status: "not-started",
  author: "Joseph Campbell",
  unit: "unit/words",
  ownLength: 219300,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
