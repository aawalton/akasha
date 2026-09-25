import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume14 = {
  id: "019db533-f39d-7c0f-b0ce-1b78405833b7",
  type: "page-type/book",
  slug: "annals-of-america-volume-14",
  title: "Annals of America Volume 14",
  status: "not-started",
  author: "Annals",
  unit: "unit/words",
  position: 14,
  ownLength: 153500,
} as const satisfies Book
