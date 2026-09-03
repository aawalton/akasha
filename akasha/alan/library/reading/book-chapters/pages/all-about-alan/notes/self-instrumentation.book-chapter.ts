import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const selfInstrumentation = {
  id: "01a06594-c683-7005-b2fa-0e98d2bfdbca",
  pageTypeSlug: "book-chapter",
  slug: "self-instrumentation",
  title: "Self-instrumentation",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
