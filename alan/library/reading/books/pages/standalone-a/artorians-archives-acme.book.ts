import type { Book } from "../../book.page-type.ts"

export const artoriansArchivesAcme = {
  id: "019db533-f390-7808-8d76-4075b3fac002",
  pageTypeSlug: "book",
  slug: "artorians-archives-acme",
  title: "Artorian's Archives: Acme",
  status: "completed",
  unitSlug: "words",
  position: 5,
  ownLength: 115500,
  ownProgress: 115500,
  publishedAt: "2020-10-02",
  source: "kindle",
  externalId: "B08HW67FLJ",
  externalLink: "https://amazon.com/dp/B08HW67FLJ",
} as const satisfies Book
