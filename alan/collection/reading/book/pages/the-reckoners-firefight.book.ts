import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theReckonersFirefight = {
  id: "019db533-f38a-7c31-8fb8-167a1e6ebf3c",
  type: "page-type/book",
  slug: "the-reckoners-firefight",
  title: "The Reckoners: Firefight",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 2,
  ownLength: 106750,
  publishedAt: "2015-01-06",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00JNQMKSC",
      externalLink: "https://amazon.com/dp/B00JNQMKSC",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
