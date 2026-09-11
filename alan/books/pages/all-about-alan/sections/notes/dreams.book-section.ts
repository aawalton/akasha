import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const dreams = {
  id: "01a06594-c677-7013-9893-21cf00c07803",
  type: "book-section",
  slug: "dreams",
  title: "Dreams",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
