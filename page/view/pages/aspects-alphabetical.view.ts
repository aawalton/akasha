import type { View } from "akasha/page/view/view.page-type.types.ts"

export const aspectsAlphabetical = {
  id: "01a0c954-0eaa-7331-b51b-9bd3d8f0f6a5",
  type: "page-type/view",
  slug: "aspects-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-aspect",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
