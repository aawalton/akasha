import type { Book } from "../../book.page-type.ts"

export const aCaribbeanMystery = {
  id: "019db533-f399-7b55-851a-9f79e6d78a4c",
  pageTypeSlug: "book",
  slug: "a-caribbean-mystery",
  title: "A Caribbean Mystery",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 10,
} as const satisfies Book
