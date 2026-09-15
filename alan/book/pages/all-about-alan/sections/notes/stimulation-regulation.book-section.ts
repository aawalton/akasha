import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const stimulationRegulation = {
  id: "01a06594-c684-7010-a111-380550510544",
  type: "book-section",
  slug: "stimulation-regulation",
  title: "Stimulation regulation",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
