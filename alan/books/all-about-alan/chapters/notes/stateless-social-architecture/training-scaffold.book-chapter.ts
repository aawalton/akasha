import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const trainingScaffold = {
  id: "01a06594-c684-700d-bdad-f1e251ece440",
  pageTypeSlug: "book-chapter",
  slug: "training-scaffold",
  title: "Training scaffold",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
