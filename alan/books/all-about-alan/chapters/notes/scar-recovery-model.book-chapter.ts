import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const scarRecoveryModel = {
  id: "01a06594-c683-7000-98b5-f79e66ce4511",
  pageTypeSlug: "book-chapter",
  slug: "scar-recovery-model",
  title: "The funded-passage recovery model",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
