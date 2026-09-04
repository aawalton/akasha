import type { Book } from "../../book.page-type.ts"

export const theSecondWorldWarVolume5 = {
  id: "019db533-f39d-732f-a902-30d2c1e68ada",
  pageTypeSlug: "book",
  slug: "the-second-world-war-volume-5",
  title: "The Second World War Volume 5",
  kind: "read",
  status: "not-started",
  author: "Winston S. Churchill",
  unitSlug: "words",
  position: 5,
  ownLength: 178750,
} as const satisfies Book
