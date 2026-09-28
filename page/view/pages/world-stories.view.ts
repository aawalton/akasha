import type { View } from "akasha/page/view/view.page-type.types.ts"

export const worldStories = {
  id: "01a0e9c6-3fbc-7b4f-b27d-44dd84d29b65",
  type: "page-type/view",
  slug: "world-stories",
  title: "Stories",
  pageType: "page-type/story",
  embeddedBy: "page-type/world",
  layout: "cards",
} as const satisfies View
