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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
