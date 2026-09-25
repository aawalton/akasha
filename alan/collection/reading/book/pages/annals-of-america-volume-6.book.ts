import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume6 = {
  id: "019db533-f39d-7bef-8264-25cc9f5fbac3",
  type: "page-type/book",
  slug: "annals-of-america-volume-6",
  title: "Annals of America Volume 6",
  status: "not-started",
  author: "Editors",
  unit: "unit/words",
  position: 6,
  ownLength: 143750,
} as const satisfies Book
