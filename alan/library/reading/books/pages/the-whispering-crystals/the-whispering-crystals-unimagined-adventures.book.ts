import type { Book } from "../../book.page-type.ts"

export const theWhisperingCrystalsUnimaginedAdventures = {
  id: "019db533-f38b-7594-9ba5-8673f04aaf7f",
  pageTypeSlug: "book",
  slug: "the-whispering-crystals-unimagined-adventures",
  title: "The Whispering Crystals: Unimagined Adventures",
  status: "completed",
  unitSlug: "words",
  position: 3,
  ownLength: 101250,
  ownProgress: 101250,
  publishedAt: "2021-12-27",
  partOfSlugs: ["book-series/the-whispering-crystals"],
  source: "kindle",
  externalId: "B09PBYK1XV",
  externalLink: "https://amazon.com/dp/B09PBYK1XV",
} as const satisfies Book
