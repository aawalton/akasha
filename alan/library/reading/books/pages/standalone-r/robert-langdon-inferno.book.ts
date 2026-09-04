import type { Book } from "../../book.page-type.ts"

export const robertLangdonInferno = {
  id: "019db533-f39b-705c-8374-17e2f68b9b6a",
  pageTypeSlug: "book",
  slug: "robert-langdon-inferno",
  title: "Robert Langdon: Inferno",
  kind: "read",
  status: "not-started",
  author: "Dan Brown",
  unitSlug: "words",
  position: 3,
  ownLength: 144500,
  source: "kindle",
  externalId: "B00AXIZ4TQ",
  externalLink: "https://www.amazon.com/dp/B00AXIZ4TQ",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
