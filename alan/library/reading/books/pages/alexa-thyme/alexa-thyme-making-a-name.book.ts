import type { Book } from "../../book.page-type.ts"

export const alexaThymeMakingAName = {
  id: "019db533-f390-76ad-beeb-43a7007e98c2",
  pageTypeSlug: "book",
  slug: "alexa-thyme-making-a-name",
  title: "Alexa Thyme: Making A Name",
  status: "completed",
  author: "Lykanthropy",
  unitSlug: "words",
  position: 3,
  ownLength: 124250,
  ownProgress: 124250,
  publishedAt: "2024-06-24",
  partOfSlugs: ["book-series/alexa-thyme"],
  source: "kindle",
  externalId: "B0D8188R8Y",
  externalLink: "https://amazon.com/dp/B0D8188R8Y",
} as const satisfies Book
