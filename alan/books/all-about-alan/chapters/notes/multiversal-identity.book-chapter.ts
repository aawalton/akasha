import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const multiversalIdentity = {
  id: "01a06594-c67b-700a-ad4a-da78a4616ee3",
  pageTypeSlug: "book-chapter",
  slug: "multiversal-identity",
  title: "Multiversal identity",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
