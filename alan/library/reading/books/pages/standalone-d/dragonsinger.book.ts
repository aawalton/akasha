import type { Book } from "../../book.page-type.ts"

export const dragonsinger = {
  id: "019db533-f399-7dab-a4b6-6c84a420a277",
  pageTypeSlug: "book",
  slug: "dragonsinger",
  title: "Dragonsinger",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 18,
  ownLength: 66000,
} as const satisfies Book
