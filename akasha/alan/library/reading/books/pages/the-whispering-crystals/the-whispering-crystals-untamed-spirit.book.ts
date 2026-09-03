import type { Book } from "../../book.page-type.ts"

export const theWhisperingCrystalsUntamedSpirit = {
  id: "019db533-f38b-758c-809f-69b48c825f01",
  pageTypeSlug: "book",
  slug: "the-whispering-crystals-untamed-spirit",
  title: "The Whispering Crystals: Untamed Spirit",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 5,
  ownLength: 128000,
  ownProgress: 128000,
  publishedAt: "2023-03-02",
  partOfSlugs: ["book-series/the-whispering-crystals"],
  source: "kindle",
  externalId: "B0BX1TZ2TD",
  externalLink: "https://amazon.com/dp/B0BX1TZ2TD",
} as const satisfies Book
