import type { Book } from "../../book.page-type.ts"

export const riseOfTheDevourerDragonWarrior = {
  id: "019db533-f391-74c0-b4ae-5fae470bd92d",
  pageTypeSlug: "book",
  slug: "rise-of-the-devourer-dragon-warrior",
  title: "Rise of the Devourer: Dragon Warrior",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 3,
  ownLength: 110750,
  publishedAt: "2024-07-03",
  partOfSlugs: ["book-series/rise-of-the-devourer"],
  source: "kindle",
  externalId: "B0CSL7F49D",
  externalLink: "https://amazon.com/dp/B0CSL7F49D",
} as const satisfies Book
