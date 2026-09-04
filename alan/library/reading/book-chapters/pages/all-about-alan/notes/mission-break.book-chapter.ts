import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const missionBreak = {
  id: "01a06594-c67b-7008-b871-43f8136ae0c8",
  pageTypeSlug: "book-chapter",
  slug: "mission-break",
  title: "The mission break",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
