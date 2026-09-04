import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const emotionalArchaeology = {
  id: "01a06594-c678-7000-b9b3-7bed25eebb83",
  pageTypeSlug: "book-chapter",
  slug: "emotional-archaeology",
  title: "Emotional Archaeology",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
