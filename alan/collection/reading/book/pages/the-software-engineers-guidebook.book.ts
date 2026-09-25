import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSoftwareEngineersGuidebook = {
  id: "019db533-f39d-75b6-89de-30c97b81c405",
  type: "page-type/book",
  slug: "the-software-engineers-guidebook",
  title: "The Software Engineer's Guidebook",
  status: "completed",
  grade: "B",
  author: "Gergely Orosz",
  unit: "unit/words",
  position: 4,
  ownLength: 97750,
  ownProgress: 97750,
} as const satisfies Book
