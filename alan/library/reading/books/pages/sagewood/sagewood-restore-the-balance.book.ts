import type { Book } from "../../book.page-type.ts"

export const sagewoodRestoreTheBalance = {
  id: "019db533-f391-7573-9656-54dc412b8fb3",
  pageTypeSlug: "book",
  slug: "sagewood-restore-the-balance",
  title: "Sagewood: Restore the Balance",
  status: "not-started",
  unitSlug: "words",
  position: 4,
  ownLength: 83000,
  publishedAt: "2025-04-23",
  partOfSlugs: ["book-series/sagewood"],
  source: "kindle",
  externalId: "B0F1NH8N3G",
  externalLink: "https://amazon.com/dp/B0F1NH8N3G",
} as const satisfies Book
