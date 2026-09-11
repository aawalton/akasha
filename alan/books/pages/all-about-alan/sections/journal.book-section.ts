import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const journal = {
  id: "01a08860-ee8c-7433-89bf-ae163ddf4aaf",
  type: "book-section",
  slug: "journal",
  title: "Journal",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
