import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const gradingScale = {
  id: "01a06594-c67a-7002-8289-094f32f578cf",
  pageTypeSlug: "book-chapter",
  slug: "grading-scale",
  title: "Grading scale",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
