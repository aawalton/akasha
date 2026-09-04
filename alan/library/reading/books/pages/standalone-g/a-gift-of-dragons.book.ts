import type { Book } from "../../book.page-type.ts"

export const aGiftOfDragons = {
  id: "019db533-f399-7da0-a053-78d05bdc7a59",
  pageTypeSlug: "book",
  slug: "a-gift-of-dragons",
  title: "A Gift of Dragons",
  kind: "read",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 25,
  ownLength: 76000,
} as const satisfies Book
