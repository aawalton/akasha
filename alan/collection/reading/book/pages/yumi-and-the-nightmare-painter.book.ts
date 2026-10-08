import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const yumiAndTheNightmarePainter = {
  id: "019db533-f39d-7299-9874-497a7bfe52f1",
  type: "page-type/book",
  slug: "yumi-and-the-nightmare-painter",
  title: "Yumi and the Nightmare Painter",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 8,
  ownLength: 119000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BPN9JT6M",
      externalLink: "https://www.amazon.com/dp/B0BPN9JT6M",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
