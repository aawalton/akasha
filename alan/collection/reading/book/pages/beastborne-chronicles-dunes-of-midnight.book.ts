import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beastborneChroniclesDunesOfMidnight = {
  id: "019db533-f390-78d9-aaa6-3360ad447980",
  type: "page-type/book",
  slug: "beastborne-chronicles-dunes-of-midnight",
  title: "Beastborne Chronicles: Dunes of Midnight",
  status: "completed",
  unit: "unit/words",
  position: 7,
  ownLength: 148750,
  ownProgress: 148750,
  publishedAt: "2025-01-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DBFNCYGW",
      externalLink: "https://amazon.com/dp/B0DBFNCYGW",
    },
  ],
} as const satisfies Book
