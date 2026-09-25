import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume21 = {
  id: "019db533-f39d-7b8e-ac36-86821e22c3f8",
  type: "page-type/book",
  slug: "annals-of-america-volume-21",
  title: "Annals of America Volume 21",
  status: "not-started",
  author: "Encyclopedia Britannica",
  unit: "unit/words",
  position: 21,
  ownLength: 163750,
} as const satisfies Book
