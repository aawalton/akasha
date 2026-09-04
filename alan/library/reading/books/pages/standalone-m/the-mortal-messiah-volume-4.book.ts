import type { Book } from "../../book.page-type.ts"

export const theMortalMessiahVolume4 = {
  id: "019db533-f39d-70fb-a066-94f7a52fce60",
  pageTypeSlug: "book",
  slug: "the-mortal-messiah-volume-4",
  title: "The Mortal Messiah Volume 4",
  kind: "read",
  status: "not-started",
  author: "Silas Farmer",
  unitSlug: "words",
  position: 5,
  ownLength: 109250,
} as const satisfies Book
