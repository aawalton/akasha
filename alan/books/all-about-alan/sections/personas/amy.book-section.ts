import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const amy = {
  id: "01a06594-c686-700a-ab08-466494b1c679",
  pageTypeSlug: "book-section",
  slug: "amy",
  title: "Amy",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
