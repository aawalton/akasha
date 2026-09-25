import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFirebrandViridianGateOnline = {
  id: "019db533-f38a-732a-b30a-c4c0e336bc86",
  type: "page-type/book",
  slug: "the-firebrand-viridian-gate-online",
  title: "The Firebrand: Viridian Gate Online",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 69500,
  ownProgress: 69500,
  publishedAt: "2019-02-26",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07NDYY91Y",
      externalLink: "https://amazon.com/dp/B07NDYY91Y",
    },
  ],
} as const satisfies Book
