import type { Book } from "../../book.page-type.ts"

export const awakenOnlineCrucible = {
  id: "019db533-f386-76fa-9d08-f7e093cdd45a",
  pageTypeSlug: "book",
  slug: "awaken-online-crucible",
  title: "Awaken Online: Crucible",
  status: "not-started",
  unitSlug: "words",
  position: 12,
  ownLength: 228000,
  publishedAt: "2026-03-01",
  partOfSlugs: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B0GD8QJM1Q",
  externalLink: "https://amazon.com/dp/B0GD8QJM1Q",
} as const satisfies Book
