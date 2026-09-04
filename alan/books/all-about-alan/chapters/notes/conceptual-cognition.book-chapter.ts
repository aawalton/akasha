import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const conceptualCognition = {
  id: "01a06594-c676-7012-8f1d-87e941f558a4",
  pageTypeSlug: "book-chapter",
  slug: "conceptual-cognition",
  title: "Conceptual cognition",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
