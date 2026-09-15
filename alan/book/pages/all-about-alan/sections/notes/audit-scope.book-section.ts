import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const auditScope = {
  id: "01a06594-c675-7001-9fe4-6fb5e6f52252",
  type: "page-type/book-section",
  slug: "audit-scope",
  title: "Audit scope",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
