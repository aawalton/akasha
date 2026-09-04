import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const compressibility = {
  id: "01a06594-c68e-7010-932a-218a1408df7d",
  pageTypeSlug: "book-chapter",
  slug: "compressibility",
  title: "Compressibility is intrinsic",
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
