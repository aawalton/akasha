import type { Book } from "../../book.page-type.ts"

export const commentariesOnTheLawsOfEnglandVolume1 = {
  id: "019db533-f39d-74cc-8b28-9e541433e2ba",
  pageTypeSlug: "book",
  slug: "commentaries-on-the-laws-of-england-volume-1",
  title: "Commentaries on the Laws of England Volume 1",
  kind: "read",
  status: "paused",
  author: "William Blackstone",
  unitSlug: "words",
  position: 1,
  ownLength: 118250,
  ownProgress: 500,
} as const satisfies Book
