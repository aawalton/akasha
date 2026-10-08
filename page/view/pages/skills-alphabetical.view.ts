import type { View } from "akasha/page/view/view.page-type.types.ts"

export const skillsAlphabetical = {
  id: "01a0c954-1289-70ab-9473-94b0ce50f4b5",
  type: "page-type/view",
  slug: "skills-alphabetical",
  title: "Alphabetical",
  nav: "nav/innworld-skills",
  pageType: "page-type/world-skill",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
  createdAt: "2026-09-22T13:35:25.321Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
