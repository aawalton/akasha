import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const identityCollapse = {
  id: "01a06594-c67a-700b-ae82-c39217185ad5",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "identity-collapse",
  title: "Identity collapse",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
