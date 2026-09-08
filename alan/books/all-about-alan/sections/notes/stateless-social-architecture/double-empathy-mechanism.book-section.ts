import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const doubleEmpathyMechanism = {
  id: "01a06594-c684-700b-a792-9b24622f3e80",
  pageTypeSlug: "book-section",
  slug: "double-empathy-mechanism",
  title: "Double-empathy mechanism",
  sectionOfSlug: "all-about-alan",
  partOfCollectionSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
