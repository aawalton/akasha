import type { Book } from "../../book.page-type.ts"

export const skyDragons = {
  id: "019db533-f399-7dc0-aa5c-75f062809d1c",
  pageTypeSlug: "book",
  slug: "sky-dragons",
  title: "Sky Dragons",
  kind: "read",
  status: "not-started",
  author: "Anne McCaffrey, Todd McCaffrey, Emily Durante",
  unitSlug: "words",
  position: 11,
  ownLength: 86000,
} as const satisfies Book
