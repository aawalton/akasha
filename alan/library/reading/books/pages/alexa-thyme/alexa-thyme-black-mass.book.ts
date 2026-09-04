import type { Book } from "../../book.page-type.ts"

export const alexaThymeBlackMass = {
  id: "019db533-f390-767a-ba91-7f3d0587fd80",
  pageTypeSlug: "book",
  slug: "alexa-thyme-black-mass",
  title: "Alexa Thyme: Black Mass",
  status: "completed",
  unitSlug: "words",
  position: 4,
  ownLength: 145000,
  ownProgress: 145000,
  publishedAt: "2025-05-26",
  partOfSlugs: ["book-series/alexa-thyme"],
  source: "kindle",
  externalId: "B0F4NV1Y3T",
  externalLink: "https://amazon.com/dp/B0F4NV1Y3T",
} as const satisfies Book
