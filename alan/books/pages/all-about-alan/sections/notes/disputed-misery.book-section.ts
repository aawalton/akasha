import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const disputedMisery = {
  id: "01a06594-c677-7010-9afe-adaf9fb7cb0e",
  type: "book-section",
  slug: "disputed-misery",
  title: "Disputed misery",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
