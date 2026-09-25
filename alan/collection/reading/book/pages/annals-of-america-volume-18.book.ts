import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume18 = {
  id: "019db533-f39d-7ba7-9ab3-5716feafc0c4",
  type: "page-type/book",
  slug: "annals-of-america-volume-18",
  title: "Annals of America Volume 18",
  status: "not-started",
  unit: "unit/words",
  position: 18,
  ownLength: 170250,
} as const satisfies Book
