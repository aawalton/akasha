import type { Book } from "../../book.page-type.ts"

export const commentariesOnTheLawsOfEnglandVolume2 = {
  id: "019db533-f39d-746a-a4d3-a3699d6e532d",
  pageTypeSlug: "book",
  slug: "commentaries-on-the-laws-of-england-volume-2",
  title: "Commentaries on the Laws of England Volume 2",
  kind: "read",
  status: "not-started",
  author: "Sir William Blackstone",
  unitSlug: "words",
  position: 2,
  ownLength: 130000,
} as const satisfies Book
