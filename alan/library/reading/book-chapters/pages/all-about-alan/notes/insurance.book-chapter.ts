import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const insurance = {
  id: "01a06594-c67a-7011-b244-b64b22cf1bec",
  pageTypeSlug: "book-chapter",
  slug: "insurance",
  title: "Insurance",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
