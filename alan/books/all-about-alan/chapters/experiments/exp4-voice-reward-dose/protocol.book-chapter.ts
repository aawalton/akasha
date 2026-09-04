import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const protocol = {
  id: "01a06594-c674-7001-ad82-e261e73f2d37",
  pageTypeSlug: "book-chapter",
  slug: "protocol",
  title: "Exp 4 — voice-reward DOSE test (long-message)",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
