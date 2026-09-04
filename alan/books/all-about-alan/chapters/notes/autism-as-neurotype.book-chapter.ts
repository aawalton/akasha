import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const autismAsNeurotype = {
  id: "01a06594-c675-7003-91cf-ffd9b4bb8cc6",
  pageTypeSlug: "book-chapter",
  slug: "autism-as-neurotype",
  title: "Autism as neurotype (working definition)",
  description: "Autism as a neurotype — Alan's working definition in his own terms.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
