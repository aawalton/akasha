import type { Book } from "../../book.page-type.ts"

export const theSecondWorldWarVolume2 = {
  id: "019db533-f39d-738e-857e-c9b4f59a6eb1",
  pageTypeSlug: "book",
  slug: "the-second-world-war-volume-2",
  title: "The Second World War Volume 2",
  status: "not-started",
  author: "Winston S. Churchill",
  unitSlug: "words",
  position: 2,
  ownLength: 180500,
} as const satisfies Book
