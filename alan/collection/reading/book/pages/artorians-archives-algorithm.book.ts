import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAlgorithm = {
  id: "019db533-f390-7823-9199-e331efcd454a",
  type: "page-type/book",
  slug: "artorians-archives-algorithm",
  title: "Artorian's Archives: Algorithm",
  status: "not-started",
  unit: "unit/words",
  position: 7,
  ownLength: 108000,
  publishedAt: "2021-04-28",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08XLWFRPM",
      externalLink: "https://amazon.com/dp/B08XLWFRPM",
    },
  ],
} as const satisfies Book
