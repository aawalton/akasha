import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume19 = {
  id: "019db533-f39d-7b41-90ec-534ec4f9b0fc",
  type: "page-type/book",
  slug: "annals-of-america-volume-19",
  title: "Annals of America Volume 19",
  status: "not-started",
  unit: "unit/words",
  position: 19,
  ownLength: 107750,
} as const satisfies Book
