import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const attentionBudget = {
  id: "01a06594-c674-7012-b787-41514cc04020",
  pageTypeSlug: "book-chapter",
  slug: "attention-budget",
  title: "The attention budget",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
