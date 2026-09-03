import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipSummary = {
  id: "01a06594-c689-7005-b903-464c26182985",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-summary",
  title: "Summary",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
