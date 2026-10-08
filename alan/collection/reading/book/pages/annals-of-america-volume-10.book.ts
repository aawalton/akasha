import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume10 = {
  id: "019db533-f39d-7bb6-8688-1a5523fb3478",
  type: "page-type/book",
  slug: "annals-of-america-volume-10",
  title: "Annals of America Volume 10",
  status: "not-started",
  author: "willian benton",
  unit: "unit/words",
  position: 10,
  ownLength: 151500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
