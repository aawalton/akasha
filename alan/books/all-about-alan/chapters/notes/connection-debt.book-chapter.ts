import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const connectionDebt = {
  id: "01a06594-c677-7000-86cf-dc3e180ece2a",
  pageTypeSlug: "book-chapter",
  slug: "connection-debt",
  title: "Connection debt",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
