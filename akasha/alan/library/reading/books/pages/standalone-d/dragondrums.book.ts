import type { Book } from "../../book.page-type.ts"

export const dragondrums = {
  id: "019db533-f399-7db5-bb55-c9cb68e33b85",
  pageTypeSlug: "book",
  slug: "dragondrums",
  title: "Dragondrums",
  kind: "read",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 19,
  ownLength: 60000,
} as const satisfies Book
