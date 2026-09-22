import type { View } from "akasha/page/view/view.page-type.types.ts"

export const skillsMostSeen = {
  id: "01a0c954-126b-7843-9cc6-4caf0b3729bb",
  type: "page-type/view",
  slug: "skills-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-skill",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
