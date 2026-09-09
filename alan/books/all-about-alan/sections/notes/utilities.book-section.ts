import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const utilities = {
  id: "01a06594-c685-700f-9b3c-f956d1ebdc43",
  pageTypeSlug: "book-section",
  slug: "utilities",
  title: "Utilities",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
