import type { Book } from "../../book.page-type.ts"

export const theKnightsOfCrystallia = {
  id: "019db533-f39d-7206-a727-51eca1aae853",
  pageTypeSlug: "book",
  slug: "the-knights-of-crystallia",
  title: "The Knights of Crystallia",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 3,
  ownLength: 77250,
  ownProgress: 77250,
} as const satisfies Book
