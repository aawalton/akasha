import type { Book } from "../../book.page-type.ts"

export const swordArtOnline2 = {
  id: "019db533-f38b-7387-b5b4-7eca0561ca60",
  pageTypeSlug: "book",
  slug: "sword-art-online-2",
  title: "Sword Art Online 2",
  kind: "read",
  status: "not-started",
  author: "Reki Kawahara",
  unitSlug: "words",
  position: 2,
  ownLength: 64000,
  publishedAt: "2017-05-30",
  source: "kindle",
  externalId: "B06XKQNK1N",
  externalLink: "https://amazon.com/dp/B06XKQNK1N",
} as const satisfies Book
