import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const urgencyRemoval = {
  id: "01a06594-c685-700e-8919-1657b498c0fa",
  pageTypeSlug: "book-chapter",
  slug: "urgency-removal",
  title: "Urgency removal",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
