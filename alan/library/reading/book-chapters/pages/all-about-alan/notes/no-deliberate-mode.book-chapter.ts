import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const noDeliberateMode = {
  id: "01a06594-c67b-700e-b8a4-095d30cedb17",
  pageTypeSlug: "book-chapter",
  slug: "no-deliberate-mode",
  title: "No deliberate mode",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
