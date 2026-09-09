import type { Book } from "../book.page-type.ts"

export const theMurderAtTheVicarage = {
  id: "019db533-f399-7bd5-bf4f-93bb374462da",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-murder-at-the-vicarage",
  title: "The Murder at the Vicarage",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 1,
} as const satisfies Book
