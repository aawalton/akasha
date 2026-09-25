import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const disgardiumHolyWar = {
  id: "019db533-f390-7da0-97db-22d842a5c2bd",
  type: "page-type/book",
  slug: "disgardium-holy-war",
  title: "Disgardium: Holy War",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 131750,
  ownProgress: 131750,
  publishedAt: "2020-09-04",
  partOfCollections: ["book-series/disgardium"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08BJ8Q283",
      externalLink: "https://amazon.com/dp/B08BJ8Q283",
    },
  ],
} as const satisfies Book
