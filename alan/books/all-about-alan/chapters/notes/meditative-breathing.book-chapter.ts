import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const meditativeBreathing = {
  id: "01a06594-c67b-7006-8f63-4738ae90c27e",
  pageTypeSlug: "book-chapter",
  slug: "meditative-breathing",
  title: "Meditative breathing",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
