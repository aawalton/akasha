import type { Book } from "../../book.page-type.ts"

export const documentsVolume7 = {
  id: "019db533-f39d-7509-a394-76d25dc8d60a",
  pageTypeSlug: "book",
  slug: "documents-volume-7",
  title: "Documents Volume 7",
  kind: "read",
  status: "not-started",
  author: "New York (State) Legislature",
  unitSlug: "words",
  position: 7,
} as const satisfies Book
