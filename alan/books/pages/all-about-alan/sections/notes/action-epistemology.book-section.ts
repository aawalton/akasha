import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const actionEpistemology = {
  id: "01a06594-c674-7005-a8ed-657f74660753",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "action-epistemology",
  title: "Action as the epistemic engine",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
