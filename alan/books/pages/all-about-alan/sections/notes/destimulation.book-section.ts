import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const destimulation = {
  id: "01a06594-c677-700e-a61f-d688339fe28a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "destimulation",
  title: "Destimulation",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
