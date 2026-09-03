import type { Book } from "../../book.page-type.ts"

export const endsOfMagicAspirant = {
  id: "019db533-f390-7f66-860a-4c61325e1460",
  pageTypeSlug: "book",
  slug: "ends-of-magic-aspirant",
  title: "Ends of Magic: Aspirant",
  kind: "read",
  status: "completed",
  author: "Chad Corrie",
  unitSlug: "words",
  position: 5,
  ownLength: 132500,
  ownProgress: 132500,
  publishedAt: "2025-01-28",
  partOfSlugs: ["book-series/ends-of-magic"],
  source: "kindle",
  externalId: "B0DCW4SF5Z",
  externalLink: "https://amazon.com/dp/B0DCW4SF5Z",
} as const satisfies Book
