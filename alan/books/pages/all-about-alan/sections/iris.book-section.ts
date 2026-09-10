import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const iris = {
  id: "01a06594-c687-7001-97e9-ee5793a8fd85",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "iris",
  title: "Iris",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
