import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysFlexInTheCity = {
  id: "019db533-f391-7927-a77c-7497703df31e",
  type: "page-type/book",
  slug: "the-good-guys-flex-in-the-city",
  title: "The Good Guys: Flex in the City",
  status: "not-started",
  unit: "unit/words",
  position: 13,
  ownLength: 101750,
  publishedAt: "2022-04-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09B5C2L7N",
      externalLink: "https://amazon.com/dp/B09B5C2L7N",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
