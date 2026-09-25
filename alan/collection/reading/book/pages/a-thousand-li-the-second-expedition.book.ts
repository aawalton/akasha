import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aThousandLiTheSecondExpedition = {
  id: "019db533-f390-762f-bc03-a9c99de5e542",
  type: "page-type/book",
  slug: "a-thousand-li-the-second-expedition",
  title: "A Thousand Li: The Second Expedition",
  status: "completed",
  author: "Tao Wong",
  unit: "unit/words",
  position: 4,
  ownLength: 183500,
  ownProgress: 183500,
  publishedAt: "2020-10-01",
  partOfCollections: ["book-series/a-thousand-li"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08HM79XKF",
      externalLink: "https://amazon.com/dp/B08HM79XKF",
    },
  ],
} as const satisfies Book
