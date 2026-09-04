import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const levers = {
  id: "01a06594-c68e-7002-8ccc-acc19ca81be6",
  pageTypeSlug: "book-chapter",
  slug: "levers",
  title: "Levers and Knobs",
  description: "Levers that move residential solar price up or down for a specific quote.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
