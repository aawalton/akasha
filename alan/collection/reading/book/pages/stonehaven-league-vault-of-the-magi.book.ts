import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const stonehavenLeagueVaultOfTheMagi = {
  id: "019db533-f391-768e-bad9-9d4cedb0393f",
  type: "page-type/book",
  slug: "stonehaven-league-vault-of-the-magi",
  title: "Stonehaven League: Vault of the Magi",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 93500,
  ownProgress: 93500,
  publishedAt: "2019-03-28",
  partOfCollections: ["book-series/stonehaven-league"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07PPVXTKX",
      externalLink: "https://amazon.com/dp/B07PPVXTKX",
    },
  ],
} as const satisfies Book
