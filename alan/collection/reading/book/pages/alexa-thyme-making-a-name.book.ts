import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const alexaThymeMakingAName = {
  id: "019db533-f390-76ad-beeb-43a7007e98c2",
  type: "page-type/book",
  slug: "alexa-thyme-making-a-name",
  title: "Alexa Thyme: Making A Name",
  status: "completed",
  author: "Lykanthropy",
  unit: "unit/words",
  position: 3,
  ownLength: 124250,
  ownProgress: 124250,
  publishedAt: "2024-06-24",
  partOfCollections: ["book-series/alexa-thyme"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D8188R8Y",
      externalLink: "https://amazon.com/dp/B0D8188R8Y",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
