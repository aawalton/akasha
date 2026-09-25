import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAcme = {
  id: "019db533-f390-7808-8d76-4075b3fac002",
  type: "page-type/book",
  slug: "artorians-archives-acme",
  title: "Artorian's Archives: Acme",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 115500,
  ownProgress: 115500,
  publishedAt: "2020-10-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08HW67FLJ",
      externalLink: "https://amazon.com/dp/B08HW67FLJ",
    },
  ],
} as const satisfies Book
