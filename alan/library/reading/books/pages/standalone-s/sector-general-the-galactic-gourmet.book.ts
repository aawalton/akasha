import type { Book } from "../../book.page-type.ts"

export const sectorGeneralTheGalacticGourmet = {
  id: "019db533-f38b-717a-97cd-91d1b1f69479",
  pageTypeSlug: "book",
  slug: "sector-general-the-galactic-gourmet",
  title: "Sector General: The Galactic Gourmet",
  status: "not-started",
  author: "James White",
  unitSlug: "words",
  position: 9,
  ownLength: 78000,
  publishedAt: "1997-01-01",
  source: "kindle",
  externalId: "0812562674",
  externalLink: "https://amazon.com/dp/0812562674",
} as const satisfies Book
