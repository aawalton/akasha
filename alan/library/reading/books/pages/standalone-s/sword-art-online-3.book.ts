import type { Book } from "../../book.page-type.ts"

export const swordArtOnline3 = {
  id: "019db533-f38b-737a-b38f-81a24da37640",
  pageTypeSlug: "book",
  slug: "sword-art-online-3",
  title: "Sword Art Online 3",
  status: "not-started",
  author: "Reki Kawahara",
  unitSlug: "words",
  position: 3,
  ownLength: 50750,
  publishedAt: "2017-05-30",
  source: "kindle",
  externalId: "B06XKPCFBF",
  externalLink: "https://amazon.com/dp/B06XKPCFBF",
} as const satisfies Book
