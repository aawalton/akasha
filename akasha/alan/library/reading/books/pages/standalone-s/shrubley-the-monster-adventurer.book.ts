import type { Book } from "../../book.page-type.ts"

export const shrubleyTheMonsterAdventurer = {
  id: "019db533-f38a-7469-bd72-1530b10b9489",
  pageTypeSlug: "book",
  slug: "shrubley-the-monster-adventurer",
  title: "Shrubley, The Monster Adventurer",
  kind: "read",
  status: "completed",
  rank: "C",
  unitSlug: "words",
  position: 1,
  ownLength: 147000,
  ownProgress: 147000,
  publishedAt: "2024-03-01",
  source: "kindle",
  externalId: "B0CW1L7SP4",
  externalLink: "https://amazon.com/dp/B0CW1L7SP4",
} as const satisfies Book
