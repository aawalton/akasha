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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
