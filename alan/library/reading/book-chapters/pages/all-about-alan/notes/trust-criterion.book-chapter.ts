import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const trustCriterion = {
  id: "01a06594-c685-700b-b2ef-39b9a0c5dc28",
  pageTypeSlug: "book-chapter",
  slug: "trust-criterion",
  title: "Trust criterion",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
