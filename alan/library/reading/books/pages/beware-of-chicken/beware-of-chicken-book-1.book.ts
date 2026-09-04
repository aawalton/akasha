import type { Book } from "../../book.page-type.ts"

export const bewareOfChickenBook1 = {
  id: "019db533-f390-7a17-ab53-f44c9612fcf1",
  pageTypeSlug: "book",
  slug: "beware-of-chicken-book-1",
  title: "Beware of Chicken",
  status: "completed",
  author: "CasualFarmer",
  unitSlug: "words",
  position: 1,
  ownLength: 91750,
  ownProgress: 91750,
  publishedAt: "2022-05-24",
  partOfSlugs: ["book-series/beware-of-chicken"],
  source: "kindle",
  externalId: "B09Y6RQSHM",
  externalLink: "https://amazon.com/dp/B09Y6RQSHM",
} as const satisfies Book
