import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const drive = {
  id: "019db533-f39e-723c-986f-bfe728b5cfb5",
  type: "page-type/book",
  slug: "drive",
  title: "Drive",
  status: "not-started",
  author: "Daniel H. Pink",
  unit: "unit/words",
  ownLength: 88200,
} as const satisfies Book
