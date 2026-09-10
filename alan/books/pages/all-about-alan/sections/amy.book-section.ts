import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const amy = {
  id: "01a06594-c686-700a-ab08-466494b1c679",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "amy",
  title: "Amy",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
