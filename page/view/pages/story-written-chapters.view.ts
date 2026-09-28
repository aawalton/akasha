import type { View } from "akasha/page/view/view.page-type.types.ts"

export const storyWrittenChapters = {
  id: "01a0e9c6-3fbc-7ea1-aef6-35af31e72063",
  type: "page-type/view",
  slug: "story-written-chapters",
  title: "Chapters",
  pageType: "page-type/story-chapter-written",
  embeddedBy: "page-type/story-written",
  layout: "list",
  viewSorts: [{ key: "position", descending: false }],
} as const satisfies View
