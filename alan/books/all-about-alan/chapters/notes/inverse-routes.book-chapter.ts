import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const inverseRoutes = {
  id: "01a06594-c67a-7013-82e9-460ab443bb34",
  pageTypeSlug: "book-chapter",
  slug: "inverse-routes",
  title: "Inverse routes to the same interior",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
