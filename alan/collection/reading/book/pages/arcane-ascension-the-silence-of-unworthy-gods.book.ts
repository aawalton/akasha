import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const arcaneAscensionTheSilenceOfUnworthyGods = {
  id: "019db533-f38a-73cc-9c00-87e4df80f795",
  type: "page-type/book",
  slug: "arcane-ascension-the-silence-of-unworthy-gods",
  title: "Arcane Ascension: The Silence of Unworthy Gods",
  status: "not-started",
  unit: "unit/words",
  position: 4,
  ownLength: 157500,
  publishedAt: "2022-10-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BH1SZV33",
      externalLink: "https://amazon.com/dp/B0BH1SZV33",
    },
  ],
} as const satisfies Book
