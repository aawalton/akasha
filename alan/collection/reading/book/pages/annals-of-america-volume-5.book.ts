import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume5 = {
  id: "019db533-f39d-7b7f-8fc9-6930f0a37683",
  type: "page-type/book",
  slug: "annals-of-america-volume-5",
  title: "Annals of America Volume 5",
  status: "not-started",
  author: "Editors",
  unit: "unit/words",
  position: 5,
  ownLength: 148250,
} as const satisfies Book
