import type { BookChapter } from "../../../../../../../book-chapter.page-type.ts"

export const euCitizenshipSummary = {
  id: "01a06593-c4fc-700d-a31a-a03c26182985",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-summary",
  title: "Summary",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
