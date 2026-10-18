import type { View } from "akasha/page/view/view.page-type.types.ts"

export const coursesUnfinished = {
  id: "01a14fa8-f3bb-7817-ac7d-dc5f98a2b6e3",
  type: "page-type/view",
  slug: "courses-unfinished",
  title: "Unfinished",
  nav: "nav/courses",
  pageType: "page-type/great-course",
  viewPlace: 0,
  layout: "table",
  narrows: [
    { key: "completion", comparison: "not-in", values: ["completed"] },
    { key: "progressed-at", comparison: "before-or-empty", values: ["eso-day"] },
  ],
  viewSorts: [
    { key: "completion-percent", descending: true },
    { key: "title", descending: false },
  ],
  visibleProperties: [
    "completion-percent",
    "external-identity",
    "grade",
    "own-length",
    "own-progress",
  ],
  createdAt: "2026-10-18T15:37:14.937Z",
  updatedAt: "2026-10-18T16:20:43.823Z",
} as const satisfies View
