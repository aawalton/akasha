import type { View } from "akasha/page/view/view.page-type.types.ts"

export const storyReadChapters = {
  id: "01a0e9c6-3fbb-7c1a-bd82-1dec2dd7777d",
  type: "page-type/view",
  slug: "story-read-chapters",
  title: "Chapters",
  pageType: "page-type/story-chapter-read",
  embeddedBy: "page-type/story-read",
  layout: "list",
  viewSorts: [{ key: "position", descending: false }],
} as const satisfies View
