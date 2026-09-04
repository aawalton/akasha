import type { Book } from "../../book.page-type.ts"

export const theSecondWorldWarVolume1 = {
  id: "019db533-f39d-7386-b157-c2622cb29897",
  pageTypeSlug: "book",
  slug: "the-second-world-war-volume-1",
  title: "The Second World War Volume 1",
  status: "not-started",
  author: "Winston S. Churchill",
  unitSlug: "words",
  position: 1,
  ownLength: 190250,
} as const satisfies Book
