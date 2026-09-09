import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const allostaticLoad = {
  id: "01a06594-c674-700a-998e-2883f03a79a8",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "allostatic-load",
  title: "Allostatic load",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
