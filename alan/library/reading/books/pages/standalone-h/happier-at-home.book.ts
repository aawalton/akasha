import type { Book } from "../../book.page-type.ts"

export const happierAtHome = {
  id: "019db533-f39e-7179-bca8-75088640c788",
  pageTypeSlug: "book",
  slug: "happier-at-home",
  title: "Happier at Home",
  status: "not-started",
  author: "Gretchen Rubin",
  unitSlug: "words",
  ownLength: 139950,
} as const satisfies Book
