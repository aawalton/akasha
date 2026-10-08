import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theRobotTheRobotsOfDawn = {
  id: "019db533-f39a-79d4-b24b-d1ac1659f6f6",
  type: "page-type/book",
  slug: "the-robot-the-robots-of-dawn",
  title: "The Robot: The Robots of Dawn",
  status: "not-started",
  author: "Isaac Asimov",
  unit: "unit/words",
  position: 2,
  ownLength: 121750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0024NP57Y",
      externalLink: "https://www.amazon.com/dp/B0024NP57Y",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
