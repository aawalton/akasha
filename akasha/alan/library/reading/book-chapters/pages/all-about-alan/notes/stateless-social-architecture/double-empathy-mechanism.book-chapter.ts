import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const doubleEmpathyMechanism = {
  id: "01a06594-c684-700b-a792-9b24622f3e80",
  pageTypeSlug: "book-chapter",
  slug: "double-empathy-mechanism",
  title: "Double-empathy mechanism",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
