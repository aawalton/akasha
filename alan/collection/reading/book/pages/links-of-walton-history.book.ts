import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const linksOfWaltonHistory = {
  id: "019db533-f39d-7aaf-bede-a7518b011603",
  type: "page-type/book",
  slug: "links-of-walton-history",
  title: "Links of Walton History",
  status: "paused",
  unit: "unit/words",
  position: 2,
  ownLength: 96500,
  ownProgress: 3250,
} as const satisfies Book
