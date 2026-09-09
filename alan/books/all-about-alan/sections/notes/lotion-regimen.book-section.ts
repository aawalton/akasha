import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const lotionRegimen = {
  id: "01a06594-c67a-701a-9e3c-29d2d89e2c7a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "lotion-regimen",
  title: "Lotion regimen",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
