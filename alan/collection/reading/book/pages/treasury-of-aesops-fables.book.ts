import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const treasuryOfAesopsFables = {
  id: "019db533-f39d-75cf-a90d-813f2a0b0c46",
  type: "page-type/book",
  slug: "treasury-of-aesops-fables",
  title: "Treasury of Aesop's Fables",
  status: "not-started",
  author: "Val Biro",
  unit: "unit/words",
  position: 7,
  ownLength: 34500,
} as const satisfies Book
