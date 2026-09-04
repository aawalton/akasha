import type { Book } from "../../book.page-type.ts"

export const poirotInvestigates = {
  id: "019db533-f399-7d6b-a975-7efb3c489b8f",
  pageTypeSlug: "book",
  slug: "poirot-investigates",
  title: "Poirot Investigates",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 3,
  ownLength: 77500,
} as const satisfies Book
