import type { Book } from "../../book.page-type.ts"

export const theWayOfTheShamanSurvivalQuest = {
  id: "019db533-f38b-75e5-87b0-d99331a1b650",
  pageTypeSlug: "book",
  slug: "the-way-of-the-shaman-survival-quest",
  title: "The Way of the Shaman: Survival Quest",
  status: "completed",
  author: "Vasily Mahanenko",
  unitSlug: "words",
  position: 1,
  ownLength: 82000,
  ownProgress: 82000,
  publishedAt: "2015-04-20",
  partOfSlugs: ["book-series/the-way-of-the-shaman"],
  source: "kindle",
  externalId: "B00VQRW14E",
  externalLink: "https://amazon.com/dp/B00VQRW14E",
} as const satisfies Book
