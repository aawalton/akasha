import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeNewSpring = {
  id: "019db533-f38a-7d8e-ad35-b522b583f6c6",
  type: "page-type/book",
  slug: "wheel-of-time-new-spring",
  title: "Wheel of Time: New Spring",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  ownLength: 104250,
  ownProgress: 104250,
  publishedAt: "2011-07-29",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003K15PBK",
      externalLink: "https://www.amazon.com/New-Spring-Novel-Wheel-Other-ebook/dp/B003K15PBK",
    },
  ],
} as const satisfies Book
