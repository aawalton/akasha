import type { Book } from "../../book.page-type.ts"

export const endsOfMagicAssassin = {
  id: "019db533-f390-7f94-a849-91d531e1faa2",
  pageTypeSlug: "book",
  slug: "ends-of-magic-assassin",
  title: "Ends of Magic: Assassin",
  kind: "read",
  status: "completed",
  author: "L. Fletcher Prouty",
  unitSlug: "words",
  position: 3,
  ownLength: 99500,
  ownProgress: 99500,
  publishedAt: "2024-05-15",
  partOfSlugs: ["book-series/ends-of-magic"],
  source: "kindle",
  externalId: "B0CTCCKYGQ",
  externalLink: "https://amazon.com/dp/B0CTCCKYGQ",
} as const satisfies Book
