import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCalamitousBob = {
  id: "019db533-f391-781b-bc5d-198646bf73de",
  type: "page-type/book",
  slug: "the-calamitous-bob",
  title: "The Calamitous Bob",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 97250,
  ownProgress: 97250,
  publishedAt: "2021-12-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09NMHNW8R",
      externalLink: "https://amazon.com/dp/B09NMHNW8R",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
