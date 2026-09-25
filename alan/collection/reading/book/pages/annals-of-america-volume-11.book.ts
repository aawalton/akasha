import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfAmericaVolume11 = {
  id: "019db533-f39d-7afc-9104-bfdd048cfd45",
  type: "page-type/book",
  slug: "annals-of-america-volume-11",
  title: "Annals of America Volume 11",
  status: "not-started",
  unit: "unit/words",
  position: 11,
  ownLength: 146000,
} as const satisfies Book
