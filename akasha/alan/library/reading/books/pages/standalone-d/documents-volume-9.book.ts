import type { Book } from "../../book.page-type.ts"

export const documentsVolume9 = {
  id: "019db533-f39d-747a-8beb-323adf43065d",
  pageTypeSlug: "book",
  slug: "documents-volume-9",
  title: "Documents Volume 9",
  kind: "read",
  status: "not-started",
  author: "New York (State). Legislature",
  unitSlug: "words",
  position: 9,
} as const satisfies Book
