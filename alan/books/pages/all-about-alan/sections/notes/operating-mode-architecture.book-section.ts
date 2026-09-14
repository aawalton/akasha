import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const operatingModeArchitecture = {
  id: "01a06594-c67b-7011-910c-e8c5b7882274",
  type: "book-section",
  slug: "operating-mode-architecture",
  title: "Operating-mode architecture",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
