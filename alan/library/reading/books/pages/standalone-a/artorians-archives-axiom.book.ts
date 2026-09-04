import type { Book } from "../../book.page-type.ts"

export const artoriansArchivesAxiom = {
  id: "019db533-f390-7839-8d75-63f185c32bc4",
  pageTypeSlug: "book",
  slug: "artorians-archives-axiom",
  title: "Artorian's Archives: Axiom",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 1,
  ownLength: 111000,
  ownProgress: 111000,
  publishedAt: "2019-11-29",
  source: "kindle",
  externalId: "B07ZXLHMHK",
  externalLink: "https://amazon.com/dp/B07ZXLHMHK",
} as const satisfies Book
