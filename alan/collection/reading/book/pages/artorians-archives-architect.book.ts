import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesArchitect = {
  id: "019db533-f390-7796-845f-14510b63f013",
  type: "page-type/book",
  slug: "artorians-archives-architect",
  title: "Artorian's Archives: Architect",
  status: "not-started",
  unit: "unit/words",
  position: 16,
  ownLength: 118250,
  publishedAt: "2023-11-15",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CLVTF9YM",
      externalLink: "https://amazon.com/dp/B0CLVTF9YM",
    },
  ],
} as const satisfies Book
