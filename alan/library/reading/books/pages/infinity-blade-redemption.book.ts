import type { Book } from "../book.page-type.types.ts"

export const infinityBladeRedemption = {
  id: "019db533-f39d-70c3-a934-3ac9f2ca4f81",
  pageTypeSlug: "book",
  type: "book",
  slug: "infinity-blade-redemption",
  title: "Infinity Blade: Redemption",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unit: "words",
  position: 2,
  ownLength: 43500,
  ownProgress: 43500,
} as const satisfies Book
