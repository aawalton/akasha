import type { Book } from "../../book.page-type.ts"

export const theRobotTheCavesOfSteel = {
  id: "019db533-f39a-7a79-b3c3-e688ba3ed9bb",
  pageTypeSlug: "book",
  slug: "the-robot-the-caves-of-steel",
  title: "The Robot: The Caves of Steel",
  kind: "read",
  status: "not-started",
  author: "Isaac Asimov",
  unitSlug: "words",
  ownLength: 68000,
  source: "kindle",
  externalId: "B004JHYRAO",
  externalLink: "https://www.amazon.com/dp/B004JHYRAO",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
