import type { Book } from "../../book.page-type.ts"

export const theWhisperingCrystalsUnnaturalLaws = {
  id: "019db533-f38b-759c-b8ce-5f143b670222",
  pageTypeSlug: "book",
  slug: "the-whispering-crystals-unnatural-laws",
  title: "The Whispering Crystals: Unnatural Laws",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 1,
  ownLength: 88500,
  ownProgress: 88500,
  publishedAt: "2020-11-03",
  partOfSlugs: ["book-series/the-whispering-crystals"],
  source: "kindle",
  externalId: "B08MQTLMZ9",
  externalLink: "https://amazon.com/dp/B08MQTLMZ9",
} as const satisfies Book
