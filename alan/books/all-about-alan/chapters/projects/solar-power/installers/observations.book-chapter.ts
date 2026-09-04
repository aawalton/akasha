import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const observations = {
  id: "01a06594-c68d-7016-994c-245e2f4b9498",
  pageTypeSlug: "book-chapter",
  slug: "observations",
  title: "Summary Observations",
  description: "Summary observations on Provo / Utah solar installer landscape.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
