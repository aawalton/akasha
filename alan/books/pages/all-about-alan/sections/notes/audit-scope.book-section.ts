import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const auditScope = {
  id: "01a06594-c675-7001-9fe4-6fb5e6f52252",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "audit-scope",
  title: "Audit scope",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
