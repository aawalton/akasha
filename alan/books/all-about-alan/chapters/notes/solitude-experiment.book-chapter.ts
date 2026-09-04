import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const solitudeExperiment = {
  id: "01a06594-c684-7008-9cea-75880e1a86f6",
  pageTypeSlug: "book-chapter",
  slug: "solitude-experiment",
  title: "The solitude experiment",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
