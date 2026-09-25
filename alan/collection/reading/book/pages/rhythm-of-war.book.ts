import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rhythmOfWar = {
  id: "019db533-f39d-70eb-8f3c-ce97fd0328b1",
  type: "page-type/book",
  slug: "rhythm-of-war",
  title: "Rhythm of War",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 6,
  ownLength: 307500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0826NKZHR",
      externalLink: "https://www.amazon.com/dp/B0826NKZHR",
    },
  ],
} as const satisfies Book
