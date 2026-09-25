import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFoundersConstitutionVolume1 = {
  id: "019db533-f39d-73d4-9357-cfe8f7530893",
  type: "page-type/book",
  slug: "the-founders-constitution-volume-1",
  title: "The Founders Constitution Volume 1",
  status: "not-started",
  author: "Philip B. Kurland, Ralph Lerner",
  unit: "unit/words",
  position: 1,
  ownLength: 173000,
} as const satisfies Book
