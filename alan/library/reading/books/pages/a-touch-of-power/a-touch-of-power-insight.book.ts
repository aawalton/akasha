import type { Book } from "../../book.page-type.ts"

export const aTouchOfPowerInsight = {
  id: "019db533-f390-7670-bf24-66b6de69cf18",
  pageTypeSlug: "book",
  slug: "a-touch-of-power-insight",
  title: "A Touch of Power: Insight",
  kind: "read",
  status: "completed",
  author: "Robert A. Baron",
  unitSlug: "words",
  position: 4,
  ownLength: 106000,
  ownProgress: 106000,
  publishedAt: "2025-06-25",
  partOfSlugs: ["book-series/a-touch-of-power"],
  source: "kindle",
  externalId: "B0FFP79SJ5",
  externalLink: "https://amazon.com/dp/B0FFP79SJ5",
} as const satisfies Book
