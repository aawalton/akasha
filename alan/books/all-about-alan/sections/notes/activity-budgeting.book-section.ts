import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const activityBudgeting = {
  id: "01a06594-c674-7006-9d0e-eef1d7b06c64",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "activity-budgeting",
  title: "Activity budgeting",
  sectionOf: "all-about-alan",
  description:
    "Activity budgeting — the operating rule for which activities are free, tolerable, intolerable, and initiate-able as a function of current Safety state and baseline.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
