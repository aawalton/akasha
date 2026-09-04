import type { Book } from "../../book.page-type.ts"

export const disgardiumResistance = {
  id: "019db533-f390-7da7-9dad-76feb80b95fb",
  pageTypeSlug: "book",
  slug: "disgardium-resistance",
  title: "Disgardium: Resistance",
  status: "completed",
  unitSlug: "words",
  position: 4,
  ownLength: 128250,
  ownProgress: 128250,
  publishedAt: "2020-04-29",
  partOfSlugs: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B084VPKL7N",
  externalLink: "https://amazon.com/dp/B084VPKL7N",
} as const satisfies Book
