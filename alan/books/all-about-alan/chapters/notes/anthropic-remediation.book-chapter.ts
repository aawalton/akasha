import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const anthropicRemediation = {
  id: "01a06594-c674-700e-9dc0-7b26dde6ab24",
  pageTypeSlug: "book-chapter",
  slug: "anthropic-remediation",
  title: "Anthropic remediation",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
