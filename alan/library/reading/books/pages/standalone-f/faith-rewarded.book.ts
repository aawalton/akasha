import type { Book } from "../../book.page-type.ts"

export const faithRewarded = {
  id: "019db533-f39d-7968-923f-eab655cc7d21",
  pageTypeSlug: "book",
  slug: "faith-rewarded",
  title: "Faith Rewarded",
  kind: "read",
  status: "not-started",
  author: "Monson, Thomas S.",
  unitSlug: "words",
  position: 9,
  ownLength: 44000,
} as const satisfies Book
