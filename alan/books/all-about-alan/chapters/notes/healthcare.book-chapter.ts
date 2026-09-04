import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const healthcare = {
  id: "01a06594-c67a-7005-b160-6719bf3b4a78",
  pageTypeSlug: "book-chapter",
  slug: "healthcare",
  title: "Healthcare",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
