import type { Book } from "../../book.page-type.ts"

export const historiesVolume2 = {
  id: "019db533-f39d-7541-ae74-b62161570cd1",
  pageTypeSlug: "book",
  slug: "histories-volume-2",
  title: "Histories Volume 2",
  kind: "read",
  status: "not-started",
  author: "Yuval Noah Harari",
  unitSlug: "words",
  position: 2,
} as const satisfies Book
