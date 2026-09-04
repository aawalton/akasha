import type { Book } from "../../book.page-type.ts"

export const theWayOfKings = {
  id: "019db533-f39d-7006-970d-c25a8110a108",
  pageTypeSlug: "book",
  slug: "the-way-of-kings",
  title: "The Way of Kings",
  status: "paused",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 1,
  ownLength: 301500,
  ownProgress: 83000,
  source: "kindle",
  externalId: "B003P2WO5E",
  externalLink: "https://www.amazon.com/dp/B003P2WO5E",
} as const satisfies Book
