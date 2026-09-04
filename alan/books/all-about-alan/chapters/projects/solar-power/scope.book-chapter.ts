import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const scope = {
  id: "01a06594-c68e-7005-b271-555e516e4d60",
  pageTypeSlug: "book-chapter",
  slug: "scope",
  title: "Scope",
  description:
    "Scope and architectural decisions for the solar power project — site inputs, loads in/out of scope, and the constraints that shape sizing.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
