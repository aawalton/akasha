import type { Book } from "../../book.page-type.ts"

export const theCalamitousBob = {
  id: "019db533-f391-781b-bc5d-198646bf73de",
  pageTypeSlug: "book",
  slug: "the-calamitous-bob",
  title: "The Calamitous Bob",
  status: "completed",
  unitSlug: "words",
  position: 1,
  ownLength: 97250,
  ownProgress: 97250,
  publishedAt: "2021-12-13",
  source: "kindle",
  externalId: "B09NMHNW8R",
  externalLink: "https://amazon.com/dp/B09NMHNW8R",
} as const satisfies Book
