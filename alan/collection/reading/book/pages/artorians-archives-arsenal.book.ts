import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesArsenal = {
  id: "019db533-f390-780f-b3a6-422b865aeceb",
  type: "page-type/book",
  slug: "artorians-archives-arsenal",
  title: "Artorian's Archives: Arsenal",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 113500,
  ownProgress: 113500,
  publishedAt: "2020-07-03",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08B71JPK6",
      externalLink: "https://amazon.com/dp/B08B71JPK6",
    },
  ],
} as const satisfies Book
