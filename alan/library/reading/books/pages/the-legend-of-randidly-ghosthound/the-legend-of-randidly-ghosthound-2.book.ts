import type { Book } from "../../book.page-type.ts"

export const theLegendOfRandidlyGhosthound2 = {
  id: "019db533-f391-79e2-bc33-4fc2ff46172c",
  pageTypeSlug: "book",
  slug: "the-legend-of-randidly-ghosthound-2",
  title: "The Legend of Randidly Ghosthound 2",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 2,
  ownLength: 146500,
  ownProgress: 146500,
  publishedAt: "2022-02-15",
  partOfSlugs: ["book-series/the-legend-of-randidly-ghosthound"],
  source: "kindle",
  externalId: "B09KSBLK52",
  externalLink: "https://amazon.com/dp/B09KSBLK52",
} as const satisfies Book
