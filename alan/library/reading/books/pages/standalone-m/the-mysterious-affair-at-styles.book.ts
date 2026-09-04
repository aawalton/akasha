import type { Book } from "../../book.page-type.ts"

export const theMysteriousAffairAtStyles = {
  id: "019db533-f399-7ce0-8ae5-1d20eb94ae78",
  pageTypeSlug: "book",
  slug: "the-mysterious-affair-at-styles",
  title: "The Mysterious Affair at Styles",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 1,
  ownLength: 74000,
} as const satisfies Book
