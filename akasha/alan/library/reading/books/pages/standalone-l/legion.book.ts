import type { Book } from "../../book.page-type.ts"

export const legion = {
  id: "019db533-f39d-701c-96a8-454143ce46ef",
  pageTypeSlug: "book",
  slug: "legion",
  title: "Legion",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 1,
  ownLength: 23750,
  source: "kindle",
  externalId: "B0099D4KEG",
  externalLink: "https://www.amazon.com/dp/B0099D4KEG",
} as const satisfies Book
