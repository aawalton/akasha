import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWayOfTheShamanSurvivalQuest = {
  id: "019db533-f38b-75e5-87b0-d99331a1b650",
  type: "page-type/book",
  slug: "the-way-of-the-shaman-survival-quest",
  title: "The Way of the Shaman: Survival Quest",
  status: "completed",
  author: "Vasily Mahanenko",
  unit: "unit/words",
  position: 1,
  ownLength: 82000,
  ownProgress: 82000,
  publishedAt: "2015-04-20",
  partOfCollections: ["book-series/the-way-of-the-shaman"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00VQRW14E",
      externalLink: "https://amazon.com/dp/B00VQRW14E",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
