import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMurderAtTheVicarage = {
  id: "019db533-f399-7bd5-bf4f-93bb374462da",
  type: "page-type/book",
  slug: "the-murder-at-the-vicarage",
  title: "The Murder at the Vicarage",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 1,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
