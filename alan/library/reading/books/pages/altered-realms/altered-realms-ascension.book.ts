import type { Book } from "../../book.page-type.ts"

export const alteredRealmsAscension = {
  id: "019db533-f390-76d0-a4ef-6d553e4f354f",
  pageTypeSlug: "book",
  slug: "altered-realms-ascension",
  title: "Altered Realms: Ascension",
  kind: "read",
  status: "not-started",
  author: "B. F. Rockriver",
  unitSlug: "words",
  position: 1,
  ownLength: 139250,
  publishedAt: "2020-04-28",
  partOfSlugs: ["book-series/altered-realms"],
  source: "kindle",
  externalId: "B087TDNRSF",
  externalLink: "https://amazon.com/dp/B087TDNRSF",
} as const satisfies Book
