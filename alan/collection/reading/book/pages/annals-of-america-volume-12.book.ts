import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume12 = {
  id: "019db533-f39d-7bce-8580-7cdeafa6d53f",
  type: "page-type/book",
  slug: "annals-of-america-volume-12",
  title: "Annals of America Volume 12",
  status: "not-started",
  author: "Encyclopedia Britannica",
  unit: "unit/words",
  position: 12,
  ownLength: 149750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
