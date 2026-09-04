import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const recoveryLadder = {
  id: "01a06594-c67c-700c-ae61-931e270f5e3d",
  pageTypeSlug: "book-chapter",
  slug: "recovery-ladder",
  title: "The recovery ladder",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
