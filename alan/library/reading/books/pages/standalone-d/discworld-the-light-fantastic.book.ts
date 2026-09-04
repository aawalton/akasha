import type { Book } from "../../book.page-type.ts"

export const discworldTheLightFantastic = {
  id: "019db533-f39a-78f7-bae1-f15581d95c39",
  pageTypeSlug: "book",
  slug: "discworld-the-light-fantastic",
  title: "Discworld: The Light Fantastic",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 2,
  ownLength: 68000,
  source: "kindle",
  externalId: "B000W914OU",
  externalLink: "https://www.amazon.com/dp/B000W914OU",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
