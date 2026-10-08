import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume7 = {
  id: "019db533-f39d-7b6d-9f2e-8836ce43b998",
  type: "page-type/book",
  slug: "annals-of-america-volume-7",
  title: "Annals of America Volume 7",
  status: "not-started",
  author: "Inc Encyclopaedia Britannica",
  unit: "unit/words",
  position: 7,
  ownLength: 140750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
