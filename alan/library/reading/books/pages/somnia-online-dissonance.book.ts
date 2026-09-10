import type { Book } from "../book.page-type.types.ts"

export const somniaOnlineDissonance = {
  id: "019db533-f391-7616-8a0c-caa837288d32",
  pageTypeSlug: "book",
  type: "book",
  slug: "somnia-online-dissonance",
  title: "Somnia Online: Dissonance",
  status: "completed",
  unit: "words",
  position: 4,
  ownLength: 88500,
  ownProgress: 88500,
  publishedAt: "2019-02-15",
  partOfCollections: ["book-series/somnia-online"],
  source: "kindle",
  externalId: "B07ND2XV5V",
  externalLink: "https://amazon.com/dp/B07ND2XV5V",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
