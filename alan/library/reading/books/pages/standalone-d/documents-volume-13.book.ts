import type { Book } from "../../book.page-type.ts"

export const documentsVolume13 = {
  id: "019db533-f39d-74ac-80bf-4bd9302bea52",
  pageTypeSlug: "book",
  slug: "documents-volume-13",
  title: "Documents Volume 13",
  status: "not-started",
  author: "Christian K. Heimburger",
  unitSlug: "words",
  position: 13,
} as const satisfies Book
