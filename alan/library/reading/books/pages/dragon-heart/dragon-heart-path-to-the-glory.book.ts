import type { Book } from "../../book.page-type.ts"

export const dragonHeartPathToTheGlory = {
  id: "019db533-f390-7e5d-a493-6ddaec66dbfe",
  pageTypeSlug: "book",
  slug: "dragon-heart-path-to-the-glory",
  title: "Dragon Heart: Path to the Glory",
  status: "completed",
  unitSlug: "words",
  position: 12,
  ownLength: 95250,
  ownProgress: 95250,
  publishedAt: "2021-08-25",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B096T17XP3",
  externalLink: "https://amazon.com/dp/B096T17XP3",
} as const satisfies Book
