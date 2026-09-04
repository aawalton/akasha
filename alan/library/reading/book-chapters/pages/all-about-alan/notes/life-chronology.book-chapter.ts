import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const lifeChronology = {
  id: "01a06594-c67a-7018-b88f-d7de3e73b6c9",
  pageTypeSlug: "book-chapter",
  slug: "life-chronology",
  title: "Life chronology",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
