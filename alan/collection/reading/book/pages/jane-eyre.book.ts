import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const janeEyre = {
  id: "019db533-f39d-7ac7-b6bb-cbfa4f9b1349",
  type: "page-type/book",
  slug: "jane-eyre",
  title: "Jane Eyre",
  status: "not-started",
  author: "Charlotte Brontë",
  unit: "unit/words",
  position: 9,
  ownLength: 107750,
} as const satisfies Book
