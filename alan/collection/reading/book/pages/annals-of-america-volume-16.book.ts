import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume16 = {
  id: "019db533-f39d-7b58-870d-0c6d9d030096",
  type: "page-type/book",
  slug: "annals-of-america-volume-16",
  title: "Annals of America Volume 16",
  status: "not-started",
  unit: "unit/words",
  position: 16,
  ownLength: 155000,
} as const satisfies Book
