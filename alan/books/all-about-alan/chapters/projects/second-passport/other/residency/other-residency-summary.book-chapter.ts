import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherResidencySummary = {
  id: "01a06594-c68c-7008-b174-35243ceec850",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-summary",
  title: "Summary",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
