import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const arcanumUnbounded = {
  id: "019db533-f39d-75d7-980d-7c911c4e2de9",
  type: "page-type/book",
  slug: "arcanum-unbounded",
  title: "Arcanum Unbounded",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 167750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01EFIH09G",
      externalLink:
        "https://www.amazon.com/Arcanum-Unbounded-Collection-Brandon-Sanderson-ebook/dp/B01EFIH09G",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
