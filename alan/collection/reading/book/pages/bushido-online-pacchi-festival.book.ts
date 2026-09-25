import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bushidoOnlinePacchiFestival = {
  id: "019db533-f390-7588-aa58-c1eedabcde12",
  type: "page-type/book",
  slug: "bushido-online-pacchi-festival",
  title: "Bushido Online: Pacchi Festival",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 108000,
  ownProgress: 108000,
  publishedAt: "2021-08-02",
  partOfCollections: ["book-series/bushido-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B096KV4K9C",
      externalLink: "https://amazon.com/dp/B096KV4K9C",
    },
  ],
} as const satisfies Book
