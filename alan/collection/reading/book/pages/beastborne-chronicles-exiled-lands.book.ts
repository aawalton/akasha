import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beastborneChroniclesExiledLands = {
  id: "019db533-f390-7565-8b4e-601dc33094f7",
  type: "page-type/book",
  slug: "beastborne-chronicles-exiled-lands",
  title: "Beastborne Chronicles: Exiled Lands",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 333500,
  ownProgress: 333500,
  publishedAt: "2020-10-24",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08LTWXSVV",
      externalLink: "https://amazon.com/dp/B08LTWXSVV",
    },
  ],
} as const satisfies Book
