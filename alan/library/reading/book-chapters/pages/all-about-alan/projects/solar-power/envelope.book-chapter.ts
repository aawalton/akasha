import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const envelope = {
  id: "01a06594-c68d-7012-bfd6-a940cb9498af",
  pageTypeSlug: "book-chapter",
  slug: "envelope",
  title: "Envelope Retrofit Decision",
  description:
    "Envelope retrofit decision for a 1970s 6000 sq ft Provo house — assessment options, retrofit packages ranked by leverage, and recommended sequence.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
