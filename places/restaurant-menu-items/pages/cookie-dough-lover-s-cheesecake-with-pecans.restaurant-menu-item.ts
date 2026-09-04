import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const cookieDoughLoverSCheesecakeWithPecans = {
  id: "01a06808-b765-7007-9d55-d65c4e99f8bd",
  pageTypeSlug: "restaurant-menu-item",
  slug: "cookie-dough-lover-s-cheesecake-with-pecans",
  title: "Cookie Dough Lover's Cheesecake with Pecans",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
