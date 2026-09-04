import type { Book } from "../../book.page-type.ts"

export const disgardiumPathOfSpirit = {
  id: "019db533-f390-7d97-a287-6a8dc598f914",
  pageTypeSlug: "book",
  slug: "disgardium-path-of-spirit",
  title: "Disgardium: Path of Spirit",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 6,
  ownLength: 128750,
  publishedAt: "2021-02-17",
  partOfSlugs: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B08NZ2G98P",
  externalLink: "https://amazon.com/dp/B08NZ2G98P",
} as const satisfies Book
