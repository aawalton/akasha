import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bornInTheApocalypseJericho = {
  id: "019db533-f390-7a37-a7c9-83fb5ff7f98d",
  type: "page-type/book",
  slug: "born-in-the-apocalypse-jericho",
  title: "Born in the Apocalypse: Jericho",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 45250,
  publishedAt: "2017-04-18",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B06ZYHMWLD",
      externalLink: "https://amazon.com/dp/B06ZYHMWLD",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
