import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const somniaOnlineDistortion = {
  id: "019db533-f391-7621-9dce-5ca701b81eef",
  type: "page-type/book",
  slug: "somnia-online-distortion",
  title: "Somnia Online: Distortion",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 86750,
  ownProgress: 86750,
  publishedAt: "2019-08-22",
  partOfCollections: ["book-series/somnia-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07WR6FG96",
      externalLink: "https://amazon.com/dp/B07WR6FG96",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
