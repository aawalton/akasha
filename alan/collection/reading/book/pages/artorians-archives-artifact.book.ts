import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesArtifact = {
  id: "019db533-f390-77ea-a896-facf2cfd5985",
  type: "page-type/book",
  slug: "artorians-archives-artifact",
  title: "Artorian's Archives: Artifact",
  status: "not-started",
  unit: "unit/words",
  position: 8,
  ownLength: 104500,
  publishedAt: "2021-06-30",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B095XHXJ4Q",
      externalLink: "https://amazon.com/dp/B095XHXJ4Q",
    },
  ],
} as const satisfies Book
