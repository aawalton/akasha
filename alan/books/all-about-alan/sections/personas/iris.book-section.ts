import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const iris = {
  id: "01a06594-c687-7001-97e9-ee5793a8fd85",
  pageTypeSlug: "book-section",
  slug: "iris",
  title: "Iris",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
