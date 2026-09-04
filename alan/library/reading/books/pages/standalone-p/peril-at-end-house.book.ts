import type { Book } from "../../book.page-type.ts"

export const perilAtEndHouse = {
  id: "019db533-f399-7cd5-af14-e4b7a4178486",
  pageTypeSlug: "book",
  slug: "peril-at-end-house",
  title: "Peril at End House",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 7,
  ownLength: 67500,
} as const satisfies Book
