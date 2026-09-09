import type { Book } from "../book.page-type.ts"

export const cradleReaper = {
  id: "019db533-f390-7bf1-b328-8d326a24cdd1",
  pageTypeSlug: "book",
  type: "book",
  slug: "cradle-reaper",
  title: "Cradle: Reaper",
  status: "completed",
  author: "Will Wight",
  unit: "words",
  position: 10,
  ownLength: 110500,
  ownProgress: 110500,
  publishedAt: "2021-11-02",
  partOfCollections: ["book-series/cradle"],
  source: "kindle",
  externalId: "B09JS55FW3",
  externalLink: "https://amazon.com/dp/B09JS55FW3",
} as const satisfies Book
