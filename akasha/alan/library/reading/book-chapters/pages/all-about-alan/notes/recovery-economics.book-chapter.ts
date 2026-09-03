import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const recoveryEconomics = {
  id: "01a06594-c67c-700b-b2a4-139f2d95de63",
  pageTypeSlug: "book-chapter",
  slug: "recovery-economics",
  title: "The economics of recovery",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
