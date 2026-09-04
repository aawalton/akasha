import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const adhdAsNeurotype = {
  id: "01a06594-c674-7007-b64f-8ce57de16121",
  pageTypeSlug: "book-chapter",
  slug: "adhd-as-neurotype",
  title: "ADHD as neurotype (working definition)",
  description: "ADHD as a neurotype — Alan's working definition in his own terms.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
