import type { Book } from "../../book.page-type.ts"

export const afterTheFuneral = {
  id: "019db533-f399-7c0b-b9b0-2db342c1f30d",
  pageTypeSlug: "book",
  slug: "after-the-funeral",
  title: "After the Funeral",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 25,
} as const satisfies Book
