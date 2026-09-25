import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldTheLastHeroADiscworldFable = {
  id: "019db533-f388-7d7e-b209-db8f5530d8f7",
  type: "page-type/book",
  slug: "discworld-the-last-hero-a-discworld-fable",
  title: "Discworld: The Last Hero: A Discworld Fable",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 27,
  ownLength: 44000,
  publishedAt: "2002-08-20",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0060507772",
      externalLink: "https://www.amazon.com/gp/product/0060507772",
    },
  ],
} as const satisfies Book
