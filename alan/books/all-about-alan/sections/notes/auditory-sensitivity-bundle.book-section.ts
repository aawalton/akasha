import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const auditorySensitivityBundle = {
  id: "01a06594-c675-7002-ae05-68dd11ad7be0",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "auditory-sensitivity-bundle",
  title: "Auditory-sensitivity bundle",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
