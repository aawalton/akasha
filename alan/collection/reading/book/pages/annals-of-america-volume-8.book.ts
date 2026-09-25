import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume8 = {
  id: "019db533-f39d-7b75-a3c9-6112fd0d1a3e",
  type: "page-type/book",
  slug: "annals-of-america-volume-8",
  title: "Annals of America Volume 8",
  status: "not-started",
  author: "WILLIAM BENTON",
  unit: "unit/words",
  position: 8,
  ownLength: 126250,
} as const satisfies Book
