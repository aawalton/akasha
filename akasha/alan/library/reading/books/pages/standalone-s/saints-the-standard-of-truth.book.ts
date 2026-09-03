import type { Book } from "../../book.page-type.ts"

export const saintsTheStandardOfTruth = {
  id: "019db533-f39d-72ea-a168-706fb553110e",
  pageTypeSlug: "book",
  slug: "saints-the-standard-of-truth",
  title: "Saints: The Standard of Truth",
  kind: "read",
  status: "not-started",
  author: "The Church of Jesus Christ of Latter Day Saints",
  unitSlug: "words",
  position: 1,
  ownLength: 174750,
} as const satisfies Book
