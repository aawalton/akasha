import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const slowBuildStrategy = {
  id: "01a06594-c684-7005-abd5-425a38eb1177",
  pageTypeSlug: "book-chapter",
  slug: "slow-build-strategy",
  title: "Slow-build strategy",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
