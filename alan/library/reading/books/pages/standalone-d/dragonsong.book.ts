import type { Book } from "../../book.page-type.ts"

export const dragonsong = {
  id: "019db533-f399-7dcb-a5c6-af401904d3fa",
  pageTypeSlug: "book",
  slug: "dragonsong",
  title: "Dragonsong",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 17,
  ownLength: 50500,
} as const satisfies Book
