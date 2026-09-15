import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const revelationAsExposure = {
  id: "01a06594-c67c-7011-a502-2efff251843b",
  type: "page-type/book-section",
  slug: "revelation-as-exposure",
  title: "Revelation as exposure",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
