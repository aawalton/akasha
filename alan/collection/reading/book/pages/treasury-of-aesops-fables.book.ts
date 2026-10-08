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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
