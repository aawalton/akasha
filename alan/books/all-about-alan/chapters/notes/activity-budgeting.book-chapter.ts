import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const activityBudgeting = {
  id: "01a06594-c674-7006-9d0e-eef1d7b06c64",
  pageTypeSlug: "book-chapter",
  slug: "activity-budgeting",
  title: "Activity budgeting",
  description:
    "Activity budgeting — the operating rule for which activities are free, tolerable, intolerable, and initiate-able as a function of current Safety state and baseline.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
