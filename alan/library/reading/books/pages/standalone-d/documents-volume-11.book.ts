import type { Book } from "../../book.page-type.ts"

export const documentsVolume11 = {
  id: "019db533-f39d-74e2-a621-8d15b46b5d0b",
  pageTypeSlug: "book",
  slug: "documents-volume-11",
  title: "Documents Volume 11",
  kind: "read",
  status: "not-started",
  author: "Martin Gilbert, Winston Churchill - undifferentiated",
  unitSlug: "words",
  position: 11,
} as const satisfies Book
