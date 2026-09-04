import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheSecondExpedition = {
  id: "019db533-f390-762f-bc03-a9c99de5e542",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-second-expedition",
  title: "A Thousand Li: The Second Expedition",
  kind: "read",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 4,
  ownLength: 183500,
  ownProgress: 183500,
  publishedAt: "2020-10-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B08HM79XKF",
  externalLink: "https://amazon.com/dp/B08HM79XKF",
} as const satisfies Book
