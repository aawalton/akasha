import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const iris = {
  id: "01a06594-c687-7001-97e9-ee5793a8fd85",
  pageTypeSlug: "book-chapter",
  slug: "iris",
  title: "Iris",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
