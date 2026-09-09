import type { Book } from "../book.page-type.ts"

export const documentsVolume15 = {
  id: "019db533-f39d-7444-9860-938d002b101c",
  pageTypeSlug: "book",
  type: "book",
  slug: "documents-volume-15",
  title: "Documents Volume 15",
  status: "not-started",
  author: "New York (State). Legislature",
  unit: "words",
  position: 15,
} as const satisfies Book
