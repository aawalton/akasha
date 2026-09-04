import type { Book } from "../../book.page-type.ts"

export const rhythmOfWar = {
  id: "019db533-f39d-70eb-8f3c-ce97fd0328b1",
  pageTypeSlug: "book",
  slug: "rhythm-of-war",
  title: "Rhythm of War",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 6,
  ownLength: 307500,
  source: "kindle",
  externalId: "B0826NKZHR",
  externalLink: "https://www.amazon.com/dp/B0826NKZHR",
} as const satisfies Book
