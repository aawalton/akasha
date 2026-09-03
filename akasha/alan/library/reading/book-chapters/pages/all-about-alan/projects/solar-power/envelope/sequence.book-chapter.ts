import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const sequence = {
  id: "01a06594-c68d-7011-aa5b-8bedc1093183",
  pageTypeSlug: "book-chapter",
  slug: "sequence",
  title: "Recommended Sequence",
  description:
    "Recommended project sequence for a 1970s 6000 sq ft Provo house — audit, retrofit, post-retrofit verification, then parallel heat pump and PV.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
