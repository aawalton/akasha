import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const runelordsBrotherhoodOfTheWolf = {
  id: "019db533-f39b-716c-bb10-b9cdb7c85bc0",
  type: "page-type/book",
  slug: "runelords-brotherhood-of-the-wolf",
  title: "Runelords: Brotherhood of the Wolf",
  status: "not-started",
  author: "David Farland",
  unit: "unit/words",
  position: 1,
  ownLength: 168750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003J5UJIQ",
      externalLink: "https://www.amazon.com/dp/B003J5UJIQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
