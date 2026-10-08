import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const howNotToDie = {
  id: "019db533-f39e-710a-8db9-627ed3254a36",
  type: "page-type/book",
  slug: "how-not-to-die",
  title: "How Not to Die",
  status: "not-started",
  author: "Michael Greger, Gene Stone",
  unit: "unit/words",
  ownLength: 264000,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
