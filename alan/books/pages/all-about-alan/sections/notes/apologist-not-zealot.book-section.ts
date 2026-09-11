import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const apologistNotZealot = {
  id: "01a06594-c674-7010-83e6-c557459f5e34",
  type: "book-section",
  slug: "apologist-not-zealot",
  title: "Apologist, not zealot",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
