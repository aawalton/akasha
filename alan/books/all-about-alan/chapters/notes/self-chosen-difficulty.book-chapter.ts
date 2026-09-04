import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const selfChosenDifficulty = {
  id: "01a06594-c683-7003-8b32-ac82f661a103",
  pageTypeSlug: "book-chapter",
  slug: "self-chosen-difficulty",
  title: "Self-chosen difficulty",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
