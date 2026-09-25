import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const systemUniverseTrialsOfCydaria = {
  id: "019db533-f391-7765-90a6-67e1eb70b979",
  type: "page-type/book",
  slug: "system-universe-trials-of-cydaria",
  title: "System Universe: Trials of Cydaria",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 109500,
  ownProgress: 109500,
  publishedAt: "2023-08-15",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C4G3LPX1",
      externalLink: "https://amazon.com/dp/B0C4G3LPX1",
    },
  ],
} as const satisfies Book
