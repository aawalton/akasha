import type { Restaurant } from "../restaurant.page-type.ts"

export const theCheesecakeFactory = {
  id: "01a06808-a2ec-7004-b5e3-b0735799fcf0",
  pageTypeSlug: "restaurant",
  slug: "the-cheesecake-factory",
  title: "The Cheesecake Factory",
  partOfSlugs: ["provo-restaurants"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "in-progress",
  rank: "B",
} as const satisfies Restaurant
