import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const arcaneAscensionOnTheShouldersOfTitans = {
  id: "019db533-f38a-7403-a97f-1ce3e4e1d476",
  type: "page-type/book",
  slug: "arcane-ascension-on-the-shoulders-of-titans",
  title: "Arcane Ascension: On the Shoulders of Titans",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 185500,
  ownProgress: 185500,
  publishedAt: "2018-05-14",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07D3C3RX4",
      externalLink: "https://amazon.com/dp/B07D3C3RX4",
    },
  ],
} as const satisfies Book
