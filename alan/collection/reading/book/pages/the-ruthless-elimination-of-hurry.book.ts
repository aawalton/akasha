import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theRuthlessEliminationOfHurry = {
  id: "019db533-f388-7ef0-9b5f-c376ac4d928d",
  type: "page-type/book",
  slug: "the-ruthless-elimination-of-hurry",
  title:
    "The Ruthless Elimination of Hurry: How to Stay Emotionally Healthy and Spiritually Alive in the Chaos of the Modern World",
  status: "not-started",
  author: "John Mark Comer",
  unit: "unit/words",
  ownLength: 76250,
  publishedAt: "2019-10-29",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07NCJB86S",
      externalLink:
        "https://www.amazon.com/Ruthless-Elimination-Hurry-Emotionally-Spiritually-ebook/dp/B07NCJB86S",
    },
  ],
} as const satisfies Book
