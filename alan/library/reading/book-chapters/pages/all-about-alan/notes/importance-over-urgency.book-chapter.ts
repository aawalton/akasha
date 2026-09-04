import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const importanceOverUrgency = {
  id: "01a06594-c67a-700d-8b89-8604d382fa9e",
  pageTypeSlug: "book-chapter",
  slug: "importance-over-urgency",
  title: "Importance over urgency",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
