import type { Book } from "../../book.page-type.ts"

export const theCalamitousBobInKazar = {
  id: "019db533-f391-7814-8d20-071476376f73",
  pageTypeSlug: "book",
  slug: "the-calamitous-bob-in-kazar",
  title: "The Calamitous Bob: In Kazar",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 2,
  ownLength: 90000,
  ownProgress: 90000,
  publishedAt: "2022-06-05",
  source: "kindle",
  externalId: "B0B3874Y1C",
  externalLink: "https://amazon.com/dp/B0B3874Y1C",
} as const satisfies Book
