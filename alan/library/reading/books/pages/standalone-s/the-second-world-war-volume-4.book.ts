import type { Book } from "../../book.page-type.ts"

export const theSecondWorldWarVolume4 = {
  id: "019db533-f39d-73cc-93f2-60eac07df87c",
  pageTypeSlug: "book",
  slug: "the-second-world-war-volume-4",
  title: "The Second World War Volume 4",
  status: "not-started",
  author: "Winston S. Churchill",
  unitSlug: "words",
  position: 4,
  ownLength: 240000,
} as const satisfies Book
