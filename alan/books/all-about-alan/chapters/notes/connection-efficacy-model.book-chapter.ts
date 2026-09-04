import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const connectionEfficacyModel = {
  id: "01a06594-c677-7002-9077-3aa8340269c0",
  pageTypeSlug: "book-chapter",
  slug: "connection-efficacy-model",
  title: "Connection efficacy model",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
