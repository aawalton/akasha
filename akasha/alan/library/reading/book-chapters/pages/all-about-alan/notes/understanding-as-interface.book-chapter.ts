import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const understandingAsInterface = {
  id: "01a06594-c685-700d-8fc8-59ff822625de",
  pageTypeSlug: "book-chapter",
  slug: "understanding-as-interface",
  title: "Understanding as interface",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
