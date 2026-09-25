import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const arcaneAscensionSufficientlyAdvancedMagic = {
  id: "019db533-f38a-73f2-afb9-9054d65e3bdc",
  type: "page-type/book",
  slug: "arcane-ascension-sufficiently-advanced-magic",
  title: "Arcane Ascension: Sufficiently Advanced Magic",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 156250,
  ownProgress: 156250,
  publishedAt: "2017-02-26",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B06XBFD7CB",
      externalLink: "https://amazon.com/dp/B06XBFD7CB",
    },
  ],
} as const satisfies Book
