import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const installers = {
  id: "01a06594-c68d-7018-8870-40c4dc8d0806",
  pageTypeSlug: "book-chapter",
  slug: "installers",
  title: "Rooftop Solar Installers Serving Provo, UT",
  description:
    "Comprehensive list of rooftop solar installers serving Provo, UT (1350 Apple Ave) with credentials, ratings, warranties, and red flags.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
