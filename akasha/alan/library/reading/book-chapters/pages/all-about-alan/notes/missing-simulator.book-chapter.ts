import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const missingSimulator = {
  id: "01a06594-c67b-7007-9310-87e51b6a6de1",
  pageTypeSlug: "book-chapter",
  slug: "missing-simulator",
  title: "The missing simulator",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
