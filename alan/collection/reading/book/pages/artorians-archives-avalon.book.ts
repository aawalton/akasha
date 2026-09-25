import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAvalon = {
  id: "019db533-f390-77cd-a117-d228aa1c625d",
  type: "page-type/book",
  slug: "artorians-archives-avalon",
  title: "Artorian's Archives: Avalon",
  status: "not-started",
  unit: "unit/words",
  position: 12,
  ownLength: 112500,
  publishedAt: "2022-10-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B7GD897J",
      externalLink: "https://amazon.com/dp/B0B7GD897J",
    },
  ],
} as const satisfies Book
