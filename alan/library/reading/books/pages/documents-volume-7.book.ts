import type { Book } from "../book.page-type.types.ts"

export const documentsVolume7 = {
  id: "019db533-f39d-7509-a394-76d25dc8d60a",
  pageTypeSlug: "book",
  type: "book",
  slug: "documents-volume-7",
  title: "Documents Volume 7",
  status: "not-started",
  author: "New York (State) Legislature",
  unit: "words",
  position: 7,
} as const satisfies Book
