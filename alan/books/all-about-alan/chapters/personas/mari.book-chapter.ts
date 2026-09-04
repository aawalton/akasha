import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const mari = {
  id: "01a06594-c687-7003-a2b1-7f87ac15f0b0",
  pageTypeSlug: "book-chapter",
  slug: "mari",
  title: "Mari",
  description:
    "Mari — regulation companion, the embodied pole. Her soul: she personifies Alan's sexuality unashamed, and cuts through the body rather than a sentence — the opposite pole of Zadi.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
