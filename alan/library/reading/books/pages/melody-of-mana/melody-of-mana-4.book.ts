import type { Book } from "../../book.page-type.ts"

export const melodyOfMana4 = {
  id: "019db533-f391-7285-a1bb-2c963c47de25",
  pageTypeSlug: "book",
  slug: "melody-of-mana-4",
  title: "Melody of Mana 4",
  status: "completed",
  unitSlug: "words",
  position: 4,
  ownLength: 58750,
  ownProgress: 58750,
  publishedAt: "2023-11-28",
  partOfSlugs: ["book-series/melody-of-mana"],
  source: "kindle",
  externalId: "B0CHMX635P",
  externalLink: "https://amazon.com/dp/B0CHMX635P",
} as const satisfies Book
