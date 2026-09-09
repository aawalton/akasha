import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const rumination = {
  id: "01a06594-c67c-7015-bdf5-300ee8d7ead6",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "rumination",
  title: "Rumination",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
