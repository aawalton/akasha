import type { Book } from "../../book.page-type.ts"

export const documentsVolume12 = {
  id: "019db533-f39d-740a-81f8-8bc4bf2c68ec",
  pageTypeSlug: "book",
  slug: "documents-volume-12",
  title: "Documents Volume 12",
  kind: "read",
  status: "not-started",
  author: "Matthew C. Godfrey, R. Eric Smith, Mathew J. Grow, Ronald K. Esplin",
  unitSlug: "words",
  position: 12,
} as const satisfies Book
