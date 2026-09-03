import type { Book } from "../../book.page-type.ts"

export const accidentalGenius = {
  id: "019db533-f39e-71b5-888e-27fb81654963",
  pageTypeSlug: "book",
  slug: "accidental-genius",
  title: "Accidental Genius",
  kind: "read",
  status: "not-started",
  author: "Marshall Fine",
  unitSlug: "words",
  ownLength: 66750,
} as const satisfies Book
