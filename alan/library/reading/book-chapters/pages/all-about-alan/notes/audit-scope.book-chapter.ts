import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const auditScope = {
  id: "01a06594-c675-7001-9fe4-6fb5e6f52252",
  pageTypeSlug: "book-chapter",
  slug: "audit-scope",
  title: "Audit scope",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
