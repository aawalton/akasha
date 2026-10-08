import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const secondAgeOfRethraTheLuckless = {
  id: "019db533-f39d-762c-99ef-99399d6aafb7",
  type: "page-type/book",
  slug: "second-age-of-rethra-the-luckless",
  title: "Second Age of Rethra: The Luckless",
  status: "completed",
  grade: "A",
  unit: "unit/words",
  position: 1,
  ownLength: 67000,
  ownProgress: 67000,
  publishedAt: "2017-07-19",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B073VSFNKL",
      externalLink: "https://amazon.com/dp/B073VSFNKL",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
