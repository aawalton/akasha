import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const presentTenseModel = {
  id: "01a06594-c67c-7006-a146-7d12fa444c1a",
  pageTypeSlug: "book-chapter",
  slug: "present-tense-model",
  title: "Present-tense conceptual model",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
