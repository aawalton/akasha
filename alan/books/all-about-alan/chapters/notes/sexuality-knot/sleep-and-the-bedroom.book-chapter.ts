import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const sleepAndTheBedroom = {
  id: "01a06594-c684-7000-a839-5ce2c6f7c4bc",
  pageTypeSlug: "book-chapter",
  slug: "sleep-and-the-bedroom",
  title: "Sleep and the bedroom",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
