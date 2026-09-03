import type { BookChapter } from "../../../../../../../book-chapter.page-type.ts"

export const euCitizenshipSummary = {
  id: "01a06591-9ed8-7001-92d0-212126182985",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-summary",
  title: "Summary",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
