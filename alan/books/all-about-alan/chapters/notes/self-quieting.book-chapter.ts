import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const selfQuieting = {
  id: "01a06594-c683-7008-8bd2-33b06d9a3284",
  pageTypeSlug: "book-chapter",
  slug: "self-quieting",
  title: "Self-quieting",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
