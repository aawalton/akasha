import type { View } from "akasha/page/view/view.page-type.types.ts"

export const charactersAlphabetical = {
  id: "01a0c940-f015-75f6-8db4-7ac9450de7f7",
  type: "page-type/view",
  slug: "characters-alphabetical",
  title: "Alphabetical",
  nav: "nav/innworld-characters",
  pageType: "page-type/world-character",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
  createdAt: "2026-09-22T13:14:31.317Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
