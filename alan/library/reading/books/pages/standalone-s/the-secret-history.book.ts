import type { Book } from "../../book.page-type.ts"

export const theSecretHistory = {
  id: "019db533-f39d-7031-b232-33090c8dca49",
  pageTypeSlug: "book",
  slug: "the-secret-history",
  title: "The Secret History",
  kind: "read",
  status: "not-started",
  author: "Donna Tartt",
  unitSlug: "words",
  position: 4,
  ownLength: 42500,
} as const satisfies Book
