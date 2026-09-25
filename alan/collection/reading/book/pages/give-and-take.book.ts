import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const giveAndTake = {
  id: "019db533-f39e-7132-9b69-3bd762783289",
  type: "page-type/book",
  slug: "give-and-take",
  title: "Give and Take",
  status: "not-started",
  author: "Adam Grant, Adam M. Grant",
  unit: "unit/words",
  ownLength: 177450,
} as const satisfies Book
