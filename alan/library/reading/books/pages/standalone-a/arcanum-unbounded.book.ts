import type { Book } from "../../book.page-type.ts"

export const arcanumUnbounded = {
  id: "019db533-f39d-75d7-980d-7c911c4e2de9",
  pageTypeSlug: "book",
  slug: "arcanum-unbounded",
  title: "Arcanum Unbounded",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 3,
  ownLength: 167750,
  source: "kindle",
  externalId: "B01EFIH09G",
  externalLink:
    "https://www.amazon.com/Arcanum-Unbounded-Collection-Brandon-Sanderson-ebook/dp/B01EFIH09G",
} as const satisfies Book
