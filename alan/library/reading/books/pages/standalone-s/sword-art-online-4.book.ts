import type { Book } from "../../book.page-type.ts"

export const swordArtOnline4 = {
  id: "019db533-f38b-734e-b4a6-21fbd1dae045",
  pageTypeSlug: "book",
  slug: "sword-art-online-4",
  title: "Sword Art Online 4",
  status: "not-started",
  author: "Reki Kawahara",
  unitSlug: "words",
  position: 4,
  ownLength: 49000,
  publishedAt: "2017-05-30",
  source: "kindle",
  externalId: "B06XK4NH17",
  externalLink: "https://amazon.com/dp/B06XK4NH17",
} as const satisfies Book
