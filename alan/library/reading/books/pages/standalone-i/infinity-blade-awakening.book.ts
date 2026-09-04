import type { Book } from "../../book.page-type.ts"

export const infinityBladeAwakening = {
  id: "019db533-f39d-7055-a1e7-8690066a4780",
  pageTypeSlug: "book",
  slug: "infinity-blade-awakening",
  title: "Infinity Blade: Awakening",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 1,
  ownLength: 37500,
  ownProgress: 37500,
  source: "kindle",
  externalId: "B005SFRJ6K",
  externalLink: "https://www.amazon.com/dp/B005SFRJ6K",
} as const satisfies Book
