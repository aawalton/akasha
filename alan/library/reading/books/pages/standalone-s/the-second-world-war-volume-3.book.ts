import type { Book } from "../../book.page-type.ts"

export const theSecondWorldWarVolume3 = {
  id: "019db533-f39d-7317-b2a4-5a813acf9d55",
  pageTypeSlug: "book",
  slug: "the-second-world-war-volume-3",
  title: "The Second World War Volume 3",
  status: "not-started",
  author: "Winston S. Churchill",
  unitSlug: "words",
  position: 3,
  ownLength: 217750,
} as const satisfies Book
