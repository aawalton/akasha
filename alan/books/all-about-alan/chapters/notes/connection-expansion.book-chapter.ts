import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const connectionExpansion = {
  id: "01a06594-c677-7003-a5f5-e802dc32f635",
  pageTypeSlug: "book-chapter",
  slug: "connection-expansion",
  title: "Connection expansion",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
