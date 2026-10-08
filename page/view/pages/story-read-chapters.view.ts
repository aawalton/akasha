import type { View } from "akasha/page/view/view.page-type.types.ts"

export const storyReadChapters = {
  id: "01a0e9c6-3fbb-7c1a-bd82-1dec2dd7777d",
  type: "page-type/view",
  slug: "story-read-chapters",
  title: "Chapters",
  pageType: "page-type/story-chapter-read",
  embeddedBy: "page-type/story-read",
  layout: "list",
  narrows: [{ key: "own-remaining", comparison: "at-or-after", values: ["1"] }],
  viewSorts: [{ key: "position", descending: false }],
  createdAt: "2026-09-28T20:47:58.907Z",
  updatedAt: "2026-10-05T21:36:48.000Z",
} as const satisfies View
