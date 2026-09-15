import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const actionEpistemology = {
  id: "01a06594-c674-7005-a8ed-657f74660753",
  type: "book-section",
  slug: "action-epistemology",
  title: "Action as the epistemic engine",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
