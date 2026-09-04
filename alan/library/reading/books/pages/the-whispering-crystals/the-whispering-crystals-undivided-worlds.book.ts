import type { Book } from "../../book.page-type.ts"

export const theWhisperingCrystalsUndividedWorlds = {
  id: "019db533-f38b-757c-bc60-b61fbfe4f987",
  pageTypeSlug: "book",
  slug: "the-whispering-crystals-undivided-worlds",
  title: "The Whispering Crystals: Undivided Worlds",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 6,
  ownLength: 118750,
  ownProgress: 118750,
  publishedAt: "2023-12-17",
  partOfSlugs: ["book-series/the-whispering-crystals"],
  source: "kindle",
  externalId: "B0CQK6TNQ4",
  externalLink: "https://amazon.com/dp/B0CQK6TNQ4",
} as const satisfies Book
