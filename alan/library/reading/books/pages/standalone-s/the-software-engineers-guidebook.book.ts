import type { Book } from "../../book.page-type.ts"

export const theSoftwareEngineersGuidebook = {
  id: "019db533-f39d-75b6-89de-30c97b81c405",
  pageTypeSlug: "book",
  slug: "the-software-engineers-guidebook",
  title: "The Software Engineer's Guidebook",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Gergely Orosz",
  unitSlug: "words",
  position: 4,
  ownLength: 97750,
  ownProgress: 97750,
} as const satisfies Book
