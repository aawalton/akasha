import type { Book } from "../../book.page-type.ts"

export const swordArtOnline = {
  id: "019db533-f38b-7343-82f2-4eb8f301abbd",
  pageTypeSlug: "book",
  slug: "sword-art-online",
  title: "Sword Art Online",
  kind: "read",
  status: "not-started",
  author: "Reki Kawahara",
  unitSlug: "words",
  position: 1,
  ownLength: 54500,
  publishedAt: "2017-05-30",
  source: "kindle",
  externalId: "B06XNJW99V",
  externalLink: "https://amazon.com/dp/B06XNJW99V",
} as const satisfies Book
