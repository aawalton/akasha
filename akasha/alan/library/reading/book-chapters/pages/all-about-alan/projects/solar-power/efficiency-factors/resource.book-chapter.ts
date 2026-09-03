import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const resource = {
  id: "01a06594-c68d-7002-82b7-c6c949575efb",
  pageTypeSlug: "book-chapter",
  slug: "resource",
  title: "Solar Resource at Provo",
  description:
    "Solar resource at Provo, UT — annual and monthly GHI/DNI, peak sun hours, altitude bonus. The denominator before any roof factor.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
