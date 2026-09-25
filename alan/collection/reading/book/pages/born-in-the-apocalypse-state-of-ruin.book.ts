import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bornInTheApocalypseStateOfRuin = {
  id: "019db533-f390-7a46-95a1-654cb6fc337e",
  type: "page-type/book",
  slug: "born-in-the-apocalypse-state-of-ruin",
  title: "Born in the Apocalypse: State Of Ruin",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 40750,
  publishedAt: "2016-09-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01LZ650J0",
      externalLink: "https://amazon.com/dp/B01LZ650J0",
    },
  ],
} as const satisfies Book
