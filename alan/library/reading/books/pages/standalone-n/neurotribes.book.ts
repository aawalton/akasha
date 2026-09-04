import type { Book } from "../../book.page-type.ts"

export const neurotribes = {
  id: "019db533-f39e-702a-b7f3-9a5763751f41",
  pageTypeSlug: "book",
  slug: "neurotribes",
  title: "NeuroTribes",
  status: "completed",
  rank: "A",
  author: "Steve Silberman",
  unitSlug: "words",
  ownLength: 281550,
  ownProgress: 281550,
} as const satisfies Book
