import type { Book } from "../../book.page-type.ts"

export const theSecondWorldWarVolume6 = {
  id: "019db533-f39d-728a-9f27-861ba3c36954",
  pageTypeSlug: "book",
  slug: "the-second-world-war-volume-6",
  title: "The Second World War Volume 6",
  status: "not-started",
  author: "Winston S. Churchill",
  unitSlug: "words",
  position: 6,
  ownLength: 188750,
} as const satisfies Book
