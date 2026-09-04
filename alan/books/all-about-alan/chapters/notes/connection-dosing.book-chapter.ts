import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const connectionDosing = {
  id: "01a06594-c677-7001-a477-0df83b58f97e",
  pageTypeSlug: "book-chapter",
  slug: "connection-dosing",
  title: "Connection dosing",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
