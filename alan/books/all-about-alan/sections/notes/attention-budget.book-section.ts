import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const attentionBudget = {
  id: "01a06594-c674-7012-b787-41514cc04020",
  pageTypeSlug: "book-section",
  slug: "attention-budget",
  title: "The attention budget",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
