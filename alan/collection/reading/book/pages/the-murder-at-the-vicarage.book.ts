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
} as const satisfies Book
