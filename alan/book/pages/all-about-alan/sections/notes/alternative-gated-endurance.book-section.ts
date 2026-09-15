import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const alternativeGatedEndurance = {
  id: "01a06594-c674-700c-8417-e06319ad02a6",
  type: "book-section",
  slug: "alternative-gated-endurance",
  title: "Alternative-gated endurance",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
