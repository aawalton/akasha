import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const aelwyn = {
  id: "01a06594-c686-7007-8db3-b12191ad3b63",
  type: "book-section",
  slug: "aelwyn",
  title: "Aelwyn",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
