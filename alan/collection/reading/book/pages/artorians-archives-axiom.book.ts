import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAxiom = {
  id: "019db533-f390-7839-8d75-63f185c32bc4",
  type: "page-type/book",
  slug: "artorians-archives-axiom",
  title: "Artorian's Archives: Axiom",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 111000,
  ownProgress: 111000,
  publishedAt: "2019-11-29",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07ZXLHMHK",
      externalLink: "https://amazon.com/dp/B07ZXLHMHK",
    },
  ],
} as const satisfies Book
