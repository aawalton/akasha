import type { Book } from "../../book.page-type.ts"

export const theMortalMessiahVolume1 = {
  id: "019db533-f39d-724d-9887-f0c246a315dc",
  pageTypeSlug: "book",
  slug: "the-mortal-messiah-volume-1",
  title: "The Mortal Messiah Volume 1",
  status: "not-started",
  author: "Silas Farmer",
  unitSlug: "words",
  position: 2,
  ownLength: 126250,
} as const satisfies Book
