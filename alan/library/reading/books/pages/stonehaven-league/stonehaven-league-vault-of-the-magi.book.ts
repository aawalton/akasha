import type { Book } from "../../book.page-type.ts"

export const stonehavenLeagueVaultOfTheMagi = {
  id: "019db533-f391-768e-bad9-9d4cedb0393f",
  pageTypeSlug: "book",
  slug: "stonehaven-league-vault-of-the-magi",
  title: "Stonehaven League: Vault of the Magi",
  status: "completed",
  unitSlug: "words",
  position: 5,
  ownLength: 93500,
  ownProgress: 93500,
  publishedAt: "2019-03-28",
  partOfSlugs: ["book-series/stonehaven-league"],
  source: "kindle",
  externalId: "B07PPVXTKX",
  externalLink: "https://amazon.com/dp/B07PPVXTKX",
} as const satisfies Book
