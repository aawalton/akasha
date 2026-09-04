import type { Book } from "../../book.page-type.ts"

export const stonehavenLeagueThroneOfTheAncients = {
  id: "019db533-f391-7696-bfcd-a9e7904108e5",
  pageTypeSlug: "book",
  slug: "stonehaven-league-throne-of-the-ancients",
  title: "Stonehaven League: Throne of the Ancients",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 6,
  ownLength: 87500,
  ownProgress: 87500,
  publishedAt: "2019-08-13",
  partOfSlugs: ["book-series/stonehaven-league"],
  source: "kindle",
  externalId: "B07W584LKQ",
  externalLink: "https://amazon.com/dp/B07W584LKQ",
} as const satisfies Book
