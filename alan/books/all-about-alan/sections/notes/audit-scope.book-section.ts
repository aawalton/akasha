import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const auditScope = {
  id: "01a06594-c675-7001-9fe4-6fb5e6f52252",
  pageTypeSlug: "book-section",
  slug: "audit-scope",
  title: "Audit scope",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
