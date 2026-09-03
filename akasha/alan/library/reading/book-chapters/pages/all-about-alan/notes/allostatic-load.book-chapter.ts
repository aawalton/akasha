import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const allostaticLoad = {
  id: "01a06594-c674-700a-998e-2883f03a79a8",
  pageTypeSlug: "book-chapter",
  slug: "allostatic-load",
  title: "Allostatic load",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
