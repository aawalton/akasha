import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const safetyWidget = {
  id: "01a06594-c682-7000-a69f-22f2bff3c930",
  pageTypeSlug: "book-chapter",
  slug: "safety-widget",
  title: "The safety widget",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
