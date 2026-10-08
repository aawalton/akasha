import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const alexaThymeBlackMass = {
  id: "019db533-f390-767a-ba91-7f3d0587fd80",
  type: "page-type/book",
  slug: "alexa-thyme-black-mass",
  title: "Alexa Thyme: Black Mass",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 145000,
  ownProgress: 145000,
  publishedAt: "2025-05-26",
  partOfCollections: ["book-series/alexa-thyme"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F4NV1Y3T",
      externalLink: "https://amazon.com/dp/B0F4NV1Y3T",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
