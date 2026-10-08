import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theRobotTheNakedSun = {
  id: "019db533-f39a-7934-bdd4-36c155b1c1d0",
  type: "page-type/book",
  slug: "the-robot-the-naked-sun",
  title: "The Robot: The Naked Sun",
  status: "not-started",
  author: "Isaac Asimov",
  unit: "unit/words",
  position: 1,
  ownLength: 64250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004JHYRDQ",
      externalLink: "https://www.amazon.com/dp/B004JHYRDQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
