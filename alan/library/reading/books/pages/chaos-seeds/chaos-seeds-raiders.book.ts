import type { Book } from "../../book.page-type.ts"

export const chaosSeedsRaiders = {
  id: "019db533-f390-7a7b-803c-02f6c25ba8f7",
  pageTypeSlug: "book",
  slug: "chaos-seeds-raiders",
  title: "Chaos Seeds: Raiders",
  kind: "read",
  status: "completed",
  rank: "C",
  unitSlug: "words",
  position: 6,
  ownLength: 127500,
  ownProgress: 127500,
  publishedAt: "2017-01-28",
  partOfSlugs: ["book-series/chaos-seeds"],
  source: "kindle",
  externalId: "B01N38VFHJ",
  externalLink: "https://amazon.com/dp/B01N38VFHJ",
} as const satisfies Book
