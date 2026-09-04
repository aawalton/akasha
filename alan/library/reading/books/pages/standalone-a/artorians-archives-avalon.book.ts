import type { Book } from "../../book.page-type.ts"

export const artoriansArchivesAvalon = {
  id: "019db533-f390-77cd-a117-d228aa1c625d",
  pageTypeSlug: "book",
  slug: "artorians-archives-avalon",
  title: "Artorian's Archives: Avalon",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 12,
  ownLength: 112500,
  publishedAt: "2022-10-12",
  source: "kindle",
  externalId: "B0B7GD897J",
  externalLink: "https://amazon.com/dp/B0B7GD897J",
} as const satisfies Book
