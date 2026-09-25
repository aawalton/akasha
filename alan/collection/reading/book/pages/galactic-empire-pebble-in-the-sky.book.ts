import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const galacticEmpirePebbleInTheSky = {
  id: "019db533-f39a-7c5d-9396-0c15a1961f04",
  type: "page-type/book",
  slug: "galactic-empire-pebble-in-the-sky",
  title: "Galactic Empire: Pebble in the Sky",
  status: "not-started",
  author: "Isaac Asimov",
  unit: "unit/words",
  position: 2,
  ownLength: 61500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08GK17BXQ",
      externalLink: "https://www.amazon.com/dp/B08GK17BXQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
