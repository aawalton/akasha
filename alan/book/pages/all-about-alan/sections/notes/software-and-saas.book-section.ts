import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const softwareAndSaas = {
  id: "01a06594-c684-7007-a95e-c7f7465962a8",
  type: "page-type/book-section",
  slug: "software-and-saas",
  title: "Software and SaaS",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
