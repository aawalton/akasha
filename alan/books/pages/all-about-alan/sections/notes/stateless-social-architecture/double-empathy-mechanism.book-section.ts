import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const doubleEmpathyMechanism = {
  id: "01a06594-c684-700b-a792-9b24622f3e80",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "double-empathy-mechanism",
  title: "Double-empathy mechanism",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
