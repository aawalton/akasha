import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const connect = {
  id: "019db533-f39e-716a-b79e-e7ce69613350",
  type: "page-type/book",
  slug: "connect",
  title: "Connect",
  status: "not-started",
  author: "Neil Alexander Campbell, Lawrence G. Mitchell, Jane B. Reece",
  unit: "unit/words",
  ownLength: 154800,
} as const satisfies Book
