import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const robotMode = {
  id: "01a06594-c67c-7013-91ef-f585953da6b0",
  pageTypeSlug: "book-chapter",
  slug: "robot-mode",
  title: "Robot mode",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
