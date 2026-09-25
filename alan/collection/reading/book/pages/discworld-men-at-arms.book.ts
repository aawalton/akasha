import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldMenAtArms = {
  id: "019db533-f39a-7e1e-be0f-69bc653b4c14",
  type: "page-type/book",
  slug: "discworld-men-at-arms",
  title: "Discworld: Men at Arms",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 15,
  ownLength: 99750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000TU16RC",
      externalLink: "https://www.amazon.com/dp/B000TU16RC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
