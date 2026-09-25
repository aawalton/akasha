import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const connected = {
  id: "019db533-f39e-726b-ab2e-3ab319b509c4",
  type: "page-type/book",
  slug: "connected",
  title: "Connected",
  status: "not-started",
  author: "Neil Alexander Campbell, Lawrence G. Mitchell, Jane B. Reece",
  unit: "unit/words",
  ownLength: 157950,
} as const satisfies Book
