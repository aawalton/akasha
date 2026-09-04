import type { Book } from "../../book.page-type.ts"

export const somniaOnlineSynergy = {
  id: "019db533-f391-7642-92ed-5c85644048c9",
  pageTypeSlug: "book",
  slug: "somnia-online-synergy",
  title: "Somnia Online: Synergy",
  status: "completed",
  unitSlug: "words",
  position: 7,
  ownLength: 89500,
  ownProgress: 89500,
  publishedAt: "2020-11-12",
  partOfSlugs: ["book-series/somnia-online"],
  source: "kindle",
  externalId: "B08MTKN7BG",
  externalLink: "https://amazon.com/dp/B08MTKN7BG",
} as const satisfies Book
