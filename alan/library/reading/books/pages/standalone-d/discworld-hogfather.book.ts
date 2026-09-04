import type { Book } from "../../book.page-type.ts"

export const discworldHogfather = {
  id: "019db533-f39b-70ed-9b28-45c4d66aacdf",
  pageTypeSlug: "book",
  slug: "discworld-hogfather",
  title: "Discworld: Hogfather",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 20,
  ownLength: 88750,
  source: "kindle",
  externalId: "B000W5MIGC",
  externalLink: "https://www.amazon.com/dp/B000W5MIGC",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
