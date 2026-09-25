import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAlumni = {
  id: "019db533-f390-7844-8a52-5e7b06e14ca9",
  type: "page-type/book",
  slug: "artorians-archives-alumni",
  title: "Artorian's Archives: Alumni",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 122500,
  ownProgress: 122500,
  publishedAt: "2020-01-03",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0824SCD44",
      externalLink: "https://amazon.com/dp/B0824SCD44",
    },
  ],
} as const satisfies Book
