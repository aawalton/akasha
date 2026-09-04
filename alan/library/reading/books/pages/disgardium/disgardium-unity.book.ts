import type { Book } from "../../book.page-type.ts"

export const disgardiumUnity = {
  id: "019db533-f390-7d77-bf71-acff4ca59fc8",
  pageTypeSlug: "book",
  slug: "disgardium-unity",
  title: "Disgardium: Unity",
  status: "not-started",
  unitSlug: "words",
  position: 12,
  ownLength: 135750,
  publishedAt: "2023-05-17",
  partOfSlugs: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B0BZ65MW45",
  externalLink: "https://amazon.com/dp/B0BZ65MW45",
} as const satisfies Book
