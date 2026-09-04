import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const informationDiet = {
  id: "01a06594-c67a-700f-bc17-5ff2a88a909c",
  pageTypeSlug: "book-chapter",
  slug: "information-diet",
  title: "Information diet",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
