import type { View } from "akasha/page/view/view.page-type.types.ts"

export const skillsAlphabetical = {
  id: "01a0c954-1289-70ab-9473-94b0ce50f4b5",
  type: "page-type/view",
  slug: "skills-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-skill",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
