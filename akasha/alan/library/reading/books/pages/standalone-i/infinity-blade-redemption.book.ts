import type { Book } from "../../book.page-type.ts"

export const infinityBladeRedemption = {
  id: "019db533-f39d-70c3-a934-3ac9f2ca4f81",
  pageTypeSlug: "book",
  slug: "infinity-blade-redemption",
  title: "Infinity Blade: Redemption",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 2,
  ownLength: 43500,
  ownProgress: 43500,
} as const satisfies Book
