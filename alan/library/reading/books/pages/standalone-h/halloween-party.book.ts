import type { Book } from "../../book.page-type.ts"

export const halloweenParty = {
  id: "019db533-f399-7d55-9367-c86f3e3d323d",
  pageTypeSlug: "book",
  slug: "halloween-party",
  title: "Hallowe'en Party",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 31,
} as const satisfies Book
