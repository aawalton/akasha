import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume1 = {
  id: "019db533-f39d-7c6e-9caf-60ec5197245a",
  type: "page-type/book",
  slug: "annals-of-america-volume-1",
  title: "Annals of America Volume 1",
  status: "completed",
  grade: "C",
  author: "WILLIAM BENTON",
  unit: "unit/words",
  position: 1,
  ownLength: 131500,
  ownProgress: 131500,
} as const satisfies Book
